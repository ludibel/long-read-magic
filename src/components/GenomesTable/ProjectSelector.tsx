import React, { FC } from "react"
import { useGenomeContext } from "@/components/GenomesTable/GenomesContext";
import { GenomeOverviewTexts } from "@/utils/texts";
import clsx from "clsx";
import { Dropdown } from "@/components/Dropdown";

export type ProjectSelectorProps = {
    className?: string
}
export const ProjectSelector: FC<ProjectSelectorProps> = ({className}) => {
    const {
        manifest,
        selectedProject,
        setSelectedProject,
        selectedSample,
        setSelectedSample,
        setItems
    } = useGenomeContext();
    const texts = GenomeOverviewTexts.projectSelector;

    const projects = manifest.projects.slice();

    const projectOptions = projects.map(project => ({value: project, label: project.name}));
    const sampleOptions = selectedProject?.samples.map(sample => ({value: sample, label: sample.name}));

    function setProject(event) {
        const newProject = event.value

        if (newProject === selectedProject) {
            return;
        }

        setSelectedProject(newProject);
        setSelectedSample(newProject.samples[0]);
        setItems(newProject.samples[0]?.items ?? [])
    }

    function setSample(event) {
        const newSample = event.value
        if (newSample === selectedSample) {
            return;
        }

        setSelectedSample(newSample);
        setItems(newSample.items);
    }


    return (
        <div className={clsx(className, "flex gap-8")}>
            <div>
                <p className="text-lg font-bold mb-2">{texts.selectProjectLabel}</p>
                <Dropdown options={projectOptions} onChange={setProject} id="project-selector"
                          value={{value: selectedProject, label: selectedProject?.name}}/>
            </div>

            {selectedProject && selectedProject.name != texts.allProjects &&
              <div>
                <p className="text-lg font-bold mb-2">{texts.selectSampleLabel}</p>
                <Dropdown options={sampleOptions} onChange={setSample} id="sample-selector"
                          value={{value: selectedSample, label: selectedSample.name}}/>
              </div>
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}
