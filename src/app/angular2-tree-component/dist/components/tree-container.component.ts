import { PosCalculationRule } from '../biz/task-pos-calculation-rule.biz';
import { TaskBagBiz } from '../biz/taskbag.component.biz';
import { TaskDropSlotBiz } from '../biz/task-drop-slot.component.biz';
import { TaskBiz } from '../biz/task.component.biz';
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
@Component({
    moduleId: module.id,
    selector: 'TreeContainer',
    providers: [TreeService,TaskBiz,TaskDropSlotBiz,TaskBagBiz,PosCalculationRule,TreeContainer],
    styleUrls:['../templates/res/css/task/tree.css'],
    templateUrl: `
    <!-- -->
    <Tree *ngFor = "let taskbag of trees"
    [taskbag]="taskbag"
    
    [options] = "taskbag.options"
    >
    `,
})
export class TreeContainerComponent implements OnChanges {

    @Input()  trees:TaskBag[];
    
    constructor(public treeService:TreeService,private treeContainer:TreeContainer) {
     
    }
    ngOnChanges(changes) {
        console.log('tree container');
        this.treeContainer._isFirstInit = true;
        // will comein twice ,first is inits ,second is the @input property has changes
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
     
}