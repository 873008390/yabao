Ext.define('M.store.Keyvalues-7', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-7',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=7',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});