import { TaskBagContainer } from '../entities/taskbag-container.entity';
import { Jsonp } from '@angular/http';
import { TaskBag } from '../entities/taskbag.entity';

import { TreeService } from '../services/tree.service';
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
  styleUrls:['../templates/res/css/task/tree.css'],
  templateUrl:'../templates/taskbag.templates/taskbag.component.html',
  providers:[TaskBagContainer]
})
export class TreeComponent implements OnChanges {
  constructor( public treeService: TreeService) {
    //this.treecontainer = this._treecontainer;
    //this._treecontainer._dragModel = {node:null,index:13,tree:null};
    // treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
  }
  _options: TreeOptions;
  // @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  // @ContentChild('treeNodeTemplate') treeNodeTemplate: TemplateRef<ITreeNodeTemplate>;
  // @ContentChild('taskbagTemplate') taskbagTemplate: TemplateRef<any>;
  // use @Input property Will be can handled in ngOnChanges
  @Input() taskbag:TaskBag;
  @Input() set options(options: TreeOptions) { };
  @Input() set focused(value: boolean) {
   
  }

  onKeydown($event) {
   
  }

  onMousedown($event) {
    
  }
  ngOnChanges(changes) {
    console.log("taskbag changes");
    // let tasks = [];
    /**
     * use service  to get taskinfos;
     *  */

    
    let pos=100;
    for (let child_id of changes.taskbag.currentValue.children_ids) {
      this.treeService.createMock_Bags_Child_Tasks(this.taskbag,child_id,pos)
      // let child = this.treeService.getTaskInfos(child_id);
      // child.parent = this.taskbag;
      // this.taskbag.children.push(child);
      pos++;
    }
   this.taskbag.children.sort((a,b)=>a.pos-b.pos);
  }
}
