import { Component, OnInit, Input } from '@angular/core';
import { IActionMapping, TREE_ACTIONS, KEYS, TreeNode } from 'app/angular2-tree-component/dist/angular2-tree-component';

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
            // this.trees = [{
            //     nodes: this.nodes,
            //     options: this.customTemplateStringOptions
            // },{
            //     nodes:secondnodes,
            //     options: this.customTemplateStringOptions
            // }]
            this.trees =[];
            for(let i=0;i<10;i++){
                let childId_1 = (Math.floor(Math.random() * 10000000000000)).toString();
                let obj = {
                pid: "first",
                bag_id: childId_1,
                name: childId_1,
                pos: 100+i,
                children:[],
                children_ids:[],
                children_manhour:0,
                children_completedmanhour:0,
            }
            this.trees.push(obj);
            }
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