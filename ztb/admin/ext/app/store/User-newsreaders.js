Ext.define('M.store.User-newsreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-newsreaderStore',
    proxy : {  
        type : 'ajax',  
        url : '../user/list.action?idtype=allnewswithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});