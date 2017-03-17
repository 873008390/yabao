Ext.define('M.store.Customer-outstocks', {
    extend: 'Ext.data.Store',
    model: 'M.model.Customer',
    pageSize: 240,
    storeId:'customer-outstockStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype=outstock&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});