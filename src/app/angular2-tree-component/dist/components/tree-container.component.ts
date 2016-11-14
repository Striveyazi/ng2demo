
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit } from '@angular/core';
import { TreeComponent } from './tree.component';
import { CommonModule } from '@angular/common';
@Component({
    moduleId: module.id,
    selector: 'TreeContainer',
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
    constructor() {
        console.log("Tree template");
    }
    ngOnChanges(changes) {
        // console.log(changes.trees.currentValue);
        // this.trees = changes.trees.currentValue;
        // console.log(this.trees);
     }
}