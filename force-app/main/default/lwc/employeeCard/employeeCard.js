import { LightningElement } from 'lwc';

export default class EmployeeCard extends LightningElement {
     
    //the variables that we create inside this scope as property by sreenath

    empName='SREENATH';
    empDesignation='Developer';
    empDepartment='IT';
    empExp='10 years';
    empproject='LWC integration';
    isActive=false;
    isOnLeave=false;
    
   handleActive(){
        console.log('isActive button clicked');
        this.isActive = true;
        this.isOnLeave=false;
    }
     handleoOnleave(){
         console.log('Onleave button clicked');
        this.isOnLeave = true;
        this.isActive=false;
    }
}