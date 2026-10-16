import { LightningElement, wire } from 'lwc';
import getCustomerdataimp from '@salesforce/apex/customerList.getCustomerdataimp';
import deletecustomer from '@salesforce/apex/customerList.deletecustomer';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LightningConfirm from 'lightning/confirm';
import { refreshApex } from '@salesforce/apex';

const COLUMNS=[
    {label:'Customer Name',fieldName:'displayName'},
    {label:'Customer Code',fieldName:'Customer_Code__c'},
    {label:'Customer Status',fieldName:'Customer_Status__c'},
    {label:'Gender',fieldName:'Gender__c'},
    {label:'Email',fieldName:'Email__c'},
    {label:'State',fieldName:'State__c'},
    {label:'City',fieldName:'City__c'},
    {
    type:'button-icon',
    fixedWidth: 80,
    typeAttributes: {
        iconName:'utility:delete',
        name:'delete',
        title:'Delete Customer',
        alternativeText:'Delete',
        variant:'border-filled'
    }
}
];
export default class CommerceHubcListImperative extends LightningElement {

    searchParm='';
    customers=[];
     columns=COLUMNS;
     wiredCustomersResult;
     dealyTimeout;
     connectedCallback(){
        this.searchCustomers();
     }
    handleSearch(event){
            this.searchParm=event.target.value;
            console.log('search value is==',this.searchParm);
            clearTimeout(this.dealyTimeout);

            this.dealyTimeout = setTimeout(()=>{
                this.searchCustomers();
            },500);

    }
    searchCustomers(){
        getCustomerdataimp({ searchKey:this.searchParm})
        .then(result=>{
             this.customers=result.map(customer => {
            return{
               ...customer,displayName: customer.Gender__c === 'Male' ? `Mr. ${customer.Name} (${customer.Customer_Status__c})` 
 : `Mrs/Ms. ${customer.Name} (${customer.Customer_Status__c})`
            };
        });
        })
         .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'DELETION FAILED',
                    message: '',
                    variant: 'error'
                })
            );
        });
    }
    //Commented wire as function to show imperative data search functionality.
    /*@wire(getCustomerdata,{ searchKey:'$searchParm'}) 
    Wiredcustomers(result){
        this.wiredCustomersResult=result;
        const {data,error} = result;
        if(data){
        console.log('Length of data',data.length);
        this.customers=data.map(customer=>{
            return{
               ...customer,displayName: customer.Gender__c === 'Male' ? `Mr. ${customer.Name} (${customer.Customer_Status__c})` 
 : `Mrs/Ms. ${customer.Name} (${customer.Customer_Status__c})`
            };
        });
        // console.log('Customers records',Customers.length);
        }else{
            console.log('Error:',JSON.stringify(error));
        }
       
    }*/
    
    async handlerowaction(event){
         console.log('Delete method called');
         const actionName=event.detail.action.name;
         console.log('actionName is ==>',actionName);

         const row =event.detail.row;
         console.log('row is ==>',row);

         if(actionName=='delete'){
            const result=await LightningConfirm.open({
                message:'Are you sure you want delete the customer record',
                label:'',
                theme:'warning'
            });
            if(result){
                console.log('result ==>',result);
                this.deletecustomer(row.Id);
            }
         }
        }
 deletecustomer(customerId) {
    deletecustomer({ custId: customerId })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'DELETION SUCCESSFUL',
                    message: 'Customer Record Deleted Successfully',
                    variant: 'success'
                })
            );
            // Remove the deleted row from the table immediately
           this.customers = this.customers.filter(c => c.Id !== customerId);
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'DELETION FAILED',
                    message: error?.body?.message || 'Unknown error',
                    variant: 'error'
                })
            );
        });
}

}
