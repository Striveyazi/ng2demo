import { PosCalculationRule } from './task-pos-calculation-rule.biz';
import { Injectable } from '@angular/core';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
@Injectable()
export class TaskDropSlotBiz {
    moveTask(fromTask: Task, toTask: Task, child: Task, service: TreeService,posCalculationRule:PosCalculationRule) {
        if ((<any>(fromTask.parent)).parent){ // fromTask'parent is task
            if (fromTask.parent.children.length === 0
                && fromTask.parent.children_ids.length === 0) {
                (<Task>fromTask.parent).hasChild = false;
            }
        }
         //sort formTask's parent's children order
        fromTask.parent.children.sort((a, b) => (a.pos - b.pos));
        
        //change fromTask's pos
        //according to this [parent component’s] assignment is a 'task.parent'
       

        if (child) { // it's task and task or task and this task's frist_child
            if (child === toTask) { // task and this task's frist_child
                let first_task = toTask.children.sort((a, b) => a.pos - b.pos).slice(0, 1)[0];
                if (first_task) {
                    //fromTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
                    fromTask.pos = posCalculationRule.Third_Rule(0,first_task.pos);
                }
                else {
                    //fromTask.pos = 65535;
                    fromTask.pos = posCalculationRule.First_Rule();
                }
            }
            else {//it's task and task
                let target_pos1 = child.pos
                let next_task = toTask.children.find(t => t.pos > target_pos1);
                if (next_task) {
                    let target_pos2: number;
                    target_pos2 = next_task.pos;
                    //fromTask.pos = (target_pos1 + target_pos2) / 2 + Math.random() * (target_pos2 - target_pos1) * 0.01;
                    fromTask.pos = posCalculationRule.Third_Rule(target_pos1,target_pos2);
                }
                else { //lasted
                    // fromTask.pos = child.pos + 65535;
                    fromTask.pos = posCalculationRule.Second_Rule(child.pos);
                }

            }
        }
        else { //it's taskbag and  this taskbag'first_task

            let first_task = toTask.children.sort((a, b) => a.pos - b.pos).slice(0, 1)[0];
            if (first_task) {
                // fromTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
                fromTask.pos = posCalculationRule.Third_Rule(0,first_task.pos);
            }
            else {
                // fromTask.pos = 65535;
                fromTask.pos = posCalculationRule.First_Rule();
            }
        }
        if (!(<any>toTask).parent) { // toTask is taskbag 
            fromTask.is_root = true;
            //according to this [parent component’s] assignment is a 'task.parent'
        }
        else { //toTask is task 
            if (toTask.children.length === 0
                && toTask.children_ids.length === 0) {
                toTask.hasChild = false;
            }
            //set properties;
            fromTask.is_root = false;
            //according to this [parent component’s assignment] is a 'task.parent'
            if (!toTask.hasChild || !toTask.is_expanded) {
                toTask.hasChild = true;
                toTask.is_expanded = true;
            }
        }
        
        fromTask.parent = toTask;
        fromTask.bag_id = toTask.bag_id;
        toTask.children_ids.push(fromTask.tid);
        toTask.children.push(fromTask);
        toTask.children.sort((a, b) => (a.pos - b.pos));
    }
}