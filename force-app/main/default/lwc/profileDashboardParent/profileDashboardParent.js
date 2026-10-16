import { LightningElement,api } from 'lwc';

export default class ProfileDashboardParent extends LightningElement {

    @api employeeName='';
    @api employeeDept='';
    @api employeeDesig='';
    @api employeeExperince='';

    handleChangeName(event){
        console.log('handleChangeName called');
        this.employeeName=event.target.value;
    }
    handleChangeDept(event){
        console.log('handleChangeDept called');
         this.employeeDept=event.target.value;
    }
    handleChangeDesig(event){
        console.log('handleChangeDesig called');
         this.employeeDesig=event.target.value;
    }
    handleChangeExperince(event){
        console.log('handleChangeExperince called');
         this.employeeExperince=event.target.value;
    }
    handleHighlight(){
        console.log('handleHighlight method id called');
        this.template.querySelector('c-profile-card').highlightMyprofile();
        
    }
    handleResetProfile(){
        console.log('handleResetProfile method is called');
         this.template.querySelector('c-profile-card').resetMyprofile();
            this.employeeName='';
            this.employeeDept='';
            this.employeeDesig='';
            this.employeeExperince='';
    }
}