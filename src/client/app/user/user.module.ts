import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './list-user/list-user.service';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[CommonModule,SharedModule],
    declarations:[UserComponent,AddUserComponent],
    exports:[UserComponent,AddUserComponent],
    providers:[UserService]
})
export class UserModule{}