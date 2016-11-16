

import { Component, OnInit } from '@angular/core';
export interface ITaskBagTemplate{
    /**
     * according this property ,you can leran about this taskbag's chooseStates
     */
    chooseStates:boolean; 
    context:any;
}

@Component({
    moduleId: module.id,
    selector: 'TaskBagContent',
    templateUrl: '../templates/taskbag.templates/taskbag-content.component.html'
})
export class FeatureComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}