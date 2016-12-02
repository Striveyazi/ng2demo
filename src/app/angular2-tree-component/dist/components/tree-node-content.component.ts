import { Task } from '../entities/task.entity';
import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

export interface ITreeNodeTemplate {
  node: Task;
  context: any;
}

@Component({
  selector: 'TreeNodeContent',
  styleUrls:['../templates/res/css/task/tree.css'],
  templateUrl:'../templates/task.templates/task-content.component.html',
})
export class TreeNodeContent {
  @Input() task: Task;
  @Input() parent:any;
}
