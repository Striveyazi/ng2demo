import { Component, OnInit, Input } from '@angular/core';
import { IActionMapping, TREE_ACTIONS, KEYS, TreeNode } from 'app/angular2-tree-component';

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

@Component({
    moduleId: module.id,
    selector: 'mytree',
    //  styleUrls:['../templates/res/css/task/tree.css'],
    templateUrl: 'tree.component.html'
})
export class MyTreeComponent {
    // @Input()
    nodes: any[];
    secondNodes: any[];
    trees: any[];
    constructor() {

        setTimeout(() => {
            this.nodes = [
                {
                    expanded: true,
                    name: '这是第一个任务包下面的第一个任务',
                    subTitle: 'the root',
                    id: 123131,
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
                    ]
                },
                {
                    expanded: true,
                    name: '这是第一个任务包下面的第二个任务',
                    subTitle: 'the root',
                    children: [
                        {
                            name: '这是任务2.1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务2.2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    expanded: true,
                    name: '这是第一个任务包下面的第三个任务',
                    subTitle: 'the root',
                    children: [
                        {
                            name: '这是任务3.1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务3.2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }
            ];
            let secondnodes = [
                {
                    expanded: true,
                    name: '这是第二个任务包下面的第一个任务',
                    subTitle: 'the root',
                    id: 123131,
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
                    ]
                },
                {
                    expanded: true,
                    name: '这是第二个任务包下面的第二个任务',
                    subTitle: 'the root',
                    children: [
                        {
                            name: '这是任务2.1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务2.2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    expanded: true,
                    name: '这是第二个任务包下面的第三个任务',
                    subTitle: 'the root',
                    children: [
                        {
                            name: '这是任务3.1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务3.2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }
            ]
            // this.trees = [{
            //     nodes: this.nodes,
            //     options: this.customTemplateStringOptions
            // },{
            //     nodes:secondnodes,
            //     options: this.customTemplateStringOptions
            // }]
            this.trees = [{
                pid: "first",
                bag_id: "1",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "2",
                bag_id: "second",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "3",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "4",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "5",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "6",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "7",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "8",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "9",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "10",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "11",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "12",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "13",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "14",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "15",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "16",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "17",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "18",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            },{
                pid: "first",
                bag_id: "19",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }, {
                pid: "first",
                bag_id: "20",
                name: "",
                pos: 0,
                children:[],
                children_ids:[]
            }];
        }, 0, () => {
            console.log("initial trees data");
        });

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
    addNode(tree: any) {
        this.nodes[0].children.push({

            name: 'a new child'
        });
        tree.treeModel.update();
    }
    childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }
    filterNodes(text: any, tree: any) {
        tree.treeModel.filterNodes(text, true);
    }
    activateSubSub(tree: any) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001)
            .setActiveAndVisible();
    }
    customTemplateStringOptions = {
        // displayField: 'subTitle',
        isExpandedField: 'expanded',
        idField: 'uuid',
        getChildren: this.getChildren.bind(this),
        actionMapping,
        allowDrag: true
    }
    onEvent = console.log;

    go($event: any) {
        $event.stopPropagation();
        alert('this method is on the app component')
    }
}