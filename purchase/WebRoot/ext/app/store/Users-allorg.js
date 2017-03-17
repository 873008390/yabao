Ext.define('M.store.Users-allorg', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 34,
    storeId:'user-allorgStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allorg&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});