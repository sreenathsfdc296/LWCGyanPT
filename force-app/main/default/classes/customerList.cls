public class customerList {
    //searchKey ='P';
    @AuraEnabled(Cacheable=true)
    public static list<Customer__c> getCustomerata(String searchKey){
        try {
            system.debug('getCustomerata+++++++searchKey'+searchKey);
            return [
                select Name,Address__c,City__c,State__c,Country__c,Customer_Code__c,
                Customer_Status__c,Date_of_Birth__c,Email__c,Gender__c from Customer__c 
                WHERE Name LIKE :('%' + searchKey + '%')
                ORDER By Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
     @AuraEnabled
    public static list<Customer__c> getCustomerdataimp(String searchKey){
        try {
            system.debug('getCustomerdata+++++++searchKey'+searchKey);
            return [
                select Name,Address__c,City__c,State__c,Country__c,Customer_Code__c,
                Customer_Status__c,Date_of_Birth__c,Email__c,Gender__c from Customer__c 
                WHERE Name LIKE :('%' + searchKey + '%')
                ORDER By Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   @AuraEnabled
   public static void deletecustomer(Id custId){
    try{
        DELETE [Select id from Customer__c where Id=:custId];
    }catch(Exception e){
         throw new AuraHandledException(e.getMessage()); 
    }
   }
}