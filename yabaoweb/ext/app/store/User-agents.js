Ext.define('M.store.User-agents', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 34,
    storeId:'user-agentStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allagent&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});