import { HighLightDirective } from './highlight.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainPanelComponent }   from './mainpanel.component';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [MainPanelComponent,HighLightDirective],
    providers: [],
})
export class MainPanelModule { }
