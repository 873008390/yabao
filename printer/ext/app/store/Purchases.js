Ext.define('M.store.Purchases', {
    extend: 'Ext.data.Store',
    model: 'M.model.Purchase',
    pageSize: 34,
    storeId:'purchaseStore',
    proxy : {  
        type : 'ajax',  
        url : 'purchase/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'purchases',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});