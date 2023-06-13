import * as fs from 'fs';
import * as path from 'path';
import readline from 'readline';

const dbFilename = 'result.csv';
const mergedDbFilename = 'result_merged.csv';

async function main(rootPath) {
    const confirmed = await confirmation(rootPath);
    if (!confirmed) { return }

    const projects = fs.readdirSync(rootPath).filter((filename) => fs.statSync(path.join(rootPath, filename)).isDirectory());

    for (let project of projects) {
        const projectPath = path.join(rootPath, project);
        const samples = fs.readdirSync(projectPath).filter((filename) => fs.statSync(path.join(projectPath, filename)).isDirectory())

        for (let sample of samples) {
            const samplePath = path.join(projectPath, sample);
            const binsPath = path.join(samplePath, 'output_bins');
            const fastaPath = path.join(samplePath, 'assembly.fasta');
            const binFiles = fs.readdirSync(binsPath)
                .filter((filename) => filename.startsWith('bin.'))
                .map((filename) => {
                    const matchResult = filename.match(/bin\.(\d+)\.fa/);
                    const binNumber = matchResult ? matchResult[1] : null;
                    const newName = generateBinName(project, sample, binNumber);
                    return { oldName: filename, newName, ext: ".fa" };
                });

            console.log(`Processing ${project} - ${sample}`)

            renameBins(binFiles, binsPath);
            renameReferencesInCsv(samplePath, project, sample);
            await renameContigs(fastaPath, project, sample);
            mergeTsvFiles(samplePath);
        };
    }

    console.warn("Renaming complete");
}

function confirmation(rootPath) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Are you sure you want to rename files in ${rootPath}? (y/n) `, (answer) => {
            if (answer.toLowerCase() === 'y') {
                console.warn('Proceeding...');
                rl.close();
                resolve(true);
            } else {
                console.warn('Aborting...');
                rl.close();
                resolve(false);
            }
        });
    });
}

function renameBins(binFiles, binsPath) {
    binFiles.forEach(({ oldName, newName, ext }) => {
        ``
        const binFilePath = path.join(binsPath, oldName);
        const newBinFilePath = path.join(binsPath, newName + ext);
        fs.renameSync(binFilePath, newBinFilePath);
    });
}

function renameReferencesInCsv(samplePath, project, sample) {
    //change content of CSV files
    fs.readdirSync(samplePath)
        .filter((filename) => filename.endsWith('.csv') || filename.endsWith('.tsv'))
        .map(filename => path.join(samplePath, filename))
        .map(path => ({ path: path, content: fs.readFileSync(path, 'utf-8'), ext: path.substring(path.length - 4) }))
        .map(({ path, content, ext }) => {
            const fieldSeparator = ext === '.csv' ? ',' : '\t';
            const lines = content.trim().split('\n');
            let newLines = [];

            lines.forEach(line => {
                const fields = line.split(fieldSeparator);
                const matchResult = fields[0].match(/bin\.(\d+)/);
                if (!matchResult) {
                    newLines.push(line);
                    return;
                }

                const binNumber = matchResult ? matchResult[1] : null;
                const newName = generateBinName(project, sample, binNumber);
                fields[0] = newName;
                newLines.push(fields.join(fieldSeparator));
            });
            const newContent = newLines.join('\n');
            return { path, content: newContent };
        })
        .map(({ path, content }) => fs.writeFileSync(path, content, 'utf-8'));
}

async function renameContigs(filepath, project, sample) {
    // need to parse file in chunks because the file gets too big sometimes
    const chunkSize = 1024 * 1024 * 100;
    const tempFilePath = filepath + "temp";
    const readStream = fs.createReadStream(filepath, { highWaterMark: chunkSize });
    const writeStream = fs.createWriteStream(tempFilePath, { flags: "w" });

    // make sure we don't cut line in half due to chunking
    let padding = '';

    for await (const chunkBuffer of readStream) {
        // process the chunk
        const chunk = padding + chunkBuffer.toString();
        const lastNewlineIndex = chunk.lastIndexOf('\n');
        padding = chunk.substring(lastNewlineIndex + 1);

        // check if file has been proccessed already
        if (chunk.startsWith('>')) {
            const matchResult = chunk.match(/>contig_(\d+)/);
            if (matchResult === null) {
                writeStream.end();
                fs.unlink(tempFilePath, () => { });
                return;
            }
        }

        const regex = /contig_(\d+)/g;
        const replacedChunk = chunk.replace(regex, `SB15.${project}.${sample}.contig$1`);


        writeStream.write(replacedChunk);
    }

    writeStream.end();
    fs.renameSync(tempFilePath, filepath);
}

function mergeTsvFiles(samplePath) {
    const tsvFiles = fs.readdirSync(samplePath).filter((filename) => filename.endsWith('.tsv'));
    const resultCsvPath = path.join(samplePath, dbFilename);
    const outputCsvPath = path.join(samplePath, mergedDbFilename);
    const originalCsvLines = fs.readFileSync(resultCsvPath, 'utf-8').trim().split('\n');
    const csvStream = fs.createWriteStream(outputCsvPath);

    // merge headers
    const tsvFilePath = path.join(samplePath, tsvFiles[0]);
    const tsvContent = fs.readFileSync(tsvFilePath, 'utf-8');
    const tsvHeader = tsvContent.trim().split('\n')[0].replaceAll(",", "--").split('\t').slice(1).join(',');
    originalCsvLines[0] = originalCsvLines[0] + "," + tsvHeader;

    tsvFiles.forEach((tsvFile) => {
        const tsvFilePath = path.join(samplePath, tsvFile);
        const tsvContent = fs.readFileSync(tsvFilePath, 'utf-8');
        const tsvLines = tsvContent.trim().split('\n');
        const binFileNameIndex = 0;

        for (let i = 1; i < originalCsvLines.length; i++) {
            let csvLine = originalCsvLines[i];

            const csvFields = csvLine.split(',');
            const binFileName = csvFields[binFileNameIndex];

            const tsvLine = tsvLines.find((tsvLine) => tsvLine.startsWith(binFileName));
            if (!tsvLine) {
                continue;
            }


            const mergedLine = `${csvLine},${tsvLine.replaceAll(", ", "---").split('\t').slice(1).join(',')}`;

            originalCsvLines[i] = mergedLine
        }
    });

    originalCsvLines.forEach((line) => {
        csvStream.write(line + "\n");
    });
    csvStream.end();
}

function generateBinName(project, sample, binNumber) {
    return `SB15.${project}.${sample}.bin${binNumber}`;
}

//console.log = () => { }; // this line is used to control whether logging is off or on
await main('d:/Projects/anne/stage-dbd/file-storage');