Ext.define('M.store.User-suppliers', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 34,
    storeId:'user-supplierStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allsupplier&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});