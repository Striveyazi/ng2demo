import { Injectable } from '@angular/core';
import { Task } from '../entities/task.entity';
import { TreeService } from '../services/tree.service';
@Injectable()
export class TaskBiz {
    expand(task: Task, service: TreeService) {
        if (task.is_expanded) {
            task.children = [];
        }
        else {
            //let children: Task[] = [];  //initialization
            //  get data use service
            for (let childId of task.children_ids) {
                let child = service.getTaskInfos(childId);
                //todo :if child is undefined or null ,should to handle 
                if (!child) {
                    continue;
                }
                child.parent = task;
                //children.push(child);
                task.children.push(child)
            }
            // set data use viewModel
            //this.task.setChildren(children);
        }

        task.is_expanded = !task.is_expanded;
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

        //todo:judge fromTask is  taskbag or task 
        if (!(<any>(fromTask.parent)).parent) { //it's taskbag

        }
        else { // it's task
            //  toTask.data.children_ids.find(t=>t===fromTask.data.task_id);
            if (fromTask.parent.children.length === 0 && fromTask.parent.children_ids.length === 0) {
                (<Task>fromTask.parent).hasChild = false;
            }
        }
        fromTask.parent.children.sort((a, b) => (a.pos - b.pos));
        //set properties;
        let first_task = toTask.children.sort((a, b) => a.pos - b.pos).slice(0, 1)[0];
        let first_pos: number;
        if (first_task) {
            fromTask.pos = first_task.pos / 2 + Math.random() * first_task.pos * 0.01;
        }
        else {
            fromTask.pos = 65535;
        }

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

        toTask.children.sort((a, b) => (a.pos - b.pos));
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
}