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
    this.task.mouseAction('drop', $event, { node: this.task, index: 0, fromtree: TreeContainer._dragModel.tree, totree: this.task.treeModel });
  }
}
