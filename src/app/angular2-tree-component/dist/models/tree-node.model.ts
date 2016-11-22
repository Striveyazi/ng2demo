import { Task } from '../entities/task.entity';
import { ElementRef } from '@angular/core';
import { TreeModel } from './tree.model';
import { TreeOptions } from './tree-options.model';
import { ITreeNode } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';
import { deprecated } from '../deprecated';
import { TreeService } from '../services/tree.service'
import * as _ from 'lodash';

export class TreeNode implements ITreeNode {
  get isHidden() { return this.getField('isHidden') };
  set isHidden(value) { this.setField('isHidden', value) };

  get isActive() { return this.treeModel.isActive(this) };
  get isFocused() { return this.treeModel.isNodeFocused(this) };

  get isExpanded() { return this.data.is_expanded };
  set isExpanded(value) { this.data.is_expanded = value };
  get isFolder() { return this.data.is_folder };
  get Badges() { return this.data.badges };
  get Labels() { return this.data.labels };
  level: number;
  path: string[];
  elementRef: ElementRef;
  children: TreeNode[] = [];

  expandedNodeIds: any[] = [];
  expandedNodes: TreeNode[] = [];
  // activeNodeIds: { [id:string]: boolean } = {};
  // activeNodes: TreeNode[];

  private _originalNode: any;
  get originalNode() { return this._originalNode };

  constructor(public data: Task, public parent: TreeNode, public treeModel: TreeModel) {

    //this.id = this.id || (data.task_id); // Make sure there's a unique id
    this.id = data.task_id;
    this.level = this.parent ? this.parent.level + 1 : 0;
    //this.path = this.parent ? [...this.parent.path, this.id] : [];

    if (this.getField('children')) {
      this._initChildren();
    }
  }
  //helper set functions:
  update() {
    this._calculateExpandedNodes(this);
  }
  setExpandedNode(node, value) {
    const index = _.indexOf(this.expandedNodes, node);

    if (value && !index) this.expandedNodes.push(node);
    else if (index) _.pullAt(this.expandedNodes, index);

    this.expandedNodeIds[node.id] = value;
  }
  setChildren(tasks: Task[]) {
    if (tasks && tasks.length > 0) {
      for (let task of tasks) {
        let child = new TreeNode(task, this, this.treeModel);
        this.children.push(child);
      }
    }
    else {
      this.children = null;
    }
  }
  _calculateExpandedNodes(startNode = null) {
    startNode = startNode || this;
    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodes.push(startNode);
      this.expandedNodeIds.push(startNode.data.task_id);
    }
    if (startNode.children) {
      startNode.children.forEach((child) => this._calculateExpandedNodes(child));
    }
  }

   /**
   * Description:taskbag can't move to another taskbag or a task,so this toTask must be a Task.
   * @param fromTask is dargTask
   * @param toTask is dropTask
   *   */
  canMoveTask(fromTask: TreeNode, toTask: TreeNode, service: TreeService) {
    console.log("canMoveTask");
    //jugde to self
    if (fromTask.parent === toTask.parent && fromTask.data.task_id == toTask.data.task_id) {
      return false;
    }
    //jugde to children
    if (fromTask.data.hasChild) {
      return this.judgeIdInIds(fromTask.data, toTask.data, service)
    }
    return true;
  }

  judgeIdInIds(fromTask: Task, toTask: Task, service: TreeService) {
    if (fromTask.hasChild) {
      if (fromTask.children_ids.find((t) => t === toTask.task_id)) {
        return false;
      }
    }
    else {
      for (let childTaskId of fromTask.children_ids) {
        let childTask = service.getTaskInfos(childTaskId);
        this.judgeIdInIds(childTask, toTask, service);
      }
    }
    return true;
  }

  moveTask(fromTask: TreeNode, toTask: TreeNode, service: TreeService) {
    // don't drag to self
    if (!this.canMoveTask(fromTask, toTask, service)) {
      return;
    }
    let from_node = fromTask.parent.children.find((t) => t.data.task_id === fromTask.data.task_id);
    let index = fromTask.parent.children.indexOf(from_node)
    let fromnode = fromTask.parent.children.splice(index, 1)[0];

    if ((<any>fromTask.parent.data).virtual) {
      
    }
    else{
       toTask.data.children_ids.find(t=>t===fromTask.data.task_id)
      if (fromTask.parent.children.length === 0 && fromTask.parent.data.children_ids.length === 0) {
        fromTask.parent.data.hasChild = false;
      }
    }

    //set properties;
    
    fromnode.parent = toTask;

    fromnode.data.parent_id = toTask.data.task_id;
    fromnode.data.is_root = false;
    fromnode.data.bag_id = toTask.data.bag_id;

    

    if (!toTask.hasChildren || !toTask.isExpanded) {
      toTask.data.hasChild = true;
      toTask.isExpanded = true;
    }
    toTask.data.children_ids.push(fromnode.data.task_id);
    //todo: use service move the ceche's data
    toTask.children.push(fromnode); //trigger the ngOnChanges
  }












  // helper get functions:
  get hasChildren(): boolean {
    return this.data.hasChild || (this.children && this.children.length > 0);
  }
  get isCollapsed(): boolean { return !this.isExpanded }
  get isLeaf(): boolean { return !this.hasChildren }
  get isRoot(): boolean { return this.data.is_root }
  get realParent(): TreeNode { return this.isRoot ? null : this.parent }

  // proxy functions:
  get options(): TreeOptions { return this.treeModel.options }
  fireEvent(event) { this.treeModel.fireEvent(event) }
  get context(): any { return this.options.context }

  // field accessors:
  get displayField() {
    return this.getField('display');
  }

  get id() {
    return this.getField('id');
  }

  set id(value) {
    this.setField('id', value);
  }

  getField(key) {
    return this.data[this.options[`${key}Field`]];
  }

  setField(key, value) {
    this.data[this.options[`${key}Field`]] = value;
  }

  // traversing:
  _findAdjacentSibling(steps, skipHidden = false) {
    const index = this._getIndexInParent(skipHidden);
    return this._getParentsChildren(skipHidden)[index + steps];
  }

  findNextSibling(skipHidden = false) {
    return this._findAdjacentSibling(+1, skipHidden);
  }

  findPreviousSibling(skipHidden = false) {
    return this._findAdjacentSibling(-1, skipHidden);
  }

  getVisibleChildren() {
    return (this.children || []).filter((node) => !node.isHidden);
  }

  getFirstChild(skipHidden = false) {
    let children = skipHidden ? this.getVisibleChildren() : this.children;

    return _.first(children || []);
  }

  getLastChild(skipHidden = false) {
    let children = skipHidden ? this.getVisibleChildren() : this.children;

    return _.last(children || []);
  }

  findNextNode(goInside = true, skipHidden = false) {
    return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
      this.findNextSibling(skipHidden) ||
      this.parent && this.parent.findNextNode(false, skipHidden);
  }

  findPreviousNode(skipHidden = false) {
    let previousSibling = this.findPreviousSibling(skipHidden);
    if (!previousSibling) {
      return this.realParent
    }
    return previousSibling._getLastOpenDescendant(skipHidden);
  }

  _getLastOpenDescendant(skipHidden = false) {
    const lastChild = this.getLastChild(skipHidden);
    return (this.isCollapsed || !lastChild)
      ? this
      : lastChild._getLastOpenDescendant(skipHidden);
  }

  private _getParentsChildren(skipHidden = false): any[] {
    const children = this.parent &&
      (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);

    return children || [];
  }

  private _getIndexInParent(skipHidden = false) {
    return this._getParentsChildren(skipHidden).indexOf(this);
  }

  isDescendantOf(node: TreeNode) {
    if (this === node) return true;
    else return this.parent && this.parent.isDescendantOf(node);
  }

  // helper methods:
  loadChildren() {
    if (!this.options.getChildren) {
      throw new Error('Node doesn\'t have children, or a getChildren method');
    }
    Promise.resolve(this.options.getChildren(this))
      .then((children) => {
        if (children) {
          this.setField('children', children);
          this._initChildren();
        }
      });
  }

  expand() {
    if (!this.isExpanded) {
      this.toggleExpanded();
    }

    return this;
  }

  collapse() {
    if (this.isExpanded) {
      this.toggleExpanded();
    }

    return this;
  }

  ensureVisible() {
    if (this.realParent) {
      this.realParent.expand();
      this.realParent.ensureVisible();
    }

    return this;
  }

  toggle() {
    deprecated('toggle', 'toggleExpanded');
    return this.toggleExpanded();
  }

  toggleExpanded() {
    // to do: when is expand or unexpand

    console.log(this);
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
    }
    this.fireEvent({ eventName: TREE_EVENTS.onToggle, warning: 'this event is deprecated, please use onToggleExpanded instead', node: this, isExpanded: this.isExpanded });
    this.fireEvent({ eventName: TREE_EVENTS.onToggleExpanded, node: this, isExpanded: this.isExpanded });
    this.update();
    return this;
  }

  setIsActive(value, multi = false) {
    this.treeModel.setActiveNode(this, value, multi);
    if (value) {
      this.focus();
    }

    return this;
  }

  toggleActivated(multi = false) {
    this.setIsActive(!this.isActive, multi);

    return this;
  }

  setActiveAndVisible(multi = false) {
    this.setIsActive(true, multi)
      .ensureVisible();

    setTimeout(this.scrollIntoView.bind(this));

    return this;
  }

  scrollIntoView(): any {
    if (this.elementRef) {
      const nativeElement = this.elementRef.nativeElement;
      nativeElement.scrollIntoViewIfNeeded && nativeElement.scrollIntoViewIfNeeded();

      return this;
    }
  }

  focus() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(this);
    this.scrollIntoView();
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: previousNode });
    }
    this.fireEvent({ eventName: TREE_EVENTS.onFocus, node: this });

    return this;
  }

  blur() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(null);
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: this });
    }

    return this;
  }

  filter(filterFn, autoShow = false) {
    let isVisible = filterFn(this);

    if (this.children) {
      this.children.forEach((child) => {
        child.filter(filterFn, autoShow);
        isVisible = isVisible || !child.isHidden;
      });
    }

    this.isHidden = !isVisible;
    if (autoShow) {
      this.ensureVisible();
    }
  }

  clearFilter() {
    this.isHidden = false;
    if (this.children) this.children.forEach((child) => child.clearFilter());
  }

  allowDrag() {
    return this.options.allowDrag;
  }
  

  mouseAction(actionName: string, $event, data: any = null) {
    //this.treeModel.setFocus(true);
    let foucstree = data.totree ? data.totree : this.treeModel;
    foucstree.setFocus(true);

    const actionMapping = this.options.actionMapping.mouse;
    const action = actionMapping[actionName];

    if (action) {

      // action(this.treeModel, this, $event, data);
      action(data.fromtree, this, $event, data);

      // TODO: remove after deprecation of context menu and dbl click
      if (actionName === 'contextMenu') {
        this.fireEvent({ eventName: TREE_EVENTS.onContextMenu, node: this, rawEvent: $event });
      }
      if (actionName === 'dblClick') {
        this.fireEvent({ eventName: TREE_EVENTS.onDoubleClick, warning: 'This event is deprecated, please use actionMapping to handle double clicks', node: this, rawEvent: $event });
      }
    }

    // TODO: move to the action itself:
    if (actionName === 'drop') {
      //this.treeModel.cancelDrag();
    }
  }

  _initChildren() {
    this.children = this.getField('children')
      .map(c => new TreeNode(c, this, this.treeModel));
  }
}

function uuid() {
  return Math.floor(Math.random() * 10000000000000);
}
