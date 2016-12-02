import { TaskBag } from './taskbag.entity';
export class Task{
    pid:string;
    bag_id:string;
    tid:string;
    parent?:Task|TaskBag;
    name?:string;
    desc?:string;
    pos?:number;
    
    owner?:string;
    completed?: boolean;
    archived?: boolean;
    is_deleted?: boolean;
    completed_time?: number;
    create_time?:number;
    update_time?:number;

    file_ids?:any[];
    abstract?: {
        prioritylevel?: string, //优先级
        commentcount?: number,
        duedate?: number,
        attachmentcount?:number
    };
    voices?: any[];
    labels?:any[];
    editortype?:string;

    members?:any[];
    watchers?:any[];
    manhour?: number;
    children_manhour?:number;
    completedmanhour?:number;
    children_completedmanhour?:number;
    spenttime?:number;

    icon?:any;
    icon_color?:any; //folder

    
    children?:Task[];
    children_ids?:string[];
    hasChild?:boolean;
    is_expanded?:boolean;
    is_root?:boolean;
    is_folder?:boolean;
    is_hidden?:boolean;
    is_active?:boolean;
    is_focused?:boolean;
    allow_drag?:boolean;
    taskbag?:TaskBag;
    options?:any;
    level?:number;
    type?:any;
}