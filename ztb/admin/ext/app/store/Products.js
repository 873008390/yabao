Ext.define('M.store.Products', {
    extend: 'Ext.data.Store',
    model: 'M.model.Product',
    pageSize: 240,
    storeId:'productStore',
    proxy : {  
        type : 'ajax',  
        url : 'product/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'products',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});