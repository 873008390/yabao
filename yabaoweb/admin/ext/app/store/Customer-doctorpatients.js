Ext.define('M.store.Customer-doctorpatients', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-doctorpatientStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=doctorpatient&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});