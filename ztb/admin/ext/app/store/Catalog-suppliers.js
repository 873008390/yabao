Ext.define('M.store.Catalog-suppliers', {
    extend: 'Ext.data.Store',
    model: 'M.model.Catalog',
    pageSize: 240,
    storeId:'catalog-supplierStore',
    proxy : {  
        type : 'ajax',  
        url : '../admin/catalog.action?type=allsupplier_1',  
        reader : {  
            type : 'json',  
            root : 'catalogs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});