Ext.define('M.store.Keyvalues-23', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-23',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=23',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});