Ext.define('M.store.Keyvalues-17', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-17',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=17',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});