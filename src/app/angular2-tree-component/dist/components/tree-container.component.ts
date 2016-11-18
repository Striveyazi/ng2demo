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
    providers: [TreeService],
    templateUrl: `
    <!-- -->
    <Tree *ngFor = "let tree of trees"

    [ids]="tree.children_ids"
    [options] = "tree.options"
    >
    <!-- this template' content contain per tree's nodes -->
    <!-- but  some function(such as chidrenCount()) need to write on this component(TreeContainerComponent)  -->
    <template #treeNodeTemplate let-node>
        <span title="{{node.data.name}}">{{ node.data.name }}</span>
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
    
    constructor(public treeService:TreeService) {
     
    }
    ngOnChanges(changes) {
        // will comein twice ,first is inits ,second is the @input property has changes
        console.log("trees inits")
        console.log();
        let hasValue=[];
        /**
         * should get every tree's childrenId(it's a array) and options;
         */
        for(let tree in changes.trees.currentValue){
            (<any>this.trees)[tree].children_ids = this.treeService.getTaskIds("first");
            (<any>this.trees)[tree].options = this.treeService.getTaskBagOptions("first");
        }
    }
     childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }
     
}