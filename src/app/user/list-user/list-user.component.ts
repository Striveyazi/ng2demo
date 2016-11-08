import { UserService } from '../user.service';
import { User } from '../../../assets/entity/user';
import { Component, OnInit } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'list-user',
    templateUrl: 'list-user.component.html',
    styleUrls: ['list-user.component.css']
})
export class ListUserComponent implements OnInit {
    users: User[];
    user: User;
    errorMessage: string;
    ngOnInit() {
        
        this.user = new User();
        this.getUser();
    }
    constructor(public userService: UserService) { }
    getUser() {
        this.userService.getUser().subscribe(
            users => this.users = users,
            error => this.errorMessage = error
        );
    }
}