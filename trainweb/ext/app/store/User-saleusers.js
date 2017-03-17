Ext.define('M.store.User-saleusers', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-saleuserStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=saleuser&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});