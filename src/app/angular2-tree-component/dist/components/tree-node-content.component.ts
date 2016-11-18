import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

export interface ITreeNodeTemplate {
  node: TreeNode;
  context: any;
}

@Component({
  selector: 'TreeNodeContent',
  template: `<span *ngIf="!treeNodeContentTemplate">{{ task.displayField }}</span>
  <template [ngTemplateOutlet]="treeNodeContentTemplate" [ngOutletContext]="{ $implicit: task }"></template>`,
})
export class TreeNodeContent {
  @Input() task: TreeNode;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
}
