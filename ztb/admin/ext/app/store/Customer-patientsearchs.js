Ext.define('M.store.Customer-patientsearchs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-patientsearchStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=patientsearch&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});