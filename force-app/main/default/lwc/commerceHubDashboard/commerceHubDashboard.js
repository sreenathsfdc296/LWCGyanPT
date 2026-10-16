import { LightningElement } from 'lwc';

export default class CommerceHubDashboard extends LightningElement {
    inputValue='';
    adminName='Sreenath';
    productsCount = 120;
    ordersCount = 350;
    totalCustomers=56;
    revenueTotoal='Rs.100 Lakhs';

    handlechangeAdminname(event){
     console.log('handlechangeAdminname called');
    this.inputValue=event.target.value;

    }
    handleadminchangeClick()
    {
    console.log('handleadminchangeClick called');
    this.adminName=this.inputValue;
    }
}