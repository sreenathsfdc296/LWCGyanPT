import { LightningElement,api} from 'lwc';

export default class ProfileCard extends LightningElement {
    @api empName;
    @api empDept;
    @api empRole;
    @api empExp;
    cardClass='slds-p-around_medium';

    @api
    highlightMyprofile(){
        console.log('highlightMyprofile button is clicked in parent and highlightMyprofile child method is called');
        this.cardClass='slds-p-around_medium slds-theme_success';
    }

    @api
    resetMyprofile(){
        console.log('resetMyprofile button is clicked in parent and resetMyprofile child method is called');
       // this.cardClass='slds-p-around_medium slds-theme_success';
        this.empName='';
        this.empDept='';
        this.empRole='';
        this.empExp='';
        this.cardClass='slds-p-around_medium';
        
    }
}