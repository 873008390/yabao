Ext.define('M.store.Purchasedetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Purchasedetail',
    pageSize: 34,
    storeId:'purchasedetailStore',
    proxy : {  
        type : 'ajax',  
        url : 'purchase/detaillist.action?idtype=mainid&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'purchasedetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});