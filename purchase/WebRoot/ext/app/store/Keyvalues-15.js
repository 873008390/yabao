Ext.define('M.store.Keyvalues-15', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-15',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=15',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});