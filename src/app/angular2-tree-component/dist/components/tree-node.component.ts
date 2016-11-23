import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';

import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef, OnChanges } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
  selector: 'TreeNode',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['../templates/res/css/task/tree.css'],
  templateUrl:'../templates/task.templates/task.component.html'
})

export class TreeNodeComponent implements AfterViewInit, OnChanges {
  @Input() task: TreeNode;
  @Input() nodeIndex: number;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
  @Input() loadingTemplate: TemplateRef<any>;



  // TODO: move to draggable directive
  onDragStart($event) {
    console.log("onDragStart");

    // first 

    setTimeout(() => {
      this.task.treeModel.setDragNode({ node: this.task.parent, index: this.nodeIndex });
      let index = this.task.parent.children.indexOf(this.task);
      //this.task.parent.children.splice(index,1)[0];
      //todo: need to do something like splice this node when dragstart
      TreeContainer._dragModel = { node: this.task, index: this.nodeIndex, tree: this.task.treeModel }
    }, 30)
  }

  onDragEnd() {
    //this.node.treeModel.setDragNode(null);
    console.log("end");
    TreeContainer._dragModel = null;
  }

  onDragOver($event) {
    console.log("over");
    $event.preventDefault();
    this.task.treeModel.setDropLocation({ component: this, node: this.task, index: 0 });
  }

  onDrop($event) {
    console.log(this.task);
    $event.preventDefault();
    //this.task.mouseAction('drop', $event, { node: this.task, index: 0, fromtree: TreeContainer._dragModel.tree, totree: this.task.treeModel });
    
    //todo: jugde fromNode can move to  toNode ****it's important

    //todo: set this task's postion & remove this task from old parent
     let dragTask = TreeContainer._dragModel.node;
    // // don't drag to self
    // if (dragTask.parent === this.task.parent && dragTask.data.task_id == this.task.data.task_id)
    //   return;
    // let from_node = dragTask.parent.children.find((t)=>t.data.task_id === dragTask.data.task_id);
    // let index =  dragTask.parent.children.indexOf(from_node)
    //  let fromnode = dragTask.parent.children.splice(index, 1)[0];

    // fromnode.data.parent_id =this.task.data.task_id;
    // fromnode.data.bag_id = this.task.data.bag_id;
    // this.task.data.children_ids.push(fromnode.data.task_id)
    // if (!this.task.hasChildren) {
    //   this.task.data.hasChild = true;
    //   this.task.isExpanded = true;
    // }
    // //todo: use service move the ceche's data
    // this.task.children.push(fromnode); //trigger the ngOnChanges
    this.task.moveTask(dragTask,this.task,this.treeService);
    // TreeContainer._dragModel = null;
  }

  onDragLeave(nodeContentWrapper, $event) {
    console.log("leave");
    if (!this.task.treeModel.isDraggingOver(this)) return;

    const rect = nodeContentWrapper.getBoundingClientRect();

    // If outside the element
    if ($event.clientX < rect.left || $event.clientX > rect.right ||
      $event.clientY < rect.top || $event.clientY > rect.bottom) {

      this.task.treeModel.setDropLocation(null);
    }
  }

  constructor(private elementRef: ElementRef, public treeService: TreeService) {

  }
  expanded() {
    if (this.task.isExpanded) {
      this.task.children = [];
    }
    else {
      let children: Task[] = [];  //initialization
      //  get data use service
      for (let childId of this.task.data.children_ids) {
        let child = this.treeService.getTaskInfos(childId);
        //todo :if child is undefined or null ,should to handle 
        if (!child) {
         return ;
        }
        children.push(child);
      }
      // set data use viewModel
      this.task.setChildren(children);
    }

    this.task.isExpanded = !this.task.isExpanded;
    //todo :  this expeanded's status should  save cache
  }
  ngAfterViewInit() {
    this.task.elementRef = this.elementRef;
  }
  ngOnChanges(changes) {
    console.log("ngOnChanges");
    if (changes.task && changes.task.currentValue.data && changes.task.currentValue.data.hasChild) {
      if (changes.task.currentValue.data.is_expanded) {
        let children: Task[] = [];  //initialization
        //  get data use service
        for (let childId of changes.task.currentValue.data.children_ids) {
          //todo :if child is undefined or null ,should to handle 
          let child = this.treeService.getTaskInfos(childId);
          if (!child) {
            return ;
          }
          children.push(child);
          
        }
        // set data use viewModel

        //todo: set this task's postion & remove this task from old parent
        this.task.setChildren(children);
      }
      else {
        this.task.children = [];
      }
    }
  }
}
