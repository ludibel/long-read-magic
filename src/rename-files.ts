import * as fs from 'fs';
import * as path from 'path';

interface BinFile {
    oldName: string;
    newName: string;
}

interface SampleInfo {
    projectId: string;
    sampleId: string;
    samplePath: string;
}

function renameBinsAndReferences(binFiles: BinFile[], sampleInfo: SampleInfo) {
    const { projectId, sampleId, samplePath } = sampleInfo;
    const binsPath = path.join(samplePath, 'output_bins');
    const resultCsvPath = path.join(samplePath, 'result.csv');
    const fastaPath = path.join(samplePath, 'assembly.fasta');

    binFiles.forEach(({ oldName, newName }) => {
        const binFilePath = path.join(binsPath, oldName);
        const newBinFilePath = path.join(binsPath, newName);
        fs.renameSync(binFilePath, newBinFilePath);

        const resultCsvContent = fs.readFileSync(resultCsvPath, 'utf-8');
        const newResultCsvContent = resultCsvContent.replace(oldName, newName);
        fs.writeFileSync(resultCsvPath, newResultCsvContent, 'utf-8');

        const tsvFiles = fs.readdirSync(samplePath).filter((filename) => filename.endsWith('.tsv'));
        tsvFiles.forEach((tsvFile) => {
            const tsvFilePath = path.join(samplePath, tsvFile);
            const tsvContent = fs.readFileSync(tsvFilePath, 'utf-8');
            const newTsvContent = tsvContent.replace(oldName, newName);
            fs.writeFileSync(tsvFilePath, newTsvContent, 'utf-8');
        });
    });

    const fastaContent = fs.readFileSync(fastaPath, 'utf-8');
    const matchResult = fastaContent.match(/contig_(\d+)/);
    const contigNumber = matchResult ? matchResult[1] : null;
    const newContigName = `SB15.${projectId}.${sampleId}.contig${contigNumber}`;
    const newFastaContent = fastaContent.replace(/contig_\d+/, newContigName);
    fs.writeFileSync(fastaPath, newFastaContent, 'utf-8');
}

function mergeTsvFiles(sampleInfo: SampleInfo) {
    const { samplePath } = sampleInfo;
    const tsvFiles = fs.readdirSync(samplePath).filter((filename) => filename.endsWith('.tsv'));
    const resultCsvPath = path.join(samplePath, 'result.csv');
    const outputCsvPath = path.join(samplePath, 'result_merged.csv');
    const originalCsvLines = fs.readFileSync(resultCsvPath, 'utf-8').split('\n');
    const csvStream = fs.createWriteStream(outputCsvPath);

    // merge headers
    const tsvFilePath = path.join(samplePath, tsvFiles[0]);
    const tsvContent = fs.readFileSync(tsvFilePath, 'utf-8');
    const tsvHeader = tsvContent.trim().split('\n')[0].replaceAll(",", "--").split('\t').slice(1).join(',');
    csvStream.write(originalCsvLines[0] + "," + tsvHeader + "\n");

    tsvFiles.forEach((tsvFile) => {
        const tsvFilePath = path.join(samplePath, tsvFile);
        const tsvContent = fs.readFileSync(tsvFilePath, 'utf-8');
        const tsvLines = tsvContent.trim().split('\n');
        const binFileNameIndex = 0;

        originalCsvLines.slice(1).forEach((csvLine) => {
            const csvFields = csvLine.split(',');
            const binFileName = csvFields[binFileNameIndex];
            const tsvLine = tsvLines.find((tsvLine) => tsvLine.startsWith(binFileName));
            if (!tsvLine) {
                return;
            }

            const mergedLine = `${csvLine},${tsvLine.replaceAll(", ", "---").split('\t').slice(1).join(',')}`;

            csvStream.write(mergedLine + "\n");
        });
    });
    csvStream.end();
}

function processSample(samplePath: string) {
    const sampleId = path.basename(samplePath);
    const projectId = path.basename(path.dirname(samplePath));
    const binsPath = path.join(samplePath, 'output_bins');
    const binFiles = fs.readdirSync(binsPath)
        .filter((filename) => filename.startsWith('bin.'))
        .map((filename) => {
            const matchResult = filename.match(/bin\.(\d+)\.fa/);
            const binNumber = matchResult ? matchResult[1] : null;
            const newName = `SB15.${projectId}.${sampleId}.bin${binNumber}.fa`;
            return { oldName: filename, newName };
        });

    //renameBinsAndReferences(binFiles, { projectId, sampleId, samplePath });
    mergeTsvFiles({ projectId, sampleId, samplePath });
}

function processProject(projectPath: string) {
    const samplePaths = fs.readdirSync(projectPath)
        .filter((filename) => fs.statSync(path.join(projectPath, filename)).isDirectory())
        .map((sampleName) => path.join(projectPath, sampleName));

    samplePaths.forEach(processSample);
}

function processRoot(rootPath: string) {
    const projectPaths = fs.readdirSync(rootPath)
        .filter((filename) => fs.statSync(path.join(rootPath, filename)).isDirectory())
        .map((projectName) => path.join(rootPath, projectName));

    projectPaths.forEach(processProject);
}

// Example usage:
processRoot('d:/Projects/anne/stage-dbd/file-storage');