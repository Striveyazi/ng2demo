import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

export interface ITreeNodeTemplate {
  node: TreeNode;
  context: any;
}

@Component({
  selector: 'TreeNodeContent',
  template: `<span *ngIf="!treeNodeContentTemplate">{{ task.displayField }}</span>
  <template [ngTemplateOutlet]="treeNodeContentTemplate" [ngOutletContext]="{ $implicit: task }"></template>
  <div>
    <span *ngIf="task.Badges&&task.Badges.expire_date">
      <span>expire_date:{{task.Badges.expire_date}}</span>
    </span>
    <span *ngIf="task.Badges&&task.Badges.comment_count">
      <span>comment_count:{{task.Badges.comment_count}}</span>
    </span>
    <span *ngIf="task.Badges&&task.Badges.file_count">
      <span>file_count{{task.Badges.file_count}}</span>
    </span>
    <span *ngIf="task.Badges&&task.Badges.completed_count&&task.Badges.total_count">
      <span>Completion:{{task.Badges.completed_count}}/{{task.Badges.total_count}}</span>
    </span>
  </div>
  `,
})
export class TreeNodeContent {
  @Input() task: TreeNode;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
}
