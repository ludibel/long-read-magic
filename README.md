# Long Read MAGic

A website for the visualisation and downloading of metagenome-assembled genomes (MAGs) from long read technologies (PacBio).

## License

This site is based on components licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation

# Configuration
configuration is done via environment variables. The following variables are used:
```
S3_ACCESS_KEY_ID=%key%
S3_ACCESS_KEY_SECRET=%secret%
S3_BUCKET_NAME=semimags
S3_REGION=us-east-1
NEXT_PUBLIC_S3_URL_PREFIX=https://semimags.s3.amazonaws.com
```
create a file called `.env.local` in the root folder and add the variables there. Don't forget to replace access key and secret with real values.

# Architecture and data flows.

The infrastructure of this project consists of:
- AWS S3 bucket hosting .fa files along with metadata in a csv format.
- Next.Js website containing info about the lab and providing a way to view, sort and filter through the available files. Hosted on netlify.
- several scripts to generate json metadata from csv files and S3 bucket contents.

Data flow:
- .fa files and metadata are generated in form of .csv, .tsv and .fasta files.
- `rename-files` script is used on the root folder to automate the renaming of files and construct merged csv files with full metadata for each sample.
- Files are uploaded to the S3 bucket.
- A build is triggered on netlify.
- Build runs `generate-manifests` script. This script reads S3 bucket and generates json manifest files containing info about the samples and projects.
- a website with json manifest files is uploaded to netlify CDN.
- User sorts through the genomes and downloads the ones they need. Files are downloaded directly from S3 bucket.

Folder Structure in S3 bucket:
```
root
--Project folder (e.g. PRJ123123)
---- Sample folder (e.g. SAM444444)
------ bins (folder containing .fa files)
---------- bin1.fa
---------- bin2.fa
------ result.csv (metadata file in csv format)
------ xxx.summary.tsv (summary file containing info about the sample in tsv format)
------ yyy.result.tsv (metadata file containing info about the sample in tsv format)
------ result_merged.csv (full metadata file)
------ assembly.fasta
---- Sample folder 2
---- Sample folder 3
-- Project folder 2
-- Project folder 3
```
# Scripts
This repository contains two scripts which are needed to transform data into a format usable by this website.
They are located in `src/scripts` folder and can be launched via npm run commands. Check packahe.json for more info.

**rename-files.mjs** - renames files and generates merged csv files with full metadata for each sample.
- Should be run over the root folder of the folder structure. The complete path is specified at the bottom of the script file. Should be run locally before uploading files to S3 bucket.
- goes into each sample folder
- renames bin files by appending the project and sample names to the beginning of the file name.
- renames contigs inside assembly.fasta file and inside each bin file.
- renames bin files in .csv and .tsv files
- merges .csv and .tsv files into a single result_merged.csv file with full metadata for each sample.

**generate-manifests** - generates json metadata files based on S3 bucket contents. 
- runs automatically as a part of netlify build process (check npm run build command in package.json)
- connects to the S3 bucket and lists all objects found there
- goes into each sample folder
- reads result_merged.csv file and generates three manifest files based on it:
- - `shortened-data-manifest.json` - contains data needed for the website to display genomes in a table format. Contains only a subset of data about each genome.
- - `full-data-manifest.json` - contains full metadata for each genome. Used to display the details page for each genome
- - `taxonomy-tree-manifest.json` - contains data needed to display the taxonomy tree on the website.

# Notable mentions:
Adding more filters or modifying existing filters: 
- check `src/components/GenomeTable/Filters.tsx` file. Also, `src/components/GenomeTable/GenomeContext.tsx`. The latter is a central file containing "backend-ish" logic for table display, sorting, filtering, etc.
Changing filter criteria for genome quality detection:
- genome quality is detected in `src/utils/utils.ts` file. Check the `detectGenomeQuality` function
- filter state for genome quality is stored in `src/components/GenomeTable/Filters.tsx` file.

Changing website texts: check `src/utils/texts.ts` file. It contains most of the texts related to genome overview and details.

Changing filter input maximum and minimum ranges (so that users don't look for impossible values like completeness: -5%):
- check `src/components/GenomesTable/Filters.tsx` file. There is a component called `FilterRange` there. Change minBoundary and maxBoundary to suit your needs.

Automation scripts rely heavily on data format not changing in csv and tsv files. You'll have to modify the scripts (rename and generate manifests) if you change data structure in .csv and .tsv files.

Some data processing is done on frontend. Particularly, adding extra fields to data-manifest, flattening manifest in order to display all items at once and detecting genome quality. These things could be moved into the generate-manifest script if needed. 




