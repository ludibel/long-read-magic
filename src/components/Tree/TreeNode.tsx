import React, { FC, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon,LinkIcon } from "@heroicons/react/20/solid"
import { TaxonomyTreeNode } from "@/utils/models";
import Link from "next/link";
import { GlobalTexts } from "@/utils/texts";

export type TreeNodeProps = {
    node: TaxonomyTreeNode
    shouldExpand?: boolean
}

export const TreeNode: FC<TreeNodeProps> = ({node, shouldExpand}) => {
    const [childShouldExpand, setChildShouldExpand] = useState(shouldExpand);
    const [showChildren, setShowChildren] = useState(childShouldExpand);

    function switchDisplay() {
        // if the node has less than 20 leaves, show them all
        if (node.count < 20 && !showChildren) {
            setChildShouldExpand(true);
            setShowChildren(true);
            return;
        }
        setShowChildren(!showChildren);
        if (node.count === 1) {
            setChildShouldExpand(true);
        }
    }
    const nodeClassification = node.name.substring(0,1);
    const nodeName = node.name || GlobalTexts.unknown;

    return (
        <div className="flex flex-col">
            <div className="flex cursor-pointer mb-1 p-2  text-darkBlue w-auto mr-auto" onClick={switchDisplay}>
                {!showChildren && <ChevronRightIcon className="w-5 inline"/>}
                {showChildren && <ChevronDownIcon className="w-5"/>}

                <div className="bg-white border  rounded p-2 border-darkBlue ">
                    <span className="mr-4">{nodeName}</span>
                    <span className="border border-darkBlue px-3 text-sm rounded-3xl">{node.count}</span>
                </div>
            </div>

            {showChildren && <div className="ml-4">
                {node.children.map((child) =>
                    <TreeNode key={child.name} node={child} shouldExpand={childShouldExpand}/>
                )}
              <div className="flex flex-col ml-6">
                  {node.binDetails && node.binDetails.map((bin) =>
                      <Link href={`genomes/${bin.project}/${bin.sample}/${bin.name}`}
                            key={`${bin.project}/${bin.sample}/${bin.name}`} target="_blank">
                          <div className="inline-flex cursor-pointer border rounded-md mb-1 p-2 pr-4 text-white bg-darkBlue hover:bg-darkBlue-light w-auto mr-auto">
                              <LinkIcon className="w-4 h-4 my-auto mr-2"/>
                              {bin.name}
                          </div>
                      </Link>
                  )}
              </div>
            </div>
            }

        </div>
    )
}
