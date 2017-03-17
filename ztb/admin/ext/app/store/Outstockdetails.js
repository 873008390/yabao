Ext.define('M.store.Outstockdetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Outstockdetail',
    pageSize: 240,
    storeId:'outstockdetailStore',
    proxy : {  
        type : 'ajax',  
        url : 'outstock/detaillist.action?idtype=mainid&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'outstockdetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});