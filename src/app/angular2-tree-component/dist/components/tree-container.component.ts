import { TaskBag } from '../entities/taskbag.entity';
import { TreeService } from '../services/tree.service';

import { TreeContainer } from '../models/tree-container.model';

import {
    AfterViewInit,
    Component,
    ContentChild,
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
    styleUrls:['../templates/res/css/task/tree.css'],
    templateUrl: `
    <!-- -->
    <Tree *ngFor = "let taskbag of trees"
    [taskbag]="taskbag"
    
    [options] = "taskbag.options"
    >
    
    <!-- this template' content contain per tree's nodes -->
    <!-- but  some function(such as chidrenCount()) need to write on this component(TreeContainerComponent)  
        <template #treeNodeTemplate let-node>
            <span title="{{node.data.name}}">{{ node.data.name }}</span>
            <span class="pull-right">{{ childrenCount(node) }}</span>
            <button (click)="go($event)">Custom Action</button>
        </template>
        <template #loadingTemplate>Loading, please hold....</template>
        <template #taskbagTemplate let-taskInfod>
            <span>{{taskInfod}}</span>
        </template>
    -->
    </Tree>
    `,
})
export class TreeContainerComponent implements OnChanges {

    @Input()  trees:TaskBag[];
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
        for(let index in changes.trees.currentValue){
            this.treeService.createMock_TaskBag_Children_ids(this.trees[index]);
            //(<any>this.trees)[index].children_ids = this.treeService.getTaskIds((<TaskBag>this.trees[index]).bag_id);
            //(<any>this.trees)[index].options = this.treeService.getTaskBagOptions("first");
            // (<TaskBag>this.trees[index]).children =[];
        }
    }
     childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }
     
}