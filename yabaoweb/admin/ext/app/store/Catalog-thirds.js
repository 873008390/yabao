Ext.define('M.store.Catalog-thirds', {
    extend: 'Ext.data.Store',
    model: 'M.model.Catalog',
    pageSize: 240,
    storeId:'catalog-thirdStore',
    proxy : {  
        type : 'ajax',  
        url : '../admin/catalog.action?type=allthird_'+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'catalogs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});