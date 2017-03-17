Ext.define('M.store.Stocks', {
    extend: 'Ext.data.Store',
    model: 'M.model.Stock',
    pageSize: 240,
    storeId:'stockStore',
    proxy : {  
        type : 'ajax',  
        url : 'outstock/list.action?idtype=stock&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'outstocks',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});