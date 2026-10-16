import { LightningElement } from 'lwc';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Product_Name__c';
import PROD_STATUS from '@salesforce/schema/Product__c.Product_Status__c';
import COST_PRICE from '@salesforce/schema/Product__c.Cost_Price__c';
import SELLING_PRICE from '@salesforce/schema/Product__c.Selling_Price__c';
import DESC_FIELD from '@salesforce/schema/Product__c.Description__c';
import CATEG_FIELD from '@salesforce/schema/Product__c.Category__c';
import UNIT_FIELD from '@salesforce/schema/Product__c.Unit__c';

import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CommerceHubAddproduct extends NavigationMixin(LightningElement) {
    showForm = false;
    showProductDetails=false;
    statusoptions=[
        {label:'Active',value:'Active'},
        {label:'Discontinued',value:'Discontinued'},
        {label:'Inactive',value:'Inactive'},
        {label:'Out of Stock',value:'Out of Stock'}
    ];
    Unitoptions=[
        {label:'Gram',value:'Gram'},
        {label:'Kg',value:'Kg'},
        {label:'Liter',value:'Liter'},
        {label:'Meter',value:'Meter'},
        {label:'Piece',value:'Piece'}
    ];
    productName='';
    Status='';
    Unit='';
    Costprice=null;
    Sellingprice=null;
    Description='';
    recordId;
    category='';

     createProduct(){
        console.log('createProduct button is clicked');
        this.showForm = true;
    }
    handleNavigate(){
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.recordId,
            actionName: 'view'
        }
    });
}
    handleChange(event){
         console.log('handleChange method is clicked');
         const field=event.target.name;//it will give the name of input field which the values has been entered
         this[field]=event.target.value;
    }
    handlecategorychange(event){
       
        this.category=event.detail.recordId;
         console.log('category ID  is clicked===>',this.category);
    }
    handleSaveProduct(){
         this.showProductDetails=false;
         console.log('handleSaveProduct method is clicked');
         const fields={};
         fields[NAME_FIELD.fieldApiName]=this.productName;
         fields[PROD_STATUS.fieldApiName]=this.Status;
         fields[COST_PRICE.fieldApiName]=this.Costprice;
         fields[SELLING_PRICE.fieldApiName]=this.Sellingprice;
         fields[DESC_FIELD.fieldApiName]=this.Description;
         fields[CATEG_FIELD.fieldApiName]=this.category;
         fields[UNIT_FIELD.fieldApiName]=this.Unit;

         const recordinput={
            apiName:PRODUCT_OBJECT.objectApiName,
            fields: fields
         };
         console.log('recordinput IS===>',JSON.stringify(recordinput))
         createRecord(recordinput)
         .then(result=>{
            this.showProductDetails=true;
            this.recordId=result.id; 
            console.log('created record ID is',this.recordId)
            this.showForm = false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Success',message:'Record Created Successfully',variant:'success'
                })
            );
         })
           .catch(error=> {
             this.dispatchEvent(
                new ShowToastEvent({
                    title:'ERROR',message:error.body? error.body.message:JSON.stringify(error)
                })
            );
            console.log('error==',error);
    });
    }  
    handleCancel(){
        console.log('handleCancel method is clicked');
            this.showForm = false;
    }
     hidecreateProduct(){
        console.log('handleCancel method is clicked');
            this.showForm = false;
    }
  
    
}