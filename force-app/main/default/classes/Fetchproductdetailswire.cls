//Written by Sreenath
public class Fetchproductdetailswire {
    @AuraEnabled(Cacheable=true)
    public static List<Product__c> getProducts() {
        List<Product__c> lstProduct = new List<Product__c>();
        
        try {
            lstProduct = [
                SELECT Id, Product_Name__c, Category__c,Category__r.name, Unit__c,Product_Status__c, Selling_Price__c 
                FROM Product__c
            ];
        } catch (QueryException qe) {
            System.debug('Error retrieving products: ' + qe.getMessage());
        }
        
        return lstProduct;
    }
}