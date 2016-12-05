import { PosCalculationRule } from './task-pos-calculation-rule.biz';
import { Injectable } from '@angular/core';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
import { EventEmitter, } from '@angular/core';
@Injectable()
export class TaskBiz {
    constructor(){}
    expand(task: Task, service: TreeService) {
        if (task.is_expanded) {
            task.children = [];
        }
        else {
            //let children: Task[] = [];  //initialization
            //  get data use service
            let pos=65535;
            for (let childId of task.children_ids) {
            
                let child = service.createMock_Task_Child_Tasks(task,childId,pos);
                //todo :if child is undefined or null ,should to handle 
                if (!child) {
                    continue;
                }
                pos*=2;
                // child.parent = task;
                // //children.push(child);
                // task.children.push(child)
            }
            // set data use viewModel
            //this.task.setChildren(children);
        }

        task.is_expanded = !task.is_expanded;
        //todo :  this expeanded's status should  save cache
    }

    /**
    * Description:taskbag can't move to another taskbag or a task,so this targetTask must be a Task.
    * @param sourceTask is dargTask
    * @param targetTask is dropTask
    *   */
    canMoveTask(sourceTask: Task, targetTask: Task, service: TreeService) {
        //jugde to self
        if (sourceTask.parent === targetTask.parent && sourceTask.tid == targetTask.tid) {
            return false;
        }
        //jugde to children
        if (sourceTask.hasChild) {
            return this.judgeIdInIds(sourceTask, targetTask, service)
        }
        return true;
    }
    judgeIdInIds(sourceTask: Task, targetTask: Task, service: TreeService) {
        if (sourceTask.hasChild) {
            if (sourceTask.children_ids.find((t) => t === targetTask.tid)) {
                return false;
            }
        }
        else {
            for (let childTaskId of sourceTask.children_ids) {
                let childTask = service.getTaskInfos(childTaskId);
                this.judgeIdInIds(childTask, targetTask, service);
            }
        }
        return true;
    }
    moveTask(sourceComponent: any, targetComponent: any ,service: TreeService, posCalculationRule: PosCalculationRule,
    ) {
        // don't drag to self and parent can't drag to child
        // if (!this.canMoveTask(sourceTask, targetTask, service)) {
        //     return;
        // }
        let sourceTask:Task = sourceComponent.task;
        let targetTask:Task = targetComponent.task;
        let source_node = sourceTask.parent.children.find((t) => t.tid === sourceTask.tid);
        let index = sourceTask.parent.children.indexOf(source_node);
        sourceTask.parent.children.splice(index, 1)[0];

        //todo:judge sourceTask is  taskbag or task 
        if (!(<any>(sourceTask.parent)).parent) { //it's taskbag

        }
        else { // it's task
            //  targetTask.data.children_ids.find(t=>t===sourceTask.data.task_id);
            if (sourceTask.parent.children.length === 0 && sourceTask.parent.children_ids.length === 0) {
                (<Task>sourceTask.parent).hasChild = false;
            }
        }

        let f_manHour = sourceTask.manhour + sourceTask.children_manhour;
        let f_cManHour = sourceTask.completedmanhour + sourceTask.children_completedmanhour;
       

        let sub_obj = { children_manHour: f_manHour, children_completeManHour: f_cManHour,this_component:sourceComponent }
        sourceComponent._sub.emit(sub_obj);
        sourceTask.parent.children.sort((a, b) => (a.pos - b.pos));
        //set properties;
        let first_task = targetTask.children.sort((a, b) => a.pos - b.pos).slice(0, 1)[0];
        let first_pos: number;
        if (first_task) {
            // sourceTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
            sourceTask.pos = posCalculationRule.Third_Rule(0, first_task.pos);
        }
        else {
            // sourceTask.pos = 65535;
            sourceTask.pos = posCalculationRule.First_Rule();
        }

        sourceComponent.this_parent = targetComponent //add set
        
        sourceTask.parent = targetTask;
        sourceTask.is_root = false;
        sourceTask.bag_id = targetTask.bag_id;

        if (!targetTask.hasChild || !targetTask.is_expanded) {
            targetTask.hasChild = true;
            targetTask.is_expanded = true;
        }
        targetTask.children_ids.push(sourceTask.tid);
        //todo: use service move the ceche's data
        targetTask.children.push(sourceTask); //trigger the ngOnChanges

        let sum_obj = { children_manHour: f_manHour, children_completeManHour: f_cManHour,this_component:targetComponent }
        targetComponent._sum.emit(sum_obj);
        targetTask.children.sort((a, b) => (a.pos - b.pos));
    }
    ngOnChanges(changes, task: Task, service: TreeService) {
        if (changes.task && changes.task.currentValue.hasChild) {
            if (changes.task.currentValue.is_expanded) {
                //  get data use service
                let pos = 100;
                for (let childId of changes.task.currentValue.children_ids) {
                    service.createMock_Task_Child_Tasks(task, childId, pos);
                    //todo :if child is undefined or null ,should to handle 
                    pos++;
                }

                task.children.sort((a, b) => a.pos - b.pos);
                //todo: set this task's postion & remove this task from old parent
            }
            else {
                task.children = [];
            }

        }
    }
    counter(children_manHour: number, children_completeManHour: number, task: any, this_parent: any) {
        task.children_manhour += children_manHour;
        task.children_completedmanhour += children_completeManHour;
        this_parent.counter(task.children_manhour, task.children_completedmanhour, task.parent);
    }
}