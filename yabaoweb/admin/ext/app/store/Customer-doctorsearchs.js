Ext.define('M.store.Customer-doctorsearchs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-doctorsearchStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=doctorsearch&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});