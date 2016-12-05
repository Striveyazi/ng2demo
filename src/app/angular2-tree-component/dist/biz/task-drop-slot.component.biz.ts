import { PosCalculationRule } from './task-pos-calculation-rule.biz';
import { Injectable } from '@angular/core';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
@Injectable()
export class TaskDropSlotBiz {
    moveTask(sourceComponent: any, targetComponent: any, service: TreeService,posCalculationRule:PosCalculationRule) {
        let sourceTask:Task = sourceComponent.task;
        let targetTask:Task = targetComponent.task;
        let child = targetComponent.child;
        if ((<any>(sourceTask.parent)).parent){ // sourceTask'parent is task
            if (sourceTask.parent.children.length === 0
                && sourceTask.parent.children_ids.length === 0) {
                (<Task>sourceTask.parent).hasChild = false;
            }
        }
        let f_manHour = sourceTask.manhour + sourceTask.children_manhour;
        let f_cManHour = sourceTask.completedmanhour + sourceTask.children_completedmanhour;
        let sub_obj = { children_manHour: f_manHour, children_completeManHour: f_cManHour,this_component:sourceComponent }
        sourceComponent._sub.emit(sub_obj);
         //sort formTask's parent's children order
        sourceTask.parent.children.sort((a, b) => (a.pos - b.pos));
        
        //change sourceTask's pos
        //according to this [parent component’s] assignment is a 'task.parent'
       

        if (child) { // it's between task and task or between task and this task's frist_child
            if (child === targetTask) { // between task and this task's frist_child
                let first_task = targetTask.children.sort((a, b) => a.pos - b.pos).slice(0, 1)[0];
                if (first_task) {
                    //sourceTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
                    sourceTask.pos = posCalculationRule.Third_Rule(0,first_task.pos);
                }
                else {
                    //sourceTask.pos = 65535;
                    sourceTask.pos = posCalculationRule.First_Rule();
                }
            }
            else {//it's task and task
                let target_pos1 = child.pos
                let next_task = targetTask.children.find(t => t.pos > target_pos1);
                if (next_task) {
                    let target_pos2: number;
                    target_pos2 = next_task.pos;
                    //sourceTask.pos = (target_pos1 + target_pos2) / 2 + Math.random() * (target_pos2 - target_pos1) * 0.01;
                    sourceTask.pos = posCalculationRule.Third_Rule(target_pos1,target_pos2);
                }
                else { //lasted
                    // sourceTask.pos = child.pos + 65535;
                    sourceTask.pos = posCalculationRule.Second_Rule(child.pos);
                }

            }
        }
        else { //it's taskbag and  this taskbag'first_task

            let first_task = targetTask.children.sort((a, b) => a.pos - b.pos).slice(0, 1)[0];
            if (first_task) {
                // sourceTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
                sourceTask.pos = posCalculationRule.Third_Rule(0,first_task.pos);
            }
            else {
                // sourceTask.pos = 65535;
                sourceTask.pos = posCalculationRule.First_Rule();
            }
        }
        if (!(<any>targetTask).parent) { // targetTask is taskbag 
            sourceTask.is_root = true;
            //according to this [parent component’s] assignment is a 'task.parent'
        }
        else { //targetTask is task 
            if (targetTask.children.length === 0
                && targetTask.children_ids.length === 0) {
                targetTask.hasChild = false;
            }
            //set properties;
            sourceTask.is_root = false;
            //according to this [parent component’s assignment] is a 'task.parent'
            if (!targetTask.hasChild || !targetTask.is_expanded) {
                targetTask.hasChild = true;
                targetTask.is_expanded = true;
            }
        }
        
        sourceComponent.this_parent = targetComponent;// add set

        sourceTask.parent = targetTask;
        sourceTask.bag_id = targetTask.bag_id;
        targetTask.children_ids.push(sourceTask.tid);
        targetTask.children.push(sourceTask);

        let sum_obj = { children_manHour: f_manHour, children_completeManHour: f_cManHour,this_component:targetComponent }
        targetComponent._sum.emit(sum_obj);
        targetTask.children.sort((a, b) => (a.pos - b.pos));
    }
}