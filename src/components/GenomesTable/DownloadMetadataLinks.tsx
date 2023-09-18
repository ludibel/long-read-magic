import React, { FC } from 'react';
import Link from "next/link";
import { getFastaLink, getResultLink } from "@/utils/utils";
import { useGenomeContext } from "@/components/GenomesTable/GenomesContext";
import { GenomeOverviewTexts } from "@/utils/texts";

export type DownloadMetadataLinksProps = {
    className?: string
}

export const DownloadMetadataLinks: FC<DownloadMetadataLinksProps> = ({className}) => {
    const {
        selectedProject: project,
        selectedSample: sample,
    } = useGenomeContext();

    const texts = GenomeOverviewTexts.downloadLinks;
    const shouldShow = project.name !== GenomeOverviewTexts.projectSelector.allProjects;

    return (
        <div className={className}>
            {shouldShow && <div className="">
              <Link href={getFastaLink(project.name, sample.name)} target="_blank">
                <button className="bg-darkBlue hover:bg-darkBlue-dark text-white font-bold py-2 px-4 rounded mr-4">
                  <span>{texts.downloadAssemblyFASTA}</span>
                  <span className="sr-only">, {getFastaLink(project.name, sample.name)}</span>
                </button>
              </Link>
              <Link href={getResultLink(project.name, sample.name)} target="_blank">
                <button className="bg-transparent border border-darkBlue hover:bg-blue-100 text-darkBlue font-bold py-2 px-4 rounded">
                  <span>{texts.downloadMetadata}</span>
                  <span className="sr-only">, {getResultLink(project.name, sample.name)}</span>
                </button>
              </Link>
            </div>
            }
        </div>
    )
};
