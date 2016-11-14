import { ITreeContainer } from '../defs/api';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
export class TreeContainer implements ITreeContainer {
    trees: {
        nodes: TreeNode[],
        options: TreeOptions
    }[]
}