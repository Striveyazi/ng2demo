import { PosCalculationRule } from '../biz/task-pos-calculation-rule.biz';
import { TaskBagContainer } from '../entities/taskbag-container.entity';
import { TaskBiz } from '../biz/task.component.biz';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';

import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
    selector: 'TreeNode',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../templates/res/css/task/tree.css'],
    templateUrl: '../templates/task.templates/task.component.html'
})

export class TreeNodeComponent implements OnChanges, AfterViewInit {
    @Input() task: Task;
    @Input()
    _dropLocation: any;

    @Input()
    this_parent: any;

    @Output()
    _selfInfo = new EventEmitter<{ children_manHour: number, children_completeManHour: number }>();

    constructor(public treeService: TreeService, private biz: TaskBiz, private container: TaskBagContainer, private posCalculationRule: PosCalculationRule) {

    }

    ngOnChanges(changes) {
        this.biz.ngOnChanges(changes, this.task, this.treeService);
        let sum_obj = { children_manHour: this.task.manhour, children_completeManHour: this.task.completedmanhour }
        for (let child of this.task.children) {
            sum_obj.children_manHour += (child.children_manhour);
            sum_obj.children_completeManHour += (child.children_completedmanhour);
        }
        this._selfInfo.emit(sum_obj);
        // this.task.children_manhour = sum_obj.children_manHour;
        // this.task.children_completedmanhour = sum_obj.children_completeManHour;
        // if ((<any>this.task.parent).parent) { // it's task
        //     if((<Task>this.task.parent).type==='folder'){
        //         // (<Task>this.task.parent).children_manhour += sum_obj.children_manHour;
        //         // (<Task>this.task.parent).children_completedmanhour += sum_obj.children_completeManHour;               
        //         this._selfInfo.emit(sum_obj);
        //     }         
        // }
        // else {//it's taskbag
        //      (this.task.parent).children_manhour += sum_obj.children_manHour;
        //      (this.task.parent).children_completedmanhour += sum_obj.children_completeManHour;
        //     this._selfInfo.emit(sum_obj);
        // }
    }
    ngAfterViewInit() {
        //setTimeout( ()=>this.child=()=>this.chidrenInfo.task.children,2);
        //console.log(this.chidrenInfo);
    }
    // custom function
    onDragStart($event) {

        // first 
        setTimeout(() => {
            TreeContainer._dragTask = this.task;
            this.task.is_hidden = true;
            //todo: need to do something like splice this node when dragstart
        }, 30)
    }
    //1.when this component not trigger onDrop, it will trgger this
    //2.when  drop into this slot.component, will trigger this onDragEnd.
    onDragEnd() {
        //this.node.treeModel.setDragNode(null);
        TreeContainer._dragTask.is_hidden = false;
        this.setDropLocation(null);
        console.log('end');
        //TreeContainer._dragModel = null;
    }

    onDragOver($event) {
        $event.preventDefault();
        this.setDropLocation(this);
        //this.task.treeModel.setDropLocation({ component: this, node: this.task, index: 0 });
    }

    onDrop($event) {
        $event.preventDefault();
        let dragTask = TreeContainer._dragTask;
        this.biz.moveTask(dragTask, this.task, this.treeService, this.posCalculationRule);

        dragTask.is_hidden = false;
        this.setDropLocation(null);
        TreeContainer._dragModel = null;
        //this.this_parent.counter(100);
    }

    onDragLeave(nodeContentWrapper, $event) {
        if (!this.isDraggingOver(this)) return;

        const rect = nodeContentWrapper.getBoundingClientRect();

        // If outside the element
        if ($event.clientX < rect.left || $event.clientX > rect.right ||
            $event.clientY < rect.top || $event.clientY > rect.bottom) {

            this.setDropLocation(null);
        }
    }

    expanded() {
        this.biz.expand(this.task, this.treeService);
    }

    mouseAction() {
    }

    setDropLocation(component: any) {
        this._dropLocation = component;
    }
    isDraggingOver(component: any) {
        return this._dropLocation === component;
    }
    setFocus() {
        //todo: when task moved,should update correspond taskbag's container
        if (this.container._focusedTask === this.task) {
            if (this.task.is_focused) {
                this.container._focusedTask = null;
            }
            this.task.is_focused = !this.task.is_focused;
        }
        else {
            if (this.container._focusedTask) {
                this.container._focusedTask.is_focused = false;
            }
            this.task.is_focused = true;
            this.container._focusedTask = this.task;
        }
    }
    getChildInfo($event: { children_manHour: number, children_completeManHour: number }) {
        this.counter($event.children_manHour, $event.children_completeManHour, this.task);
        // console.log($event);
        // // this.task.children_manhour+=$event.children_manHour;
        // // this.task.children_completedmanhour +=$event.children_completeManHour;
        // console.log(this.task);
    }
    counter(children_manHour: number, children_completeManHour: number, task: Task) {
        //this.biz.counter(task.children_manhour, task.children_completedmanhour,task.parent,this.this_parent)
        task.children_manhour += children_manHour;
        task.children_completedmanhour += children_completeManHour;

        this.this_parent.counter(task.children_manhour, task.children_completedmanhour, task.parent);

    }
    sub(children_manHour: number, children_completeManHour: number, task: Task){
        task.children_manhour -= children_manHour;
        task.children_completedmanhour -= children_completeManHour;

        this.this_parent.sub(task.children_manhour, task.children_completedmanhour, task.parent);
    }
}
