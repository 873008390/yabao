Ext.define('M.store.Users-all', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 34,
    storeId:'user-allStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=all&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});