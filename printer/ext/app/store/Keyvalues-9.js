Ext.define('M.store.Keyvalues-9', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-9',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=9',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});