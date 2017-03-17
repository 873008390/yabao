Ext.define('M.store.Instockdetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Instockdetail',
    pageSize: 240,
    storeId:'instockStore',
    proxy : {  
        type : 'ajax',  
        url : 'instock/detaillist.action?idtype=mainid&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'instockdetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});