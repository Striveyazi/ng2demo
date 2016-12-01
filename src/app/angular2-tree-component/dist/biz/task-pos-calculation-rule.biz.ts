import { Injectable } from '@angular/core';
@Injectable()
export class PosCalculationRule {
    /**
     * Returns a new pos
     */
    First_Rule():number{
        return 65535;
    }
    /**
      * Returns a new pos 
      */
    Second_Rule(target_pos:number):number{
        return target_pos+65535;
    }
    /**
      *  target_pos > previous_poss
      */
    Third_Rule(previous_pos:number,target_pos:number){
        let sum = target_pos+previous_pos;
        let sub = target_pos-previous_pos;
        return sum / 2 + Math.random() * sub * 0.01;
    }
}