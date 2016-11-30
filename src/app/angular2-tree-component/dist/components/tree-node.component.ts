import { TaskBagContainer } from '../entities/taskbag-container.entity';
import { TaskBiz } from '../biz/task.component.biz';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';

import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef, OnChanges } from '@angular/core';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
    selector: 'TreeNode',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../templates/res/css/task/tree.css'],
    templateUrl: '../templates/task.templates/task.component.html'
})

export class TreeNodeComponent implements OnChanges {
    @Input() task: Task;
    @Input()
    _dropLocation: any;


   

    constructor(public treeService: TreeService, private biz: TaskBiz, private container: TaskBagContainer) {

    }
    ngOnChanges(changes) {
        this.biz.ngOnChanges(changes, this.task, this.treeService);
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
        this.biz.moveTask(dragTask, this.task, this.treeService);

        dragTask.is_hidden = false;
        this.setDropLocation(null);
        TreeContainer._dragModel = null;
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
}
