Ext.define('M.store.Keyvalues-16', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-16',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=16',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});