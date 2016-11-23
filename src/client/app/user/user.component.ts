import { User } from '../../assets/entities/user';
import { UserService } from './list-user/list-user.service';
import {Component,OnInit, Input,Output } from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'sd-user',
    templateUrl:'user.component.html',
    styleUrls:[],
})
export class UserComponent implements OnInit{
    @Input()
    user:User;
    users:User[] = [];
    errorMessage: string;
    constructor(public userService:UserService){
       
    }
    ngOnInit(){
        this.user = {id:"",name:"",phone:"",password:""};
        this.getUsers();
    }
    getUsers(){
        this.userService.getUser()
        .subscribe(
            user =>this.users = user,
            error =>this.errorMessage =<any>error
        )
    }
    addUser(){

    }
    editUser(){

    }
    deleteUser():boolean{
        return true;
    }
}