Ext.define('M.store.Supplier-users', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 240,
    storeId:'supplier-userStore',
    proxy : {  
        type : 'ajax',  
        url : 'supplier/list.action?idtype=allwithlimit&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});