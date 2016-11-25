import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
@Component({
    selector: 'TreeNodeDropSlot',
    encapsulation: ViewEncapsulation.None,
    styles: [
        '.node-drop-slot { display: block; height: 2px; width: 100%}',
        '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
    ],
    template: `
    <div
      class="node-drop-slot"
      [class.is-dragging-over]="isDraggingOver(this)"
      (drop)="onDrop($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      >
    </div>
  `
})
export class TreeNodeDropSlot {
    @Input() task: Task;
    _dropLocation: any;
    constructor(public treeService: TreeService) { }
    onDragOver($event) {
        $event.preventDefault();
        this.setDropLocation(this);
    }

    onDragLeave() {
        if (this.isDraggingOver(this)) {
            this.setDropLocation(null);
        }
    }

    onDrop($event) {

        $event.preventDefault();
        let dragTask = TreeContainer._dragTask;
        // if (!this.task.canMoveTask(dragTask, this.task, this.treeService)) {
        //     return;
        // }
        let from_task = dragTask.parent.children.find((t) => t.tid === dragTask.tid);
        let index = dragTask.parent.children.indexOf(from_task);
        let fromTask = dragTask.parent.children.splice(index, 1)[0];

        //this formTask is a root Task, and it's parent is TaskBag( a virtual Task),

        //todo:judge is task or taskbag ?
        if ((<any>fromTask.parent).virtual) {
            //todo:update this virtual Task's data 
        }
        else {
            if (fromTask.parent.children.length === 0
                && fromTask.parent.children_ids.length === 0) {
                (<Task>fromTask.parent).hasChild = false;
            }
        }
        //according to this [parent component’s] assignment is a 'task.parent'
        fromTask.parent = this.task;

        if ((<any>this.task).virtual) {

            fromTask.is_root = true;
            //according to this [parent component’s] assignment is a 'task.parent'
            fromTask.bag_id = this.task.bag_id;
            this.task.children_ids.push(fromTask.tid);
            this.task.children.push(fromTask);
        }
        else {
            if (fromTask.parent.children.length === 0
                && fromTask.parent.children_ids.length === 0) {
                (<Task>fromTask.parent).hasChild = false;
            }
            //set properties;

            fromTask.is_root = false;
            //according to this [parent component’s assignment] is a 'task.parent'

            fromTask.bag_id = this.task.bag_id;
            if (!this.task.hasChild || !this.task.is_expanded) {
                this.task.hasChild = true;
                this.task.is_expanded = true;
            }
            this.task.children_ids.push(fromTask.tid);
            this.task.children.push(fromTask);//trigger the ngOnChanges/**/
        }
        this.setDropLocation(null);
        
        // TreeContainer._dragModel = null;
        // this.task.mouseAction('drop', $event, { node: this.task, index: 0, fromtree: TreeContainer._dragModel.tree, totree: this.task.treeModel });
    }
    setDropLocation(component: any) {
        this._dropLocation = component;
    }
    isDraggingOver(component: any) {
        return this._dropLocation === component;
    }
}
