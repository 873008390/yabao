Ext.define('M.store.Sales', {
    extend: 'Ext.data.Store',
    model: 'M.model.Sale',
    pageSize: 240,
    storeId:'saleStore',
    proxy : {  
        type : 'ajax',  
        url : 'sale/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'sales',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});