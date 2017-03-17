Ext.define('M.store.Customer-users', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-userStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=allwithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});