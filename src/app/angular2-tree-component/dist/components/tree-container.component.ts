import { TreeService } from '../services/tree.service';

import { TreeContainer } from '../models/tree-container.model';

import {
    AfterViewInit,
    Component,
    ContentChild,
    CUSTOM_ELEMENTS_SCHEMA,
    Input,
    OnChanges,
    OnInit,
    TemplateRef
} from '@angular/core';
import { TreeComponent } from './tree.component';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'app/angular2-tree-component';
@Component({
    moduleId: module.id,
    selector: 'TreeContainer',
    providers: [TreeContainer,TreeService],
    templateUrl: `
    <!-- -->
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
    <template #taskbagTemplate let-taskInfod>
        <span>{{taskInfod}}</span>
    </template>
    </Tree>
    `,
})
export class TreeContainerComponent implements OnChanges {

    @Input()  trees:any[];
    @ContentChild('loadingTemplate') loadingTemplate:TemplateRef<any>;
    
    constructor(public treecontainer:TreeContainer,public treeService:TreeService) {
        this.trees = [];
    //    this.treecontainer.trees = this.trees;
    //    this.treecontainer._dragModel = {node:null,index:13,tree:null};
     
    }
    ngOnChanges(changes) {
        // will comein twice ,first is inits ,second is the @input property has changes
        console.log("trees inits")
        console.log(this.trees);
        console.log();
        //this.trees = [];
        let hasValue=[];
        for(let taskbag_id in changes.trees.currentValue){
            let nodes = this.treeService.getTaskIds(taskbag_id);
            let options = this.treeService.getTaskBagOptions(taskbag_id);
            hasValue.push({nodes:nodes,options:options});
        }
        if(hasValue){
            this.trees =hasValue;
        }
        console.log(this.trees);
        //this.trees.push({nodes:nodes,options:options});
        // this.trees = changes.trees.currentValue;
        // console.log(this.trees);
    }
     childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }
     
}