Ext.define('M.store.Keyvalues-3', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-3',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=3',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});