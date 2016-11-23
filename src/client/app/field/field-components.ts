import { Component,Input  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';
@Component({
    moduleId:module.id,
    selector:'field',
    templateUrl:'',
    styleUrls:[],
})
export class FieldComponent{
 @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  // 通过 isValid 判断是否校验通过
  get isValid() {
    return this.form.controls[this.field.key].valid;
  }
  get isEmpty() {
    // 注意这里的 errors 可能为 null，对于 null 不能直接取 empty
    // return this.form.controls[this.field.key].errors || {}['empty'];
    return this.form.controls[this.field.key].errors;
  }
}