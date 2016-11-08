import { Task } from './task';
import { TaskFolder } from './folder';
export class TaskBag{
    public readonly id:string;
    public taskFolders?:TaskFolder[];
    public tasks?:Task[];
}