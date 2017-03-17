Ext.define('M.store.User-doctors', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-doctorStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=alldoctor&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});