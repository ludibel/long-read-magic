import React, { FC, useState } from "react"
import { Manifest, Project, Sample } from "@/utils/models";
import clsx from "clsx"

export type ProjectSelectorProps = {
    manifest: Manifest,
    setSelectedData: any,
    classname?: string
}
export const ProjectSelector: FC<ProjectSelectorProps> = ({manifest, setSelectedData, classname}) => {
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [selectedSample, setSelectedSample] = useState<Sample>();

    function setProject(project) {
        if (project === selectedProject){
            return;
        }

        setSelectedProject(project);
        setSelectedSample(undefined);
        setSelectedData({project: project?.name, sample: undefined, items: []})
    }

    function setSample(sample) {
        setSelectedSample(sample);
        setSelectedData({project: selectedProject.name, sample: sample.name, items: sample.items});
    }

    return (
        <div className={classname}>
            <p>Select Project</p>
            <button className={clsx(selectedProject === undefined ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
            onClick={() => setProject(undefined)}>
                All projects
                </button>
            <p>Or</p>
            <p className="isolate inline-flex rounded-md shadow-sm mb-4 flex-wrap">
                {manifest.projects.map((project, index) => {
                    return (
                        <button key={project.name}
                                type="button"
                                className={clsx(selectedProject?.name === project.name ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                                    "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                                onClick={() => setProject(project)}
                        >
                            {project.name}
                        </button>
                    )
                })
                }
            </p>
            <br/>
            {selectedProject &&
              <div>
                <p>Select Sample</p>
                <p className="isolate inline-flex rounded-md shadow-sm">
                    {selectedProject.samples.map((sample, index) => {
                        return (
                            <button key={sample.name}
                                    type="button"
                                    className={clsx(  selectedSample?.name === sample.name ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                                        "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                                    onClick={() => setSample(sample)}
                            >
                                {sample.name}
                            </button>
                        )
                    })
                    }
                </p>
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
