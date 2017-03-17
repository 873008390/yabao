Ext.define('M.store.Customer-doctorsearchoutlines', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-doctorsearchoutlineStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=doctorsearchoutline&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});