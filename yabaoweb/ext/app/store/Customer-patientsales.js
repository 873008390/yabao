Ext.define('M.store.Customer-patientsales', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-patientsaleStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=patientsale&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});