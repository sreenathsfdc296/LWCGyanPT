import { LightningElement } from 'lwc';

export default class ReadNotificationsonparent extends LightningElement {

    unreadCount=5;
    handleMarkRead(event){
        this.unreadCount=event.detail;
    }
}