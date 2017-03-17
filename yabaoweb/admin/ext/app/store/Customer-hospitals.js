Ext.define('M.store.Customer-hospitals', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-hospitalStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=hospital&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});