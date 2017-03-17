Ext.define('M.store.Products-all', {
    extend: 'Ext.data.Store',
    model: 'M.model.Product',
    pageSize: 15,
    storeId:'product-allStore',
    proxy : {  
        type : 'ajax',  
        url : 'product/list.action?idtype=all&typeid=query',  
        reader : {  
            type : 'json',  
            root : 'products',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});