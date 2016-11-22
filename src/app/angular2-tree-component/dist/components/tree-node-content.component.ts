import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

export interface ITreeNodeTemplate {
  node: TreeNode;
  context: any;
}

@Component({
  selector: 'TreeNodeContent',
  styleUrls:['../templates/task.templates/task-content.component.css'],
  templateUrl:'../templates/task.templates/task-content.component.html',
})
export class TreeNodeContent {
  @Input() task: TreeNode;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
}
