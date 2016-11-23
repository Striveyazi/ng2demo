import { FormControl } from '@angular/forms';
const REG ={
    UUSERNAME: /^\w{1,20}$/,
  PASSWORD: /^\w{6,20}$/
}
interface ValidationResult{
    [key:string]:boolean;
}
export class FieldValidators{
    public static username(control:FormControl):ValidationResult{
        if(control.value.lengh===0){
            return {
                empty:true
            };
        }
        if(REG.UUSERNAME.test(control.value)){
            return null;
        }
        return{
            invalid:true
        }
    }
}