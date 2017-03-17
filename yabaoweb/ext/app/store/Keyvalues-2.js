Ext.define('M.store.Keyvalues-2', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-2',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=2',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});