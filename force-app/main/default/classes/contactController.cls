public with sharing class contactController {
    //test controller
    @AuraEnabled(cacheable=true)
    public static list<contact> getContacts(string accid){
        try {
            return[
                select AccountId,id,FirstName,LastName
                FROM contact where AccountId=: accid
                WITH USER_MODE
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}