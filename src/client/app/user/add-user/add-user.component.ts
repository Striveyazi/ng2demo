import { NgForm } from '@angular/forms';

import { Component,AfterViewChecked, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector:'add-user',
    templateUrl:'add-user.component.html',
    styleUrls:['./add-user.component.css']
})
export class AddUserComponent implements AfterViewChecked{
    userForm:NgForm;
    @ViewChild('userForm') currentForm: NgForm; //viewChild()用来查询当前模版对应的模版引用变量
    //直接在template上引用 
    formErrors:any={    //json数据类型的属性 需要加上 :any 不然会报错
        'name':'dd',
        'power':'',
        ///..need to valid's properties
    };
    submitted=false;
    
    constructor(){}
    username:string;
    password:string;
    phone:string;
    addUser():void{
        this.submitted = true;
        console.log("add user !!!!");
    }
    //template上检测到变化后就要调用该函数
    ngAfterViewChecked() {
        this.formChanged();                
    }
    /**
     * 
     */
    formChanged(){

        if(this.currentForm === this.userForm){
            console.log(1);
            return ;
        }
        this.userForm = this.currentForm;
        if(this.userForm){
            this.userForm.valueChanges.subscribe(data=>this.onvalueChanged(data));
        }
    }
    /**
     * 
     */
    onvalueChanged(data?:any){
        if(!this.userForm) {
            console.log(2);
            return ;
        }
        const form = this.userForm.form;
        for(const field in this.formErrors){
            /**
             * we should clean previous  error's  messages
             */
            this.formErrors[field] = "";
            const control = form.get(field);
            /**
             * if control's is changed  and when control.dirty is true and control.vaild is false
             * we should add these errorsMsg in the 'formErrors' properties
             */
            
            if(control && control.dirty && !control.valid){
                console.log(3);
                console.log(control.errors);
                const messages= this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] += messages[key]+' ';
                }
            }
        }
    }
    validationMessages:any = {
        'name': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 4 characters long.',
        'maxlength':     'Name cannot be more than 24 characters long.',
        'forbiddenName': 'Someone named "Bob" cannot be a hero.'
        },
        'power': {
            'required': 'Power is required.'
        }
};
    
}
