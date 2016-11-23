

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
export interface ITaskBagTemplate{
    /**
     * according this property ,you can leran about this taskbag's chooseStates
     */
   
}

@Component({
    moduleId: module.id,
    selector: 'TaskBagContent',
    templateUrl: '../templates/taskbag.templates/taskbag-content.component.html'
})
export class TaskBagComponent implements OnInit {
    @Input()
    taskBagContentTemplate:TemplateRef<ITaskBagTemplate>;
     /**
     * according this property ,you can leran about this taskbag's chooseStates
     */
    @Input()
    taskBagInfo:any;
    upOne(){

    }
    upTop(){

    }
    downOne(){

    }
    downBottom(){

    }
    addFolder(){

    }
    addTask(){

    }
    deleteTask(){

    }
    constructor() { }

    ngOnInit() { }
}