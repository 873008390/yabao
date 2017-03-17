Ext.define('M.store.User-healthknowledgereaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-healthknowledgereaderStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allhealthknowledgewithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});