Ext.define('M.store.Keyvalues-6', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-6',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=6',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});