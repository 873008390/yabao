Ext.define('M.store.User-projectreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-projectreaderStore',
    proxy : {  
        type : 'ajax',  
        url : '../user/list.action?idtype=allprojectwithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});