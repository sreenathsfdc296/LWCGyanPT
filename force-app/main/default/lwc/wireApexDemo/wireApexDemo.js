import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts';
export default class WireApexDemo extends LightningElement {

    @api recordId;
    @wire(getContacts, { accid: '$recordId' })
    contacts;
}