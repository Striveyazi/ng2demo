export class Task{
    task_id:string;
    name:string;
    bag_id:string;
    parent_id:string;
    children_ids:string[];
    pos:number;
    is_expanded:boolean;
    hasChild:boolean;
    members:any[];
    watchers:any[];
    create_date:any;
    update_date:any;
    is_root:boolean;
}