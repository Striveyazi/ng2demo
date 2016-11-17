import { Injectable } from '@angular/core';

@Injectable()
export class TreeService {
    getTaskBagIds(projectId: any) {
        return ["first", "second"]
    }
    /**include baginfo and taskids */
    getTaskBagInfos(taskbagId: any) {
        let data: any;
        if (taskbagId === "first") {
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
        if (taskbagId === "second") {
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
    /**
     * include taskinfo and the childrens's ids
     */
    getTaskInfos(taskId: any) {
        let data: any;
        if (taskId == "first") {
            data = [{
                subTitle: 'the root',
                task_id: '02066401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第一个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '7753b58059814134964c441f7d1244c3',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                expanded: true,
                hasChild: true,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                children: [
                    {
                        name: '这是任务1.1',
                        subTitle: 'a good child',
                        hasChildren: false
                    }, {

                        name: '这是任务1.2',
                        subTitle: 'a bad child',
                        hasChildren: false
                    }
                ],
            },
            {
                subTitle: 'the root2',
                task_id: '02066401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第二个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '7753b58059814134964c441f7d1244c3',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                expanded: true,
                hasChild: true,
                children: [
                    {
                        name: '这是任务1.1',
                        subTitle: 'a good child',
                        hasChildren: false
                    }, {

                        name: '这是任务1.2',
                        subTitle: 'a bad child',
                        hasChildren: false
                    }
                ],
            }
            ];
        }
        if (taskId == "second") {
            data = [{
                subTitle: 'the root',
                task_id: '02066401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第三个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '7753b58059814134964c441f7d1244c3',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                expanded: true,
                hasChild: true,
                members: [],
                watchers: [],
                create_date: 3123132131,
                update_date: 2132322323,
                children: [
                    {
                        name: '这是任务1.1',
                        subTitle: 'a good child',
                        hasChildren: false
                    }, {

                        name: '这是任务1.2',
                        subTitle: 'a bad child',
                        hasChildren: false
                    }
                ],
            },
            {
                subTitle: 'the root2',
                task_id: '02066401e55941e986b4384a5c69cc65',
                name: '这是第一个任务包下面的第四个任务',
                bag_id: '2f5fd2bec28c4db78311f12ae213954f',
                parent_id: '7753b58059814134964c441f7d1244c3',
                children_ids: ['e5d7cd6fa0894630a2fbf8b43a0cb0c7', '4d7da2aaf8154fc7a7c932b0a397b5d8'],
                pos: 2313.35,
                expanded: true,
                hasChild: true,
                children: [
                    {
                        name: '这是任务1.1',
                        subTitle: 'a good child',
                        hasChildren: false
                    }, {

                        name: '这是任务1.2',
                        subTitle: 'a bad child',
                        hasChildren: false
                    }
                ],
            }
            ];
        }
        return data;
    }
}