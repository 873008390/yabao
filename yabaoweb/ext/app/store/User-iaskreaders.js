Ext.define('M.store.User-iaskreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-iaskreaderStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=alliaskwithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});