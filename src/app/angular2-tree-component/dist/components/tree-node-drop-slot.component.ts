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
      [class.is-dragging-over]="task.treeModel.isDraggingOver(this)"
      (drop)="onDrop($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      >
    </div>
  `
})
export class TreeNodeDropSlot {
    @Input() task: TreeNode;
    @Input() dropIndex: number;

    constructor(public treeService: TreeService) { }
    onDragOver($event) {
        $event.preventDefault();
        this.task.treeModel.setDropLocation({ component: this, node: this.task, index: this.dropIndex });
    }

    onDragLeave() {
        if (this.task.treeModel.isDraggingOver(this)) {
            this.task.treeModel.setDropLocation(null);
        }
    }

    onDrop($event) {

        $event.preventDefault();
        let dragTask = TreeContainer._dragModel.node;
        if (!this.task.canMoveTask(dragTask, this.task, this.treeService)) {
            return;
        }
        let from_task = dragTask.parent.children.find((t) => t.data.task_id === dragTask.data.task_id);
        let index = dragTask.parent.children.indexOf(from_task);
        let fromTask = dragTask.parent.children.splice(index, 1)[0];

        //this formTask is a root Task, and it's parent is TaskBag( a virtual Task),

        if ((<any>fromTask.parent.data).virtual) {
            //todo:update this virtual Task's data 
        }
        else {
            if (fromTask.parent.children.length === 0
                && fromTask.parent.data.children_ids.length === 0) {
                fromTask.parent.data.hasChild = false;
            }
        }
        //according to this [parent component’s] assignment is a 'task.parent'
        fromTask.parent = this.task;

        if ((<any>this.task.data).virtual) {

            fromTask.data.is_root = true;
            //according to this [parent component’s] assignment is a 'task.parent'
            fromTask.data.parent_id = this.task.data.bag_id;
            fromTask.data.bag_id = this.task.data.bag_id;

            this.task.children.push(fromTask);

            this.task.treeModel.nodes.push(fromTask.data);
        }
        else {
            if (fromTask.parent.children.length === 0
                && fromTask.parent.data.children_ids.length === 0) {
                fromTask.parent.data.hasChild = false;
            }
            //set properties;

            fromTask.data.is_root = false;
            //according to this [parent component’s assignment] is a 'task.parent'
            fromTask.data.parent_id = this.task.data.task_id;
            fromTask.data.bag_id = this.task.data.bag_id;
            if (!this.task.hasChildren || !this.task.isExpanded) {
                this.task.data.hasChild = true;
                this.task.isExpanded = true;
            }
            this.task.data.children_ids.push(fromTask.data.task_id);
            this.task.children.push(fromTask);//trigger the ngOnChanges/**/
        }
        // this.task.mouseAction('drop', $event, { node: this.task, index: 0, fromtree: TreeContainer._dragModel.tree, totree: this.task.treeModel });
    }
}
