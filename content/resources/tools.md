---
title: tools
subTitle: Limited to rRNA gene prediction only
description: Lorem ipsum dolor sit amet consectetur.
imageHero:
  - url: '/images/hero_tools.png'
    alt: 'illustation laboratory'
tools:
  - name: Semibin
    inputFiles: Metagenomic contigs
    outputFiles: Binning results
    informationObtained: Semi-supervisedbinning of metagenomic data
    utility: Helps classify metagenomicsequences into taxonomic bins
    peeks: Utilizes both sequence composition and coverage information
    drawbacks: Requires initial training using labeled reference genomes
  - name: ChekckM2
    inputFiles: Binned metagenomic genomes
    outputFiles: Quality assessment report
    informationObtained: Quality assessment of metagenomic bins
    utility: Evaluates completeness and contamination of genome bins
    peeks: Provides detailed metrics and visualizations
    drawbacks: Relies on reference genome databases for accurate analysis
  - name: GUNC
    inputFiles: Metagenomic contigs
    outputFiles: Predicted protein sequences
    informationObtained: Gene function annotation
    utility: Predicts functional annotations of genes in metagenomes
    peeks: Uses similarity-based methods for annotation
    drawbacks: Requires reference databases for accurate functional annotation
  - name: Flye
    inputFiles: Raw DNA sequencing reads
    outputFiles: Assembled genome
    informationObtained: Genome assembly
    utility: Generates high-quality genome assemblies
    peeks: Performs long-read assembly
    drawbacks: Sensitive to input read quality and coverage
  - name: tRNAscan-SE
    inputFiles: Genome sequence
    outputFiles: tRNA predictions
    informationObtained: tRNA predictions
    utility: Identifies tRNA genes within genome sequences
    peeks: Incorporates both sequence and structure information
    drawbacks: Limited to tRNA gene prediction only
  - name: barrnap
    inputFiles: Genome sequence
    outputFiles: rRNA predictions
    informationObtained: tRNA predictions
    utility: Identifies tRNA genes within genome sequences
    peeks: Supports multiple rRNA gene databases
    drawbacks: Limited to rRNA gene prediction only
---
