import { window } from 'rxjs/operator/window';
import { TreeModel } from './tree.model';
import { Injectable } from '@angular/core';
import { ITreeContainer } from '../defs/api';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';



export type InteralStateType = {

};
@Injectable()
export class TreeContainer implements ITreeContainer {
    trees: {
        nodes: TreeNode[],
        options: TreeOptions
    }[]
    static _dragModel: { node: TreeNode, index: number, tree: TreeModel };
    _state: InteralStateType = {};
    constructor() {
       //TreeContainer.wit={name:'dada'};
        //this._dragModel = { node: null, index: 0, tree: null }; //initialize this class's property
    }
    setData({node, index, tree}: { node: TreeNode, index: number, tree: TreeModel }) {
        TreeContainer._dragModel = { node: node, index: index, tree: tree };
    }
    getData():any{
        return TreeContainer._dragModel;
    }
    private _clone(object: InteralStateType) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    }
    get state() {
        return this._state = this._clone(this._state);
    }
    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }
    get(prop?: any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }
}