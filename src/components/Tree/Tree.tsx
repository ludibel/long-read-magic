import React, { FC } from "react";
import { TaxonomyTreeNode } from "@/utils/models";
import { TreeNode } from "@/components/Tree/TreeNode";

export type TreeProps = {
    rootNode: TaxonomyTreeNode
}

export const Tree: FC<TreeProps> = ({rootNode}) => {
    return (
        <>
            {rootNode.children.map((domain) =>
                <TreeNode key={domain.name} node={domain}/>
            )}
        </>
    )
};
