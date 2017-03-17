Ext.define('M.store.Keyvalues-22', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-22',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=22',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});