import { Tree } from '@angular/router/src/utils/tree';
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
    styles: [
        `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
    ],
    templateUrl: 'tree.component.html'
})
export class MyTreeComponent {
    // @Input()
    nodes: any[];
    secondNodes: any[];
    trees: any[];
    constructor() {
        this.trees = [{
                nodes:[{
                    expanded: true,
                    name: '这是第一个任务包',
                    subTitle: 'the root',
                    id: 123131,
                    children: [
                        {
                            name: '这是任务1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }],
                options: this.customTemplateStringOptions
            }]
        setTimeout(() => {
            this.nodes = [
                {
                    expanded: true,
                    name: '这是第一个任务包',
                    subTitle: 'the root',
                    id: 123131,
                    children: [
                        {
                            name: '这是任务1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    expanded: true,
                    name: '这是第三个任务包',
                    subTitle: 'the root',
                    children: [
                        {
                            name: '这是任务1.1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: '这是任务2.1',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
            ];
            
            this.secondNodes = [
                {
                    expanded: true,
                    name: '这是第二个任务包',
                    subTitle: 'the root',
                    children: [
                        {
                            name: 'first task',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {

                            name: 'second task',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }]
        }, 0, );

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