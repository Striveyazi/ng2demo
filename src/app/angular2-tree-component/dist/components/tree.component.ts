import { TreeService } from '../services/tree.service';
import { TaskBagComponent } from './taskbag-content.component';
import { TreeContainer } from '../models/tree-container.model';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
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
  providers: [TreeModel,TreeContainer],
  styleUrls:['../templates/res/css/task/tree.css'],
  templateUrl:'../templates/taskbag.templates/taskbag.component.html'
})
export class TreeComponent implements OnChanges {
  constructor(public treeModel: TreeModel, public treeService: TreeService) {
    //this.treecontainer = this._treecontainer;
    //this._treecontainer._dragModel = {node:null,index:13,tree:null};
    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
  }
  _options: TreeOptions;
  @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @ContentChild('treeNodeTemplate') treeNodeTemplate: TemplateRef<ITreeNodeTemplate>;
  @ContentChild('taskbagTemplate') taskbagTemplate: TemplateRef<any>;
  // use @Input property Will be can handled in ngOnChanges
  @Input() ids: any[];
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
    console.log("tree ngOnChanges");
    let tasks = [];
    /**
     * use service  to get taskinfos;
     *  */
    for (let task_id of changes.ids.currentValue) {
      tasks.push(this.treeService.getTaskInfos(task_id));
    }
    if (tasks.length>0) {
      this.treeModel.setData({
        options:  changes.options && changes.options.currentValue,
        nodes: tasks,
        events: _.pick(this, this.treeModel.eventNames),
      })
    }

  }
}
