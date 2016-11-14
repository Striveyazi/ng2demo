import { TreeModel } from './tree.model';
import { Injectable } from '@angular/core';
import { ITreeContainer } from '../defs/api';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';

@Injectable()
export class TreeContainer implements ITreeContainer {
    trees: {
        nodes: TreeNode[],
        options: TreeOptions
    }[]
    _dragModel:{node:TreeNode,index:number,tree:TreeModel};
    constructor(){
        this._dragModel ={node:null,index:0,tree:null}; //initialize this class's property
    }
    setData({node,index,tree}:{node:TreeNode,index:number,tree:TreeModel}){
        this._dragModel = {node:node,index:index,tree:tree};
    }
}