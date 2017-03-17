Ext.define('M.store.User-promotionreaders', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-promotionreaderStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allpromotionwithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});