Ext.define('M.store.Customer-agentsales', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-agentsaleStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=agentsale&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});