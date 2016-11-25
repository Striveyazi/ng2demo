
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { TreeModule } from 'app/angular2-tree-component/dist/angular2-tree-component';

import { MyTreeComponent } from './tree.component';

@NgModule({
    imports: [TreeModule],
    exports: [],
    declarations: [MyTreeComponent],
    providers: [],
})
export class MyTreeModule { }
