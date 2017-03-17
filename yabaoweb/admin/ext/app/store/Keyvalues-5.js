Ext.define('M.store.Keyvalues-5', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-5',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=5',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});