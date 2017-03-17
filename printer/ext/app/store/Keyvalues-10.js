Ext.define('M.store.Keyvalues-10', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-10',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=10',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});