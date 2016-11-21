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
    //the task's parent is the virtual node ,
    //this actrual parent is the task's taskbag
    let dragTask = TreeContainer._dragModel.node;
    if (dragTask.parent === this.task.parent && dragTask.data.task_id == this.task.data.task_id)
      return;
    let from_task = dragTask.parent.children.find((t) => t.data.task_id === dragTask.data.task_id);
    let index = dragTask.parent.children.indexOf(from_task);
    let fromTask = dragTask.parent.children.splice(index, 1)[0];
    if ((<any>this.task.data).virtual) {
      fromTask.data.is_root = true;
      fromTask.data.parent_id = this.task.data.bag_id;
      fromTask.data.bag_id = this.task.data.bag_id;

      this.task.children.push(fromTask);

      this.task.treeModel.nodes.push(fromTask.data);
      console.log(this.task.treeModel);
    }
    else {
      fromTask.data.is_root = false;
      fromTask.data.parent_id = this.task.data.task_id;
      fromTask.data.bag_id = this.task.data.bag_id;
      if (!this.task.hasChildren) {
        this.task.data.hasChild = true;
        this.task.isExpanded = true;
      }
      this.task.children.push(fromTask);//trigger the ngOnChanges/**/
    }
    // this.task.mouseAction('drop', $event, { node: this.task, index: 0, fromtree: TreeContainer._dragModel.tree, totree: this.task.treeModel });
  }
}
