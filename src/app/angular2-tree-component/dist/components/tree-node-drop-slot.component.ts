import { PosCalculationRule } from '../biz/task-pos-calculation-rule.biz';
import { TaskDropSlotBiz } from '../biz/task-drop-slot.component.biz';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { TreeContainer } from '../models/tree-container.model';
import { Component, Input,Output, OnChanges, ViewEncapsulation,EventEmitter, } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
@Component({
    selector: 'TreeNodeDropSlot',
    encapsulation: ViewEncapsulation.None,
    styles: [
        '.node-drop-slot { display: block; height: 2px; width: 100%}',
        '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
    ],
    providers:[],
    template: `
    <div
      class="node-drop-slot"
      [class.is-dragging-over]="isDraggingOver(this)"
      (drop)="onDrop($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      >
    </div>
  `
})
export class TreeNodeDropSlot {
    @Input() task: Task;
    @Input() child: Task;
    @Input() _dropLocation: any;
    @Input() this_parent: any;
    @Output()
    _sum = new EventEmitter<{ children_manHour: number, children_completeManHour: number }>();

    constructor(public treeService: TreeService,private treeContainer:TreeContainer, private biz:TaskDropSlotBiz,private posCalculationRule:PosCalculationRule) { }
    onDragOver($event) {
        $event.preventDefault();
        this.setDropLocation(this);
    }

    onDragLeave() {
        if (this.isDraggingOver(this)) {
            this.setDropLocation(null);
        }
    }
    onDrop($event) {
        $event.preventDefault();
        let dragTask:any = this.treeContainer._dragTaskComponent.task;
        let source_task = dragTask.parent.children.find((t) => t.tid === dragTask.tid);
        let index = dragTask.parent.children.indexOf(source_task);
        dragTask.parent.children.splice(index, 1)[0];

        this.biz.moveTask(this.treeContainer._dragTaskComponent,this,this.treeService,this.posCalculationRule);
        //this formTask is a root Task, and it's parent is TaskBag( a virtual Task),

        //todo:judge is task or taskbag ?

        this.setDropLocation(null);
        dragTask.is_hidden = false;//show the hidden  drag task
    }
    setDropLocation(component: any) {
        this._dropLocation = component;
    }
    isDraggingOver(component: any) {
        return this._dropLocation === component;
    }
    /**
     *  @param
     */
    counter(children_manHour: number, children_completeManHour: number, task: Task) {
        //it's a slot needn't excute add, only bobble it's parent and excute add
        let parent : any;
        if(this.task === this.child){ //  drag to => between task and this task's frist_child
           parent = task;
        }
        else{
            parent = task.parent;
        }
        this.this_parent.counter(children_manHour, children_completeManHour, parent);

    }
}
