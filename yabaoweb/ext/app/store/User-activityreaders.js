Ext.define('M.store.User-activityreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-activityreaderStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allactivitywithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});