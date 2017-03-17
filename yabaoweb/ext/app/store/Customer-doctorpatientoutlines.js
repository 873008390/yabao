Ext.define('M.store.Customer-doctorpatientoutlines', {

    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-doctorpatientoutlineStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=doctorpatientoutline&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});