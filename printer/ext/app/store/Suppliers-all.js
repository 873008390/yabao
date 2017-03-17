Ext.define('M.store.Suppliers-all', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 240,
    storeId:'supplier-allStore',
    proxy : {  
        type : 'ajax',  
        url : 'supplier/list.action?idtype=allaudited&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});