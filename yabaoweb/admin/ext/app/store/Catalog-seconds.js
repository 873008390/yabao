Ext.define('M.store.Catalog-seconds', {
    extend: 'Ext.data.Store',
    model: 'M.model.Catalog',
    pageSize: 240,
    storeId:'catalog-secondStore',
    proxy : {  
        type : 'ajax',  
        url : '../admin/catalog.action?type=allsecond_'+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'catalogs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});