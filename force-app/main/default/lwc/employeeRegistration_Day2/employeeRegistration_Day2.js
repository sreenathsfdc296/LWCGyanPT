import { LightningElement } from 'lwc';

export default class EmployeeRegistration_Day2 extends LightningElement {
   
    empName='';
    handleName(event){
        this.empName=event.target.value;
    }
}