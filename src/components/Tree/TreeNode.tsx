import React, { FC, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { TaxonomyTreeNode } from "@/utils/models";
import Link from "next/link";

export type TreeNodeProps = {
    node: TaxonomyTreeNode
    shouldExpand?: boolean
}

export const TreeNode: FC<TreeNodeProps> = ({node, shouldExpand}) => {
    const [childShouldExpand, setChildShouldExpand] = useState(shouldExpand);
    const [showChildren, setShowChildren] = useState(childShouldExpand);

    function switchDisplay() {
        setShowChildren(!showChildren);
        if (node.count === 1) {
            setChildShouldExpand(true);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex cursor-pointer border rounded-md mb-1 p-2 pr-4 bg-sky-100 w-auto mr-auto" onClick={switchDisplay}>
                {!showChildren && <ChevronRightIcon className="w-5 inline"/>}
                {showChildren && <ChevronDownIcon className="w-5"/>}

                <p>{node.name} - {node.count}</p>
            </div>

            {showChildren && <div className="ml-4">
                {node.children.map((child) =>
                    <TreeNode key={child.name} node={child} shouldExpand={childShouldExpand}/>
                )}
                <div className="flex flex-col">
                {node.binDetails && node.binDetails.map((bin) =>
                    <div className="inline-flex cursor-pointer border rounded-md mb-1 p-2 pr-4 bg-sky-100 hover:bg-sky-200 w-auto mr-auto"
                         key={`${bin.project}/${bin.sample}/${bin.name}`}>
                        <Link href={`genome-details/${bin.project}/${bin.sample}/${bin.name}`} target="_blank">
                            {bin.name}
                        </Link>
                    </div>
                )}
                </div>
            </div>
            }

        </div>
    )
}
