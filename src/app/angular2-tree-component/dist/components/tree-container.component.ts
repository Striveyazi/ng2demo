import { TreeContainer } from '../models/tree-container.model';

import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit } from '@angular/core';
import { TreeComponent } from './tree.component';
import { CommonModule } from '@angular/common';
@Component({
    moduleId: module.id,
    selector: 'TreeContainer',
    providers: [TreeContainer],
    templateUrl: `
    <Tree *ngFor = "let tree of trees"

    [nodes]="tree.nodes"
    [options] = "tree.options"
    >
    
    </Tree>
    `,
})
export class TreeContainerComponent implements OnChanges {

    @Input()  trees:any[];
    constructor(public treecontainer:TreeContainer) {
    //    this.treecontainer.trees = this.trees;
    //    this.treecontainer._dragModel = {node:null,index:13,tree:null};
     
    }
    ngOnChanges(changes) {
        // console.log(changes.trees.currentValue);
        // this.trees = changes.trees.currentValue;
        // console.log(this.trees);
     }
}