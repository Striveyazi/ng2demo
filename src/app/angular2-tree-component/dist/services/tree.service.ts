import { Injectable } from '@angular/core';
import { IActionMapping, TREE_ACTIONS, KEYS, TreeNode } from 'app/angular2-tree-component';
import {Task} from '../entities/task.entity';
import {TaskBag} from '../entities/taskbag.entity';
@Injectable()
export class TreeService {
    getTaskBagIds(projectId: any) {
        return ["first", "second"]
    }
    /**include baginfo and taskids */
    getTaskBagInfos(projectId: any) {
        let data: TaskBag[];
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
        if (taskbagId === "first") {
            data = ["first_task_id", "second_task_id"];
        }
        return data;
    }
    /**
     * include taskinfo and the childrens's ids
     */
    getTaskInfos(taskId: any):Task {
        let data: Task;
        //should be return a object ,not a array
        if (taskId === "first_task_id") {
            data = {
                task_id: '02066401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第一个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: 'first_task_id',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                is_expanded: true,
                // is_collapsed:false,
                hasChild: true,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                is_root:true
            }
        }
        if (taskId === "second_task_id") {
            data = {
                task_id: '02066401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第三个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: 'second_task_id',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                is_expanded: false,
                // is_collapsed:false,
                hasChild: true,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                is_root:true
            };
        }
        if(taskId ==="02066401e55941e986b4384a5c69cc65"){
            data = {
                task_id: 'dsas6401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第三个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '02066401e55941e986b4384a5c69cc65',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                is_expanded: false,
                // is_collapsed:false,
                hasChild: true,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                is_root:true
            };
        }
        if (taskId === "e5d7cd6fa0894630a2fbf8b43a0cb0c7") {
            data = {
                task_id: 'sassda401e55941e986b4384a5c69cc65',
                name: '这是一个子任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '7753b58059814134964c441f7d1244c3',
                children_ids:[],
                pos: 2313.35,
                is_expanded: false,
                hasChild: false,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                is_root:false
            };
        }
        if(taskId === "4d7da2aaf8154fc7a7c932b0a397b5d8"){
            data = {
                task_id: 'das66401e55941e986b4384a5c69cc65',
                name: '这是一个子任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '02066401e55941e986b4384a5c69cc65',
                children_ids:[],
                pos: 2313.35,
                is_expanded: false,
                hasChild: false,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                is_root:false
            };
        }
        
        if(taskId === "das66401e55941e986b4384a5c69cc65"){
            data = {
                task_id: '5sdd401e55941e986b4384a5c69cc65',
                name: '这是一个子任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: 'das66401e55941e986b4384a5c69cc65',
                children_ids:[],
                pos: 2313.35,
                is_expanded: false,
                hasChild: false,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                is_root:false
            };
        }
        return data;
    }

}