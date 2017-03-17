Ext.define('M.store.Keyvalues-1000', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-1000',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=1000',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});