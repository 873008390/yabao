Ext.define('M.store.Saledetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Saledetail',
    pageSize: 240,
    storeId:'saleStore',
    proxy : {  
        type : 'ajax',  
        url : 'sale/detaillist.action?idtype=mainid&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'saledetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});