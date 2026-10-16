import { LightningElement,wire} from 'lwc';
import getProducts from '@salesforce/apex/Fetchproductdetailswire.getProducts';
const COLUMNS=[
    {label:'Product Name',fieldName:'Product_Name__c'},
    {label:'Category',fieldName:'Category__c'},
    {label:'product Status',fieldName:'Product_Status__c'},
    {label:'Selling Price',fieldName:'Selling_Price__c'},
];
export default class CommerceHubProductList extends LightningElement {

    columns=COLUMNS;
    @wire(getProducts) products;  //Wire as property 

    //products - Result 
    // result - Data,error
}