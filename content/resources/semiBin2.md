---
title: The SemiBin2 Approach
subTitle: Limited to rRNA gene prediction only
description: Lorem ipsum dolor sit amet consectetur.
imageHero:
  - url: '/images/hero_tools.png'
    alt: 'illustation laboratory'
imageResources:
  - url: '/images/image_semibin.png'
    alt: 'explanatory diagram'
contentResources: 'Self-supervised learning, including two steps:  constraint generation and the siamese neural network. Generating must-link constraints is done by breaking up longer contigs and cannot-link constraints by random sampling. Then, a deep siamese neural network is used to learn a better embedding from the inputs. b, For short-reads, the Infomap algorithm is used to obtain preliminary bins from the sparse graph generated from the embeddings, followed by weighted k-means to recluster bins whose the mean number of single-copy genes is greater than one. For long-reads, SemiBin2 runs DBSCAN with different values of the ε parameter with embeddings as inputs and integrates the results based on single-copy genes. c, Output the final binning results larger than a user-definable threshold (default 200kbp). '

---
