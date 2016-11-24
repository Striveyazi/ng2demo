import { TaskBag } from '../entities/taskbag.entity';
import { Injectable } from '@angular/core';
import { IActionMapping, TREE_ACTIONS, KEYS, TreeNode } from 'app/angular2-tree-component';
import { Task } from '../entities/task.entity';
// import {TaskBag} from '../entities/taskbag.entity';
import { Subject } from 'rxjs/Subject';
import { TreeContainer } from '../models/tree-container.model'
@Injectable()
export class TreeService {
    public treeContainer = new Subject<TreeContainer>();
    getTreeContainer() {

    }
    setgetTreeContainer(treeContainer: TreeContainer) {

    }
    getTaskBagIds(projectId: any) {
        return ["first", "second"]
    }
    /**include baginfo and taskids */
    getTaskBagInfos(projectId: any) {
        let data: any[];
        if (projectId === "first") {
            data = [{
                bag_id: "dadas",
                name: 'first task bag',
                pos: 262141,
                create_date: 1464575649016,
                update_date: 1464575649016,
                choosed: false,
                watched: false,
                firstlevel_task_ids: []
            },
            {
                bag_id: "dadas",
                name: 'second task bag',
                pos: 262141,
                create_date: 1464575649016,
                update_date: 1464575649016,
                choosed: false,
                watched: false,
                firstlevel_task_ids: []
            },
            ]
        }
        if (projectId === "second") {
            data = [{
                bag_id: "dadas",
                name: 'third task bag',
                pos: 262141,
                create_date: 1464575649016,
                update_date: 1464575649016,
                choosed: false,
                watched: false,
                firstlevel_task_ids: []
            },
            {
                bag_id: "dadas",
                name: 'fourth task bag',
                pos: 262141,
                create_date: 1464575649016,
                update_date: 1464575649016,
                choosed: false,
                watched: false,
                firstlevel_task_ids: []
            },
            ]
        }

    }
    asyncChildren = [
        {
            name: 'child2.1',
            subTitle: 'new and improved'
        }, {
            name: 'child2.2',
            subTitle: 'new and improved2'
        }
    ];
    getChildren(node: any) {
        console.log("tree node enter-1");
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.asyncChildren.map((c) => {
                return Object.assign({}, c, {
                    hasChildren: node.level < 5
                });
            })), 1000);
        });
    }
    /**
     * get options about taskbagId
     */
    getTaskBagOptions(taskbagId: any) {
        if (taskbagId === "first" || taskbagId === "second") {
            const actionMapping: IActionMapping = {
                mouse: {
                    contextMenu: (tree, node, $event) => {
                        $event.preventDefault();
                        alert(`context menu for ${node.data.name}`);
                    },
                    dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
                    click: (tree, node, $event) => {
                        $event.shiftKey
                            ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
                            : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
                    }
                },
                keys: {
                    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
                }
            }

            let customTemplateStringOptions = {
                // displayField: 'subTitle',
                isExpandedField: 'expanded',
                idField: 'uuid',
                getChildren: this.getChildren.bind(this),
                actionMapping,
                allowDrag: true
            }
            return customTemplateStringOptions;
        }
        return null;
    }
    /**
     * get taskbag's taskids
     */
    getTaskIds(taskbagId: any) {
        let data = [];
        if (taskbagId === "first" || taskbagId === "second") {
            data = ["first_task_id", "second_task_id"];
        }
        return data;
    }
    /**
     * include taskinfo and the childrens's ids
     */
    getTaskInfos(taskId: any): Task {
        let data: Task;
        //should be return a object ,not a array
        if (taskId === "first_task_id") {
            data = {
                pid: '',
                tid: 'a',
                name: '这是第1个任务包下面的第1个任务',
                bag_id: 'first_task_id',
                children_ids: ['a1', 'a2'],
                children: [],
                parent: new TaskBag(),
                pos: 27413.35,
                is_expanded: true,
                // is_collapsed:false,
                hasChild: true,
                members: [],
                watchers: [],
                is_root: true,
                allow_drag: true
                // badges:{expire_date:232131,comment_count:4,file_count:2,completed_count:3,total_count:5}
            }
        }
        if (taskId === "second_task_id") {
            data = {
                pid: '',
                tid: 'b',
                name: '这是第2个任务包下面的第1个任务',
                bag_id: 'second_task_id',
                children_ids: ['b1', 'b2'],
                children: [],
                parent: new TaskBag(),
                pos: 254.35,
                is_expanded: false,
                // is_collapsed:false,
                hasChild: true,
                members: [],
                watchers: [],
                is_root: true,
                allow_drag: true
                // badges:{expire_date:232131,comment_count:4,file_count:2,completed_count:3,total_count:5}
            };
        }
        if (taskId === "a1") {
            data = {
                pid: '',
                tid: 'a1',
                name: '这是第1个任务包下面第一个任务的第一个子任务',
                children_ids: [],
                children: [],
                parent: new TaskBag(),
                bag_id: 'first_task_id',
                pos: 2383.35,
                is_expanded: false,
                // is_collapsed:false,
                hasChild: false,
                members: [],
                watchers: [],
                is_root: false,
                allow_drag: true
                // badges:{expire_date:232131,comment_count:4,file_count:2,completed_count:3,total_count:5}
            };
        }
        if (taskId === "a2") {
            data = {
                pid: '',
                tid: 'a2',
                name: '这是第1个任务包下面第一个任务的第2个子任务',
                bag_id: 'first_task_id',
                children_ids: [],
                children: [],
                parent: new TaskBag(),
                pos: 2313.35,
                is_expanded: false,
                hasChild: false,
                members: [],
                watchers: [],
                is_root: false,
                allow_drag: true
            };
        }
        if (taskId === "b1") {
            data = {
                pid: '',
                tid: 'b1',
                name: '这是第2个任务包下面第一个任务的第1个子任务',
                bag_id: 'second_task_id',
                children_ids: [],
                children: [],
                parent: new TaskBag(),
                pos: 2313.35,
                is_expanded: false,
                hasChild: false,
                members: [],
                watchers: [],
                is_root: false,
                allow_drag: true
                // badges:{expire_date:232131,comment_count:4,file_count:2,completed_count:3,total_count:5}
            };
        }

        if (taskId === "b2") {
            data = {
                pid: '',
                tid: 'b2',
                name: '这是第2个任务包下面第一个任务的第2个子任务',
                bag_id: 'second_task_id',
                children_ids: [],
                children: [],
                parent: new TaskBag(),
                pos: 2313.35,
                is_expanded: false,
                hasChild: false,
                members: [],
                watchers: [],
                is_root: false,
                allow_drag: true
            };
        }
        return data;
    }

    //set function
    setTaskInfos(task: Task): boolean {

        return true;
    }

    createMock_Task_Child_Tasks(ptask:Task){
            let name = (Math.floor(Math.random() * 10000000000000)).toString();
            let task:Task= {
            pid:'',
            bag_id:ptask.bag_id,
            tid:name,
            name:name,
            allow_drag:true,
            parent:new Task(),
            children:[],
            children_ids:[],
            }
            ptask.children.push(task);
        
    }

    createMock_Bags_Child_Tasks(taskbag:TaskBag) {
            // for(let i=0;i<2;i++){
            let name = (Math.floor(Math.random() * 10000000000000)).toString();
            let childId_1 = (Math.floor(Math.random() * 10000000000000)).toString();
            let childId_2 = (Math.floor(Math.random() * 10000000000000)).toString();
            let task:Task= {
            pid:'',
            bag_id:taskbag.bag_id,
            tid:name,
            name:name,
            parent:new Task(),
            is_expanded:true,
            hasChild:true,
            allow_drag:true,
            children:[],
            children_ids:[childId_1,childId_2],
            }
            taskbag.children.push(task);
            // }
            
        
        
    }

    createMock_Task_Children_ids(ptask: Task) {
        for (let i = 0; i < 5; i++) {
            let childId_1 = (Math.floor(Math.random() * 10000000000000)).toString();
            ptask.children_ids.push(childId_1);
        }
    }
    createMock_TaskBag_Children_ids(taskbag: TaskBag) {
        // let name = (Math.floor(Math.random() * 10000000000000)).toString();
        // let childId_1 = (Math.floor(Math.random() * 10000000000000)).toString();
        // //let childId_2 = (Math.floor(Math.random() * 10000000000000)).toString();

        for (let i = 0; i < 20; i++) {
            let childId_1 = (Math.floor(Math.random() * 10000000000000)).toString();
            taskbag.children_ids.push(childId_1);
        }
    }
}