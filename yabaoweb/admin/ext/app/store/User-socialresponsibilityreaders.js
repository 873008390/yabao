Ext.define('M.store.User-socialresponsibilityreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-socialresponsibilityreaderStore',
    proxy : {  
        type : 'ajax',  
        url : '../user/list.action?idtype=allsocialresponsibilitywithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});