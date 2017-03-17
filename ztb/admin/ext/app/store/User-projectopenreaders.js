Ext.define('M.store.User-projectopenreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-projectopenreaderStore',
    proxy : {  
        type : 'ajax',  
        url : '../user/list.action?idtype=allprojectopenwithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});