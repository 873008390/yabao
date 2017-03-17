Ext.define('M.store.Catalogs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Catalog',
    pageSize: 240,
    storeId:'catalogStore',
    proxy : {  
        type : 'ajax',  
        url : 'admin/catalog.action?type='+ getParameter("idtype"),  
        reader : {  
            type : 'json',  
            root : 'catalogs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});