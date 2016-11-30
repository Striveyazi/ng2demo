import { Injectable } from '@angular/core';
import {Task} from './task.entity';
@Injectable()
export class TaskBagContainer{
    static _focusedTask:Task;
    _focusedTask:Task;
}