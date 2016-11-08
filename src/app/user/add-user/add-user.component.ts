import { forbiddenNameValidator } from '../../shared/forbidden-username.directive';
import { User } from '../../../assets/entity/user';
import { UserService } from '../user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: "add-user",
    templateUrl: 'add-user.component.html',
    styleUrls: ['add-user.component.css']
})
export class AddComponent implements OnInit {
    userForm: FormGroup;
    user: User;
    needValidtorStr:string="fuck";
    formErrors: any = {  //json数据类型的属性 需要加上 :any 不然会报错
        'name': '',
        'phone': '',
        'password': ''
        ///..need to valid's properties
    }
    submitted = false;
    constructor(public userService: UserService, private fb: FormBuilder) { }
    ngOnInit() {
        this.user = new User();
        this.buildForm();
    }
    addUser() {
        this.user = this.userForm.value;
        this.submitted = true;
        this.userService.addUser(this.user);
    }
    buildForm() {
        this.userForm = this.fb.group({
            'name': [
                this.user.name,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(24),
                    forbiddenNameValidator(/bob/i)
                ]
            ],
            'phone': [
                this.user.phone, [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(24)
                ]
            ],
            'password': [
                this.user.password, [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(24),]
            ]
        })
        this.userForm.valueChanges.subscribe(data=>this.OnvalueChanged(data));
        //
        this.OnvalueChanged();
    }
    OnvalueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm
        for (const field in this.formErrors) {
             /**
             * we should clean previous  error's  messages
             */
            this.formErrors[field]="";
            /**
             * if control's is changed  and when control.dirty is true and control.vaild is false
             * we should add these errorsMsg in the 'formErrors' properties
             */
            const control = form.get(field);
            if(control&&control.dirty&&!control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] += messages[key]+' ';
                }
            }
        }
    }
    validationMessages: any = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
            'forbiddenName': 'Someone named "Bob" cannot be a hero.'
        },
        'password': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
        },
        'phone': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
        }
    }
}