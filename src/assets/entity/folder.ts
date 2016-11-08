import { Task } from './task';
export class TaskFolder{
    public parentId:string;
    public id:string;
    public taskFolders?:TaskFolder[];
    public tasks?:Task[];
}