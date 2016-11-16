
import { TreeContainer } from '../models/tree-container.model';

import { Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { TreeComponent } from './tree.component';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'app/angular2-tree-component';
@Component({
    moduleId: module.id,
    selector: 'TreeContainer',
    providers: [TreeContainer],
    templateUrl: `
    <Tree *ngFor = "let tree of trees"

    [nodes]="tree.nodes"
    [options] = "tree.options"
    >
    <!-- this template' content contain per tree's nodes -->
    <!-- but  some function(such as chidrenCount()) need to write on this component(TreeContainerComponent)  -->
    <template #treeNodeTemplate let-node>
        <span title="{{node.data.subTitle}}">{{ node.data.name }}</span>
         <span class="pull-right">{{ childrenCount(node) }}</span>
        <button (click)="go($event)">Custom Action</button>
    </template>
    <template #loadingTemplate>Loading, please hold....</template>
    </Tree>
    `,
})
export class TreeContainerComponent implements OnChanges {

    @Input()  trees:any[];
    @ContentChild('loadingTemplate') loadingTemplate:TemplateRef<any>;
    @ContentChild('taskbagTemplate') taskbagTemplate:TemplateRef<any>;
    constructor(public treecontainer:TreeContainer) {
    //    this.treecontainer.trees = this.trees;
    //    this.treecontainer._dragModel = {node:null,index:13,tree:null};
     
    }
    ngOnChanges(changes) {
        // console.log(changes.trees.currentValue);
        // this.trees = changes.trees.currentValue;
        // console.log(this.trees);
     }
     childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }
     
}