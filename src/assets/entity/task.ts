import { TaskFolder } from './folder';
export class Task{
    public parentId:string;
    public id:string;
    public taskFolders?:TaskFolder[];
    public tasks?:Task[];
}