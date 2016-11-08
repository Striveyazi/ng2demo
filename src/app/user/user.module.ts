import { CommonModule } from '@angular/common';
import { AddComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';
import { UserService } from './user.service';
import { UserComponent } from './user.component';


/**
 * Defines a schema that will allow:
 * - any non-Angular elements with a `-` in their name,
 * - any properties on elements with a `-` in their name which is the common rule for custom
 * elements.
 *
 * @stable
 */

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
@NgModule({
    imports:[CommonModule,ReactiveFormsModule],
    declarations:[UserComponent,ListUserComponent,AddComponent],
    bootstrap:[UserComponent],
    providers:[UserService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule{

}