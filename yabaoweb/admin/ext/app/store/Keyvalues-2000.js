Ext.define('M.store.Keyvalues-2000', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-2000',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=2000',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});