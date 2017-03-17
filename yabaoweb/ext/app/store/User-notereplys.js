Ext.define('M.store.User-notereplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-notereplyStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=notereply&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});