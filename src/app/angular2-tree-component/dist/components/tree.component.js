"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tree_model_1 = require('../models/tree.model');
var tree_options_model_1 = require('../models/tree-options.model');
var _ = require('lodash');
var TreeComponent = (function () {
    function TreeComponent(treeModel) {
        var _this = this;
        this.treeModel = treeModel;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new core_1.EventEmitter(); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (_.includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = $event.target.closest('Tree');
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: _.pick(this, this.treeModel.eventNames)
        });
    };
    __decorate([
        core_1.ContentChild('loadingTemplate'), 
        __metadata('design:type', core_1.TemplateRef)
    ], TreeComponent.prototype, "loadingTemplate", void 0);
    __decorate([
        core_1.ContentChild('treeNodeTemplate'), 
        __metadata('design:type', core_1.TemplateRef)
    ], TreeComponent.prototype, "treeNodeTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], TreeComponent.prototype, "nodes", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', tree_options_model_1.TreeOptions), 
        __metadata('design:paramtypes', [tree_options_model_1.TreeOptions])
    ], TreeComponent.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], TreeComponent.prototype, "focused", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onActiveChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onActivate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onDeactivate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onDoubleClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onContextMenu", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onUpdateData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onInitialized", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onMoveNode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "onEvent", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'Tree',
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                '(body: keydown)': "onKeydown($event)",
                '(body: mousedown)': "onMousedown($event)"
            },
            providers: [tree_model_1.TreeModel],
            styles: [
                '.tree-children { padding-left: 20px }',
                ".tree {\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
            ],
            template: "\n    <div class=\"tree\" [class.node-dragging]=\"treeModel.isDragging()\">\n      <TreeNode\n        *ngFor=\"let node of treeModel.roots; let i = index\"\n        [node]=\"node\"\n        [nodeIndex]=\"i\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [treeNodeContentTemplate]=\"treeNodeTemplate\">\n      </TreeNode>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [tree_model_1.TreeModel])
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThILGVBQWUsQ0FBQyxDQUFBO0FBRTlJLDJCQUEwQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2pELG1DQUE0Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRzNELElBQVksQ0FBQyxXQUFNLFFBRW5CLENBQUMsQ0FGMEI7QUFtQzNCO0lBQ0UsdUJBQW1CLFNBQW1CO1FBRHhDLGlCQXdEQztRQXZEb0IsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNwQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFTUSxzQkFBSSxnQ0FBSztRQURsQixpQ0FBaUM7YUFDeEIsVUFBVSxLQUFXLElBQUksQ0FBQzs7O09BQUE7O0lBQzFCLHNCQUFJLGtDQUFPO2FBQVgsVUFBWSxPQUFtQixJQUFJLENBQUM7OztPQUFBOztJQUVwQyxzQkFBSSxrQ0FBTzthQUFYLFVBQVksS0FBYTtZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQWVELGlDQUFTLEdBQVQsVUFBVSxNQUFNO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRTFELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxNQUFNO1FBQ2hCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUN4RCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVk7WUFDbEQsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ2hELENBQUMsQ0FBQztJQUNMLENBQUM7SUEvQ0Q7UUFBQyxtQkFBWSxDQUFDLGlCQUFpQixDQUFDOzswREFBQTtJQUNoQztRQUFDLG1CQUFZLENBQUMsa0JBQWtCLENBQUM7OzJEQUFBO0lBR2pDO1FBQUMsWUFBSyxFQUFFOzs7OENBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OztnREFBQTtJQUlSO1FBQUMsYUFBTSxFQUFFOzttREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzswREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztxREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzt1REFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztrREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztpREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzt3REFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzt3REFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzt1REFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzt3REFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztxREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztrREFBQTtJQS9EWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxJQUFJLEVBQUU7Z0JBQ0osaUJBQWlCLEVBQUUsbUJBQW1CO2dCQUN0QyxtQkFBbUIsRUFBRSxxQkFBcUI7YUFDM0M7WUFDRCxTQUFTLEVBQUUsQ0FBQyxzQkFBUyxDQUFDO1lBQ3RCLE1BQU0sRUFBRTtnQkFDTix1Q0FBdUM7Z0JBQ3ZDLHdiQVNFO2FBQ0g7WUFDRCxRQUFRLEVBQUUsNFZBVVQ7U0FDRixDQUFDOztxQkFBQTtJQXlERixvQkFBQztBQUFELENBQUMsQUF4REQsSUF3REM7QUF4RFkscUJBQWEsZ0JBd0R6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVRyZWVOb2RlVGVtcGxhdGUgfSBmcm9tICcuL3RyZWUtbm9kZS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlzJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RyZWUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJyhib2R5OiBrZXlkb3duKSc6IFwib25LZXlkb3duKCRldmVudClcIixcbiAgICAnKGJvZHk6IG1vdXNlZG93biknOiBcIm9uTW91c2Vkb3duKCRldmVudClcIlxuICB9LFxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxuICBzdHlsZXM6IFtcbiAgICAnLnRyZWUtY2hpbGRyZW4geyBwYWRkaW5nLWxlZnQ6IDIwcHggfScsXG4gICAgYC50cmVlIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLyogaU9TIFNhZmFyaSAqL1xuICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgICAvKiBDaHJvbWUvU2FmYXJpL09wZXJhICovXG4gICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7ICAgIC8qIEtvbnF1ZXJvciAqL1xuICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgICAgICAvKiBGaXJlZm94ICovXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgIC8qIElFL0VkZ2UgKi9cbiAgICAgIHVzZXItc2VsZWN0OiBub25lOyAgICAgICAgICAgLyogbm9uLXByZWZpeGVkIHZlcnNpb24sIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkIGJ5IGFueSBicm93c2VyICovXG4gICAgfWBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidHJlZVwiIFtjbGFzcy5ub2RlLWRyYWdnaW5nXT1cInRyZWVNb2RlbC5pc0RyYWdnaW5nKClcIj5cbiAgICAgIDxUcmVlTm9kZVxuICAgICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiB0cmVlTW9kZWwucm9vdHM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgW25vZGVJbmRleF09XCJpXCJcbiAgICAgICAgW2xvYWRpbmdUZW1wbGF0ZV09XCJsb2FkaW5nVGVtcGxhdGVcIlxuICAgICAgICBbdHJlZU5vZGVDb250ZW50VGVtcGxhdGVdPVwidHJlZU5vZGVUZW1wbGF0ZVwiPlxuICAgICAgPC9UcmVlTm9kZT5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRyZWVNb2RlbDpUcmVlTW9kZWwpIHtcbiAgICB0cmVlTW9kZWwuZXZlbnROYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB0aGlzW25hbWVdID0gbmV3IEV2ZW50RW1pdHRlcigpKTtcbiAgfVxuXG4gIF9ub2RlczphbnlbXTtcbiAgX29wdGlvbnM6VHJlZU9wdGlvbnM7XG5cbiAgQENvbnRlbnRDaGlsZCgnbG9hZGluZ1RlbXBsYXRlJykgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVRlbXBsYXRlJykgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVRyZWVOb2RlVGVtcGxhdGU+O1xuXG4gIC8vIFdpbGwgYmUgaGFuZGxlZCBpbiBuZ09uQ2hhbmdlc1xuICBASW5wdXQoKSBzZXQgbm9kZXMobm9kZXM6YW55W10pIHsgfTtcbiAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczpUcmVlT3B0aW9ucykgeyB9O1xuXG4gIEBJbnB1dCgpIHNldCBmb2N1c2VkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh2YWx1ZSk7XG4gIH1cblxuICBAT3V0cHV0KCkgb25Ub2dnbGU7XG4gIEBPdXRwdXQoKSBvbkFjdGl2ZUNoYW5nZWQ7XG4gIEBPdXRwdXQoKSBvbkFjdGl2YXRlO1xuICBAT3V0cHV0KCkgb25EZWFjdGl2YXRlO1xuICBAT3V0cHV0KCkgb25Gb2N1cztcbiAgQE91dHB1dCgpIG9uQmx1cjtcbiAgQE91dHB1dCgpIG9uRG91YmxlQ2xpY2s7XG4gIEBPdXRwdXQoKSBvbkNvbnRleHRNZW51O1xuICBAT3V0cHV0KCkgb25VcGRhdGVEYXRhO1xuICBAT3V0cHV0KCkgb25Jbml0aWFsaXplZDtcbiAgQE91dHB1dCgpIG9uTW92ZU5vZGU7XG4gIEBPdXRwdXQoKSBvbkV2ZW50O1xuXG4gIG9uS2V5ZG93bigkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMudHJlZU1vZGVsLmlzRm9jdXNlZCkgcmV0dXJuO1xuICAgIGlmIChfLmluY2x1ZGVzKFsnaW5wdXQnLCAndGV4dGFyZWEnXSxcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XG5cbiAgICBjb25zdCBmb2N1c2VkTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG5cbiAgICB0aGlzLnRyZWVNb2RlbC5wZXJmb3JtS2V5QWN0aW9uKGZvY3VzZWROb2RlLCAkZXZlbnQpO1xuICB9XG5cbiAgb25Nb3VzZWRvd24oJGV2ZW50KSB7XG4gICAgbGV0IGluc2lkZUNsaWNrID0gJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdUcmVlJyk7XG4gICAgaWYgKCFpbnNpZGVDbGljaykge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcbiAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxuICAgICAgbm9kZXM6IGNoYW5nZXMubm9kZXMgJiYgY2hhbmdlcy5ub2Rlcy5jdXJyZW50VmFsdWUsXG4gICAgICBldmVudHM6IF8ucGljayh0aGlzLCB0aGlzLnRyZWVNb2RlbC5ldmVudE5hbWVzKVxuICAgIH0pO1xuICB9XG59XG4iXX0=