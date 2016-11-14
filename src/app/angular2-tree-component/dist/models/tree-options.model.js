"use strict";
var keys_1 = require('../constants/keys');
var deprecated_1 = require('../deprecated');
var _ = require('lodash');
exports.TREE_ACTIONS = {
    TOGGLE_SELECTED: function (tree, node, $event) { return node.toggleActivated(); },
    TOGGLE_SELECTED_MULTI: function (tree, node, $event) { return node.toggleActivated(true); },
    SELECT: function (tree, node, $event) { return node.setIsActive(true); },
    DESELECT: function (tree, node, $event) { return node.setIsActive(false); },
    FOCUS: function (tree, node, $event) { return node.focus(); },
    TOGGLE_EXPANDED: function (tree, node, $event) { return node.toggleExpanded(); },
    EXPAND: function (tree, node, $event) { return node.expand(); },
    COLLAPSE: function (tree, node, $event) { return node.collapse(); },
    DRILL_DOWN: function (tree, node, $event) { return tree.focusDrillDown(); },
    DRILL_UP: function (tree, node, $event) { return tree.focusDrillUp(); },
    NEXT_NODE: function (tree, node, $event) { return tree.focusNextNode(); },
    PREVIOUS_NODE: function (tree, node, $event) { return tree.focusPreviousNode(); },
    MOVE_NODE: function (tree, node, $event, to) {
        console.log("trigger")
        console.log(tree._dragNode);
        tree.moveNode({ from: tree.getDragNode(), to: to });
    }
};
var defaultActionMapping = {
    mouse: {
        click: exports.TREE_ACTIONS.TOGGLE_SELECTED,
        dblClick: null,
        contextMenu: null,
        expanderClick: exports.TREE_ACTIONS.TOGGLE_EXPANDED,
        drop: exports.TREE_ACTIONS.MOVE_NODE
    },
    keys: (_a = {},
        _a[keys_1.KEYS.RIGHT] = exports.TREE_ACTIONS.DRILL_DOWN,
        _a[keys_1.KEYS.LEFT] = exports.TREE_ACTIONS.DRILL_UP,
        _a[keys_1.KEYS.DOWN] = exports.TREE_ACTIONS.NEXT_NODE,
        _a[keys_1.KEYS.UP] = exports.TREE_ACTIONS.PREVIOUS_NODE,
        _a[keys_1.KEYS.SPACE] = exports.TREE_ACTIONS.TOGGLE_SELECTED,
        _a[keys_1.KEYS.ENTER] = exports.TREE_ACTIONS.TOGGLE_SELECTED,
        _a
    )
};
var TreeOptions = (function () {
    function TreeOptions(options) {
        if (options === void 0) { options = {}; }
        this.getChildren = null;
        var optionsWithDefaults = _.defaultsDeep({}, options, {
            childrenField: 'children',
            displayField: 'name',
            idField: 'id',
            isExpandedField: 'isExpanded',
            isHiddenField: 'isHidden',
            getChildren: null,
            hasCustomContextMenu: false,
            context: null,
            actionMapping: defaultActionMapping,
            allowDrag: false
        });
        _.extend(this, optionsWithDefaults);
        if (options.hasCustomContextMenu) {
            deprecated_1.deprecated('hasCustomContextMenu', 'actionMapping: mouse: contextMenu');
        }
        if (options.context) {
            deprecated_1.deprecated('context', 'values directly in a template in the content of the <Tree> component like this: <Tree><template #treeNodeTemplate let-node>{{ outsideValue }}</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.treeNodeTemplate) {
            deprecated_1.deprecated('treeNodeTemplate', 'a template in the content of the <Tree> component like this: <Tree><template #treeNodeTemplate let-node>...</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.loadingComponent) {
            deprecated_1.deprecated('loadingComponent', 'a template in the content of the <Tree> component like this: <Tree><template #loadingTemplate>...</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (_.get(options, 'mouse.shift')) {
            deprecated_1.deprecated('mouse.shift', '$event.shiftKey in click action instead');
        }
        if (_.get(options, 'mouse.ctrl')) {
            deprecated_1.deprecated('mouse.ctrl', '$event.ctrlKey in click action instead');
        }
        if (_.get(options, 'mouse.alt')) {
            deprecated_1.deprecated('mouse.alt', '$event.altKey in click action instead');
        }
    }
    return TreeOptions;
}());
exports.TreeOptions = TreeOptions;
var _a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHFCQUFxQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQU1mLG9CQUFZLEdBQUc7SUFDMUIsZUFBZSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQXRCLENBQXNCO0lBQ3RGLHFCQUFxQixFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUExQixDQUEwQjtJQUNoRyxNQUFNLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQXRCLENBQXNCO0lBQzdFLFFBQVEsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUI7SUFDaEYsS0FBSyxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWTtJQUNsRSxlQUFlLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUI7SUFDckYsTUFBTSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYTtJQUNwRSxRQUFR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QUMsQ0FBQztZQUM3Qix1QkFBVSxDQUFDLGtCQUFrQixFQUFFLHVPQUF1TyxDQUFDLENBQUM7UUFDMVEsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDN0IsdUJBQVUsQ0FBQyxrQkFBa0IsRUFBRSw2TkFBNk4sQ0FBQyxDQUFDO1FBQ2hRLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsdUJBQVUsQ0FBQyxhQUFhLEVBQUUseUNBQXlDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLHVCQUFVLENBQUMsWUFBWSxFQUFFLHdDQUF3QyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDSCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBMURELElBMERDO0FBMURZLG1CQUFXLGNBMER2QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlzJztcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICcuLi9kZXByZWNhdGVkJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25IYW5kbGVyIHtcbiAgKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55LCAuLi5yZXN0KTtcbn1cblxuZXhwb3J0IGNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgVE9HR0xFX1NFTEVDVEVEOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUudG9nZ2xlQWN0aXZhdGVkKCksXG4gIFRPR0dMRV9TRUxFQ1RFRF9NVUxUSTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnRvZ2dsZUFjdGl2YXRlZCh0cnVlKSxcbiAgU0VMRUNUOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUodHJ1ZSksXG4gIERFU0VMRUNUOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUoZmFsc2UpLFxuICBGT0NVUzogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmZvY3VzKCksXG4gIFRPR0dMRV9FWFBBTkRFRDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnRvZ2dsZUV4cGFuZGVkKCksXG4gIEVYUEFORDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmV4cGFuZCgpLFxuICBDT0xMQVBTRTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmNvbGxhcHNlKCksXG4gIERSSUxMX0RPV046ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gdHJlZS5mb2N1c0RyaWxsRG93bigpLFxuICBEUklMTF9VUDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiB0cmVlLmZvY3VzRHJpbGxVcCgpLFxuICBORVhUX05PREU6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gIHRyZWUuZm9jdXNOZXh0Tm9kZSgpLFxuICBQUkVWSU9VU19OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+ICB0cmVlLmZvY3VzUHJldmlvdXNOb2RlKCksXG4gIE1PVkVfTk9ERTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55LCB0bzp7IG5vZGU6VHJlZU5vZGUsIGluZGV4OiBudW1iZXIgfSkgPT4ge1xuICAgIHRyZWUubW92ZU5vZGUoeyBmcm9tOiB0cmVlLmdldERyYWdOb2RlKCksIHRvIH0pO1xuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRBY3Rpb25NYXBwaW5nOklBY3Rpb25NYXBwaW5nID0ge1xuICBtb3VzZToge1xuICAgIGNsaWNrOiBUUkVFX0FDVElPTlMuVE9HR0xFX1NFTEVDVEVELFxuICAgIGRibENsaWNrOiBudWxsLFxuICAgIGNvbnRleHRNZW51OiBudWxsLFxuICAgIGV4cGFuZGVyQ2xpY2s6IFRSRUVfQUNUSU9OUy5UT0dHTEVfRVhQQU5ERUQsXG4gICAgZHJvcDogVFJFRV9BQ1RJT05TLk1PVkVfTk9ERVxuICB9LFxuICBrZXlzOiB7XG4gICAgW0tFWVMuUklHSFRdOiBUUkVFX0FDVElPTlMuRFJJTExfRE9XTixcbiAgICBbS0VZUy5MRUZUXTogVFJFRV9BQ1RJT05TLkRSSUxMX1VQLFxuICAgIFtLRVlTLkRPV05dOiBUUkVFX0FDVElPTlMuTkVYVF9OT0RFLFxuICAgIFtLRVlTLlVQXTogVFJFRV9BQ1RJT05TLlBSRVZJT1VTX05PREUsXG4gICAgW0tFWVMuU1BBQ0VdOiBUUkVFX0FDVElPTlMuVE9HR0xFX1NFTEVDVEVELFxuICAgIFtLRVlTLkVOVEVSXTogVFJFRV9BQ1RJT05TLlRPR0dMRV9TRUxFQ1RFRFxuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25NYXBwaW5nIHtcbiAgbW91c2U/OiB7XG4gICAgY2xpY2s/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkYmxDbGljaz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGNvbnRleHRNZW51PzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZXhwYW5kZXJDbGljaz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyYWdTdGFydD86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyYWc/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkcmFnRW5kPzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZHJhZ092ZXI/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkcm9wPzogSUFjdGlvbkhhbmRsZXJcbiAgfSxcbiAga2V5cz86IHtcbiAgICBba2V5Om51bWJlcl06IElBY3Rpb25IYW5kbGVyXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVHJlZU9wdGlvbnMge1xuICBjaGlsZHJlbkZpZWxkPzogc3RyaW5nO1xuICBkaXNwbGF5RmllbGQ/OiBzdHJpbmc7XG4gIGlkRmllbGQ/OiBzdHJpbmc7XG4gIGlzRXhwYW5kZWRGaWVsZD86c3RyaW5nO1xuICBpc0hpZGRlbkZpZWxkPzpzdHJpbmc7XG4gIHRyZWVOb2RlVGVtcGxhdGU/OiBhbnk7XG4gIGxvYWRpbmdDb21wb25lbnQ/OiBhbnk7XG4gIGdldENoaWxkcmVuPzogKG5vZGU6VHJlZU5vZGUpID0+IGFueTtcbiAgaGFzQ3VzdG9tQ29udGV4dE1lbnU/OiBib29sZWFuO1xuICBjb250ZXh0PzogYW55O1xuICBhY3Rpb25NYXBwaW5nPzogYW55O1xuICBhbGxvd0RyYWc/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgVHJlZU9wdGlvbnMge1xuICBjaGlsZHJlbkZpZWxkOiBzdHJpbmc7XG4gIGRpc3BsYXlGaWVsZDogc3RyaW5nO1xuICBpZEZpZWxkOiBzdHJpbmc7XG4gIGlzRXhwYW5kZWRGaWVsZDpzdHJpbmc7XG4gIGlzSGlkZGVuRmllbGQ6c3RyaW5nO1xuICB0cmVlTm9kZVRlbXBsYXRlOiBhbnk7XG4gIGxvYWRpbmdDb21wb25lbnQ6IGFueTtcbiAgZ2V0Q2hpbGRyZW46IGFueSA9IG51bGw7XG4gIGhhc0N1c3RvbUNvbnRleHRNZW51OiBib29sZWFuO1xuICBjb250ZXh0OiBhbnk7XG4gIGFjdGlvbk1hcHBpbmc6IGFueTtcbiAgYWxsb3dEcmFnOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6YW55ID0ge30pIHtcbiAgICBjb25zdCBvcHRpb25zV2l0aERlZmF1bHRzID0gXy5kZWZhdWx0c0RlZXAoe30sIG9wdGlvbnMsIHtcbiAgICAgIGNoaWxkcmVuRmllbGQ6ICdjaGlsZHJlbicsXG4gICAgICBkaXNwbGF5RmllbGQ6ICduYW1lJyxcbiAgICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgICBpc0V4cGFuZGVkRmllbGQ6ICdpc0V4cGFuZGVkJyxcbiAgICAgIGlzSGlkZGVuRmllbGQ6ICdpc0hpZGRlbicsXG4gICAgICBnZXRDaGlsZHJlbjogbnVsbCxcbiAgICAgIGhhc0N1c3RvbUNvbnRleHRNZW51OiBmYWxzZSxcbiAgICAgIGNvbnRleHQ6IG51bGwsXG4gICAgICBhY3Rpb25NYXBwaW5nOiBkZWZhdWx0QWN0aW9uTWFwcGluZyxcbiAgICAgIGFsbG93RHJhZzogZmFsc2VcbiAgICB9KTtcblxuICAgIF8uZXh0ZW5kKHRoaXMsIG9wdGlvbnNXaXRoRGVmYXVsdHMpO1xuXG4gICAgaWYgKG9wdGlvbnMuaGFzQ3VzdG9tQ29udGV4dE1lbnUpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ2hhc0N1c3RvbUNvbnRleHRNZW51JywgJ2FjdGlvbk1hcHBpbmc6IG1vdXNlOiBjb250ZXh0TWVudScpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvbnRleHQpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ2NvbnRleHQnLCAndmFsdWVzIGRpcmVjdGx5IGluIGEgdGVtcGxhdGUgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIDxUcmVlPiBjb21wb25lbnQgbGlrZSB0aGlzOiA8VHJlZT48dGVtcGxhdGUgI3RyZWVOb2RlVGVtcGxhdGUgbGV0LW5vZGU+e3sgb3V0c2lkZVZhbHVlIH19PC90ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnRyZWVOb2RlVGVtcGxhdGUpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ3RyZWVOb2RlVGVtcGxhdGUnLCAnYSB0ZW1wbGF0ZSBpbiB0aGUgY29udGVudCBvZiB0aGUgPFRyZWU+IGNvbXBvbmVudCBsaWtlIHRoaXM6IDxUcmVlPjx0ZW1wbGF0ZSAjdHJlZU5vZGVUZW1wbGF0ZSBsZXQtbm9kZT4uLi48L3RlbXBsYXRlPjwvVHJlZT4uICBJZiB5b3UgZG9uXFwndCBoYXZlIHRpbWUgdG8gdXBkYXRlIHlvdXIgY29kZSBhbmQgZG9uXFwndCBuZWVkIEFvVCBjb21waWxhdGlvbiwgdXNlIERlcHJlY2F0ZWRUcmVlTW9kdWxlJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMubG9hZGluZ0NvbXBvbmVudCkge1xuICAgICAgZGVwcmVjYXRlZCgnbG9hZGluZ0NvbXBvbmVudCcsICdhIHRlbXBsYXRlIGluIHRoZSBjb250ZW50IG9mIHRoZSA8VHJlZT4gY29tcG9uZW50IGxpa2UgdGhpczogPFRyZWU+PHRlbXBsYXRlICNsb2FkaW5nVGVtcGxhdGU+Li4uPC90ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xuICAgIH1cblxuICAgIGlmIChfLmdldChvcHRpb25zLCAnbW91c2Uuc2hpZnQnKSkge1xuICAgICAgZGVwcmVjYXRlZCgnbW91c2Uuc2hpZnQnLCAnJGV2ZW50LnNoaWZ0S2V5IGluIGNsaWNrIGFjdGlvbiBpbnN0ZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKF8uZ2V0KG9wdGlvbnMsICdtb3VzZS5jdHJsJykpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ21vdXNlLmN0cmwnLCAnJGV2ZW50LmN0cmxLZXkgaW4gY2xpY2sgYWN0aW9uIGluc3RlYWQnKTtcbiAgICB9XG5cbiAgICBpZiAoXy5nZXQob3B0aW9ucywgJ21vdXNlLmFsdCcpKSB7XG4gICAgICBkZXByZWNhdGVkKCdtb3VzZS5hbHQnLCAnJGV2ZW50LmFsdEtleSBpbiBjbGljayBhY3Rpb24gaW5zdGVhZCcpO1xuICAgIH1cbiAgfVxufVxuIl19