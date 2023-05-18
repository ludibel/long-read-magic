import React, { FC, useState } from "react"
import { Manifest, Project, ProjectVariation } from "@/utils/models";
import clsx from "clsx"

export type ProjectSelectorProps = {
    manifest: Manifest,
    setSelectedItems: any,
    classname?: string
}
export const ProjectSelector: FC<ProjectSelectorProps> = ({manifest, setSelectedItems, classname}) => {
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [selectedProjectVariation, setSelectedProjectVariation] = useState<ProjectVariation>();

    function setProjectVariation(variation) {
        setSelectedProjectVariation(variation);
        setSelectedItems(variation.items);
    }

    return (
        <div className={classname}>
            <p>Select Project</p>
            <p className="isolate inline-flex rounded-md shadow-sm mb-4">
                {manifest.projects.map((project, index) => {
                    return (
                        <button key={project.name}
                                type="button"
                                className={clsx("relative inline-flex items-center first:rounded-l-md last:rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10",
                                    selectedProject?.name === project.name && "bg-blue-400 hover:bg-blue-500")}
                                onClick={() => setSelectedProject(project)}
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
                <p>Select Project Variation</p>
                <p className="isolate inline-flex rounded-md shadow-sm">
                    {selectedProject.variations.map((variation, index) => {
                        return (
                            <button key={variation.name}
                                    type="button"
                                    className={clsx("relative inline-flex items-center first:rounded-l-md last:rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10",
                                        selectedProjectVariation?.name === variation.name && "bg-blue-400 hover:bg-blue-500")}
                                    onClick={() => setProjectVariation(variation)}
                            >
                                {variation.name}
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
