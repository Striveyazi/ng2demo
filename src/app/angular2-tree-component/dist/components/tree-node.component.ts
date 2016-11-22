import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';

import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef, OnChanges } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
  selector: 'TreeNode',
  encapsulation: ViewEncapsulation.None,
  styles: [
    '.tree-children { padding-left: 20px }',
    `.node-content-wrapper {
      display: inline-block;
      padding: 2px 5px;
      border-radius: 2px;
      transition: background-color .15s,box-shadow .15s;
    }`,
    '.tree-node-active > .node-content-wrapper { background: #beebff }',
    '.tree-node-active.tree-node-focused > .node-content-wrapper { background: #beebff }',
    '.tree-node-focused > .node-content-wrapper { background: #e7f4f9 }',
    '.node-content-wrapper:hover { background: #f7fbff }',
    '.tree-node-active > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover { box-shadow: inset 0 0 1px #999; }',
    '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
    '.tree-node-expanded > .toggle-children-wrapper > .toggle-children { transform: rotate(90deg) }',
    '.tree-node-collapsed > .toggle-children-wrapper > .toggle-children { transform: rotate(0); }',
    `.toggle-children-wrapper {
      padding: 5px 0 5px 1px;
    }`,
    `.toggle-children {
        background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzRkRFQjcxODUzNTExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzRkRFQjcwODUzNTExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk5NzA1OGEtZDI3OC00NDZkLWE4ODgtNGM4MGQ4YWI1NzNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRkZmQxMGMtY2NlNS0xMTc4LWE5OGQtY2NkZmM5ODk5YWYwIi8+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Z2x5cGhpY29uczwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5iogFwAAAGhJREFUeNpiYGBgKABigf///zOQg0EARH4A4gZyDIIZ8B/JoAJKDIDhB0CcQIkBRBtEyABkgxwoMQCGD6AbRKoBGAYxQgXIBRuZGKgAKPIC3QLxArnRSHZCIjspk52ZKMrOFBUoAAEGAKnq593MQAZtAAAAAElFTkSuQmCC\');
        height: 8px;
        width: 9px;
        background-size: contain;
        display: inline-block;
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
    }`,
    `.toggle-children-placeholder {
        display: inline-block;
        height: 10px;
        width: 10px;
        position: relative;
        top: 1px;
    }`
  ],
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
