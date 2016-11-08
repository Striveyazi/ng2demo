import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'mainpanel',
    templateUrl: 'mainpanel.component.html'
})
export class MainPanelComponent implements OnInit {
    constructor() { }
    color:string;
    ngOnInit() {
        console.log("test mainpanel");
     }
}