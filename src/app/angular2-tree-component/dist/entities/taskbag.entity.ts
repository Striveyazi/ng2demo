import {Task} from './task.entity';
export class TaskBag {
    pid: string;
    bag_id: string;
    name: string;
    pos: number;

    create_time?: number;
    update_time?: number;
    icon?:any;//?
    icon_color?:any//?
    children_manhour?:number;
    children_completedmanhour?:number;
    
    children?:Task[];
    children_ids?: string[];
    choosed?: boolean;
    watched?: boolean;
    hasTask?:boolean;
    is_dragging?:boolean;
    options?:any;
}