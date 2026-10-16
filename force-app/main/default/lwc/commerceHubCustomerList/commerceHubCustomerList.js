import { LightningElement, wire } from 'lwc';
import getCustomerata from '@salesforce/apex/customerList.getCustomerata';

const COLUMNS=[
    {label:'Customer Name',fieldName:'displayName'},
    {label:'Customer Code',fieldName:'Customer_Code__c'},
    {label:'Customer Status',fieldName:'Customer_Status__c'},
    {label:'Gender',fieldName:'Gender__c'},
    {label:'Email',fieldName:'Email__c'},
    {label:'State',fieldName:'State__c'},
    {label:'City',fieldName:'City__c'},
];
export default class CommerceHubCustomerList extends LightningElement {

    searchParm='';
    customers=[];
     columns=COLUMNS;
    handleSearch(event){
            this.searchParm=event.target.value;
            console.log('search value is==',this.searchParm);
    }
    @wire(getCustomerata,{ searchKey:'$searchParm'}) 
    Wiredcustomers({data,error}){
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
       
    }
}