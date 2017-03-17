Ext.define('M.store.Stockdetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Stockdetail',
    pageSize: 240,
    storeId:'stockdetailStore',
    proxy : {  
        type : 'ajax',  
        url : 'outstock/detaillist.action?idtype=stock&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'outstockdetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});