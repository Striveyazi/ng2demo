import { PosCalculationRule } from './task-pos-calculation-rule.biz';
import { Injectable } from '@angular/core';
import { Task } from '../entities/task.entity';
@Injectable()
export class TaskBagBiz {
    moveUp(focusedTask: Task) {
        let target_pos = focusedTask.pos;
        let index = focusedTask.parent.children.findIndex(t => t.tid === focusedTask.tid);
        let previous_task = focusedTask.parent.children.slice(index - 1, index)[0];
        if (previous_task) {
            let temp = target_pos;
            focusedTask.pos = previous_task.pos;
            previous_task.pos = temp;
            focusedTask.parent.children.sort((a, b) => a.pos - b.pos);
        }
    }
    moveDown(focusedTask: Task) {
        let target_pos = focusedTask.pos;
        let next_task = focusedTask.parent.children.find(t => t.pos > target_pos);
        if (next_task) {
            let temp = target_pos;
            focusedTask.pos = next_task.pos;
            next_task.pos = temp;
            focusedTask.parent.children.sort((a, b) => a.pos - b.pos);
        }
    }
    moveLeft(focusedTask: Task,posCalculation:PosCalculationRule) {
        if (!focusedTask) {
            return;
        }
        let focused_parent = <any>focusedTask.parent;
        if (focused_parent.parent) { //focusedTask's parent  is  task ,can left_move.otherwise,this parent is taskbag,can't left_move
            let focused_parent_parent = <Task>focused_parent.parent;
            let target_pos = focused_parent.pos;
            let focused_parent_next = focused_parent_parent.children.find(t => t.pos > target_pos);
            if (focused_parent_next) {
                // let sum = focused_parent_next.pos + target_pos;
                // let sub = focused_parent_next.pos - target_pos;
                //focusedTask.pos = sum / 2 + Math.random() * sub * 0.01;
                focusedTask.pos = posCalculation.Third_Rule(focused_parent_next.pos,target_pos);
                focusedTask.is_root = focused_parent_next.is_root;
            }
            else { // the focusedTask's parent is last task,
                focusedTask.pos = focused_parent.pos + 65535;
                focusedTask.is_root = focused_parent.is_root;
            }

            let focused_index = focusedTask.parent.children.findIndex(t => t.tid === focusedTask.tid);
            let focused_id_index = focusedTask.parent.children_ids.findIndex(t => t === focusedTask.tid);

            focusedTask.parent.children_ids.splice(focused_id_index, 1);
            focusedTask.parent.children.splice(focused_index, 1);
            focusedTask.parent.children.sort((a, b) => a.pos - b.pos);

            focusedTask.parent = focused_parent_parent;
            focused_parent_parent.children_ids.push(focusedTask.tid);
            focused_parent_parent.children.push(focusedTask);
            focused_parent_parent.children.sort((a, b) => a.pos - b.pos);
        }
    }
    moveRight(focusedTask: Task,posCalculation:PosCalculationRule) {
        if (!focusedTask) {
            return;
        }
        let target_pos = focusedTask.pos;
        let index = focusedTask.parent.children.findIndex(t => t.tid === focusedTask.tid);
        let focused_previous_task = focusedTask.parent.children.slice(index - 1, index)[0];
        if (focused_previous_task) {
            let previous_frist_child = focused_previous_task.children.slice(0, 1)[0];
            let focused_index = focusedTask.parent.children.findIndex(t => t.tid === focusedTask.tid);
            let focused_id_index = focusedTask.parent.children_ids.findIndex(t => t === focusedTask.tid);
            focusedTask.parent.children_ids.splice(focused_id_index, 1);
            focusedTask.parent.children.splice(focused_index, 1);
            focusedTask.parent.children.sort((a, b) => a.pos - b.pos);
            if (previous_frist_child) {
                // focusedTask.pos = previous_frist_child.pos / 2 + Math.random() * previous_frist_child.pos * 0.01;
                focusedTask.pos = posCalculation.Third_Rule(0,previous_frist_child.pos);
            }
            else {
                focused_previous_task.is_expanded = true
                // focusedTask.pos = 65535;
                focusedTask.pos = posCalculation.First_Rule();
            }
            focusedTask.parent = focused_previous_task;
            focused_previous_task.children_ids.push(focusedTask.tid);
            focused_previous_task.children.push(focusedTask);
            focused_previous_task.children.sort((a, b) => a.pos - b.pos);
        }
    }
    moveTop(focusedTask: Task,posCalculation:PosCalculationRule) {
        if (!focusedTask) {
            return;
        }
        let target_pos = focusedTask.pos;
        let first_task = focusedTask.parent.children.find(t => t.pos < target_pos);
        if (first_task) {
            // focusedTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
            focusedTask.pos = posCalculation.Third_Rule(0,first_task.pos);
            focusedTask.parent.children.sort((a, b) => a.pos - b.pos);
        }
    }
    moveBottom(focusedTask: Task,posCalculation:PosCalculationRule) {
        if (!focusedTask) {
            return;
        }
        let target_pos = focusedTask.pos;
        let length = focusedTask.parent.children.length;
        let last_task = focusedTask.parent.children.slice(length - 1, length)[0];
        if (last_task) {
            // focusedTask.pos = last_task.pos + 65535;
            focusedTask.pos = posCalculation.Second_Rule(last_task.pos);
            focusedTask.parent.children.sort((a, b) => a.pos - b.pos);
        }
    }
}