import { TreeService } from '../services/tree.service';
import { TaskBagComponent } from './taskbag-content.component';
import { TreeContainer } from '../models/tree-container.model';
import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { ITreeNodeTemplate } from './tree-node-content.component';
import { TreeModel } from '../models/tree.model';
import { TreeOptions } from '../models/tree-options.model';
import { KEYS } from '../constants/keys';
import * as _ from 'lodash'

@Component({
  selector: 'Tree',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(body: keydown)': "onKeydown($event)",
    '(body: mousedown)': "onMousedown($event)"
  },
  providers: [TreeModel,TreeService],
  styles: [
    '.tree-children { padding-left: 20px }',
    `.tree {
      display: inline-block;
      cursor: pointer;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none;   /* Chrome/Safari/Opera */
      -khtml-user-select: none;    /* Konqueror */
      -moz-user-select: none;      /* Firefox */
      -ms-user-select: none;       /* IE/Edge */
      user-select: none;           /* non-prefixed version, currently not supported by any browser */
    }`
  ],
  template: `
    <div class="tree" [class.node-dragging]="treeModel.isDragging()">
    <TaskBagContent [taskBagInfo]="treeModel.taskBagInfo" [taskBagContentTemplate]="taskbagTemplate">
    </TaskBagContent>
      <TreeNode
        *ngFor="let node of treeModel.roots; let i = index"
        [node]="node"
        [nodeIndex]="i"
        [loadingTemplate]="loadingTemplate"
        [treeNodeContentTemplate]="treeNodeTemplate">
      </TreeNode>
    </div>
  `
})
export class TreeComponent implements OnChanges {
  constructor(public treeModel: TreeModel,public treeService:TreeService) {
    //this.treecontainer = this._treecontainer;
    //this._treecontainer._dragModel = {node:null,index:13,tree:null};
    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
  }

  _nodes: any[];
  _options: TreeOptions;
  @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @ContentChild('treeNodeTemplate') treeNodeTemplate: TemplateRef<ITreeNodeTemplate>;
  @ContentChild('taskbagTemplate') taskbagTemplate: TemplateRef<any>;
  // use @Input property Will be can handled in ngOnChanges
  @Input() set nodes(nodes: any[]) {
    this._nodes = nodes
   };
  @Input() set options(options: TreeOptions) { };
  @Input() set focused(value: boolean) {
    this.treeModel.setFocus(value);
  }

  @Output() onToggle;
  @Output() onActiveChanged;
  @Output() onActivate;
  @Output() onDeactivate;
  @Output() onFocus;
  @Output() onBlur;
  @Output() onDoubleClick;
  @Output() onContextMenu;
  @Output() onUpdateData;
  @Output() onInitialized;
  @Output() onMoveNode;
  @Output() onEvent;

  onKeydown($event) {
    if (!this.treeModel.isFocused) return;
    if (_.includes(['input', 'textarea'],
      document.activeElement.tagName.toLowerCase())) return;

    const focusedNode = this.treeModel.getFocusedNode();

    this.treeModel.performKeyAction(focusedNode, $event);
  }

  onMousedown($event) {
    let insideClick = $event.target.closest('Tree');
    if (!insideClick) {
      this.treeModel.setFocus(false);
    }
  }

  ngOnChanges(changes) {
    // this.treeModel.setData({
    //   options: changes.options && changes.options.currentValue,
    //   nodes: changes.nodes && changes.nodes.currentValue,
    //   events: _.pick(this, this.treeModel.eventNames),
    //   taskbaginfo: { chooseStates: true }
    // });
    this.treeModel.setData({
      options: changes.options && changes.options.currentValue,
      nodes: this.treeService.getTaskInfos("first"),
      events: _.pick(this, this.treeModel.eventNames),
      taskbaginfo: { chooseStates: true }
    })
  }
}
