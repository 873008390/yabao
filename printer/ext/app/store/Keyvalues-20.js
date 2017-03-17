Ext.define('M.store.Keyvalues-20', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-20',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=20',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});