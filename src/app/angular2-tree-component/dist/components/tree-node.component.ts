import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';

import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef, OnChanges } from '@angular/core';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
  selector: 'TreeNode',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../templates/res/css/task/tree.css'],
  templateUrl: '../templates/task.templates/task.component.html'
})

export class TreeNodeComponent implements OnChanges {
  @Input() task: Task;
  @Input()
  _dropLocation :any;


  onDragStart($event) {

    // first 

    setTimeout(() => {
      TreeContainer._dragTask = this.task;
      this.task.is_hidden = true;
      //todo: need to do something like splice this node when dragstart
    }, 30)
  }

  onDragEnd() {
    //this.node.treeModel.setDragNode(null);
    TreeContainer._dragTask.is_hidden = false;
    TreeContainer._dragTask = null;
    this.setDropLocation(null);
  }

  onDragOver($event) {
    $event.preventDefault();
    this.setDropLocation(this);
    //this.task.treeModel.setDropLocation({ component: this, node: this.task, index: 0 });
  }

  onDrop($event) {
    $event.preventDefault();
    let dragTask = TreeContainer._dragTask;
    this.moveTask(dragTask, this.task, this.treeService);
    
    dragTask.is_hidden = false;
    TreeContainer._dragTask = null;
    this.setDropLocation(null);
    // TreeContainer._dragModel = null;
  }

  onDragLeave(nodeContentWrapper, $event) {
    if (!this.isDraggingOver(this)) return;

    const rect = nodeContentWrapper.getBoundingClientRect();

    // If outside the element
    if ($event.clientX < rect.left || $event.clientX > rect.right ||
      $event.clientY < rect.top || $event.clientY > rect.bottom) {

      this.setDropLocation(null);
    }
  }

  constructor( public treeService: TreeService) {

  }
  ngOnChanges(changes) {
    
    console.log("taskchange");
    if(changes.task){
      
    console.log("task changesdddd");
    console.log(changes.task.currentValue.name);
    }
    if (changes.task && changes.task.currentValue.hasChild) {
      if (changes.task.currentValue.is_expanded) {
        //  get data use service
        for (let childId of changes.task.currentValue.children_ids) {
          this.treeService.createMock_Task_Child_Tasks(this.task,childId);
          //todo :if child is undefined or null ,should to handle 
          // let child = this.treeService.getTaskInfos(childId);
          // if (!child) {
          //   continue;
          // }
          // child.parent = this.task;
          // this.task.children.push(child);
        }

        //todo: set this task's postion & remove this task from old parent
      }
      else {
        this.task.children = [];
      }
    }
  }

  // custom function
  
  expanded() {
    if (this.task.is_expanded) {
      this.task.children = [];
    }
    else {
      //let children: Task[] = [];  //initialization
      //  get data use service
      for (let childId of this.task.children_ids) {
        let child = this.treeService.getTaskInfos(childId);
        //todo :if child is undefined or null ,should to handle 
        if (!child) {
          continue;
        }
        child.parent = this.task;
        //children.push(child);
        this.task.children.push(child)
      }
      // set data use viewModel
      //this.task.setChildren(children);
    }

    this.task.is_expanded = !this.task.is_expanded;
    //todo :  this expeanded's status should  save cache
  }

  /**
  * Description:taskbag can't move to another taskbag or a task,so this toTask must be a Task.
  * @param fromTask is dargTask
  * @param toTask is dropTask
  *   */
  canMoveTask(fromTask: Task, toTask: Task, service: TreeService) {
    //jugde to self
    if (fromTask.parent === toTask.parent && fromTask.tid == toTask.tid) {
      return false;
    }
    //jugde to children
    if (fromTask.hasChild) {
      return this.judgeIdInIds(fromTask, toTask, service)
    }
    return true;
  }

  judgeIdInIds(fromTask: Task, toTask: Task, service: TreeService) {
    if (fromTask.hasChild) {
      if (fromTask.children_ids.find((t) => t === toTask.tid)) {
        return false;
      }
    }
    else {
      for (let childTaskId of fromTask.children_ids) {
        let childTask = service.getTaskInfos(childTaskId);
        this.judgeIdInIds(childTask, toTask, service);
      }
    }
    return true;
  }

  moveTask(fromTask: Task, toTask: Task, service: TreeService) {
    // don't drag to self
    if (!this.canMoveTask(fromTask, toTask, service)) {
      return;
    }
    let from_node = fromTask.parent.children.find((t) => t.tid === fromTask.tid);
    let index = fromTask.parent.children.indexOf(from_node)
    let fromnode = fromTask.parent.children.splice(index, 1)[0];

    //todo:judge taskbag or task 
    if ((typeof <any>fromTask.parent)) {

    }
    else {
      //  toTask.data.children_ids.find(t=>t===fromTask.data.task_id);
      if (fromTask.parent.children.length === 0 && fromTask.parent.children_ids.length === 0) {
        (<Task>fromTask.parent).hasChild = false;
      }
    }

    //set properties;

    fromnode.parent = toTask;
    fromnode.is_root = false;
    fromnode.bag_id = toTask.bag_id;



    if (!toTask.hasChild || !toTask.is_expanded) {
      toTask.hasChild = true;
      toTask.is_expanded = true;
    }
    toTask.children_ids.push(fromnode.tid);
    //todo: use service move the ceche's data
    toTask.children.push(fromnode); //trigger the ngOnChanges
  }

  mouseAction() {
    
  }

  setDropLocation(component:any){
      this._dropLocation = component;
  }
  isDraggingOver(component:any) {
    return this._dropLocation === component;
  }
}
