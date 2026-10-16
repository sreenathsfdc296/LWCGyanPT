import { LightningElement } from 'lwc';

export default class NotificationPannel extends LightningElement {

    unreadCount=4;
    handleMarkRead(){
        console.log('handleMarkRead buttom is clicked');
        const notificationEvent=new CustomEvent(
            'markread',{
                detail:this.unreadCount
            }
        );
        this.dispatchEvent(notificationEvent);
    }
}