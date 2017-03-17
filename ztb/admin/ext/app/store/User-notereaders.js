Ext.define('M.store.User-notereaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-notereaderStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allnotewithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});