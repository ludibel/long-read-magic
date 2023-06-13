import { BinDetails, TaxonomyTreeNode } from "./utils/models";



function parseClassification(classification: string): string[] {
    const fields = classification.split(';');
    return fields;
}

export function  generateTaxonomyMetadataForFile(fileContent: string, project: string, sample: string, treeRoot: TaxonomyTreeNode) {
    const lines = fileContent.trim().split("\n");
    const classificationIndex = lines[0].split(',').findIndex((value) => value === 'classification');
    const filenameIndex = 0;
    if (classificationIndex === -1) {
        return;
    }

    lines.slice(1).forEach((line, index) => {
        const fields = line.split(',');
        const classification = fields[classificationIndex];
        const name = fields[filenameIndex];
        const binDetails: BinDetails = { project, sample, name };
        if (classification === undefined) {
            return;
        }

        const classificationList = parseClassification(classification);

        processTaxonomyLevel(classificationList, treeRoot, binDetails)
    });

    countChildren(treeRoot);
}

function processTaxonomyLevel(classificationList: string[], parentNode: TaxonomyTreeNode, binDetails: BinDetails) {
    const currentClassificationName = classificationList[0]
    let childNode = parentNode.children.find(x => x.name === currentClassificationName);

    if (childNode === undefined) {
        childNode = { name: currentClassificationName, children: [], count: 0 };
        parentNode.children.push(childNode);
    }

    if (classificationList.length === 1) {
        childNode.binDetails = childNode.binDetails ?? [];
        childNode.binDetails.push(binDetails);
        return;
    } else {
        processTaxonomyLevel(classificationList.slice(1), childNode, binDetails)
    }
}

function countChildren(node: TaxonomyTreeNode){
    if(node.children.length === 0){
        node.count = node?.binDetails?.length ?? 0;
        return;
    }

    node.children.forEach(child => {
        countChildren(child)
    });

    node.count = node.children.reduce((accumulator, child) => { return accumulator + child.count }, 0)
}
