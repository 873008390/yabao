Ext.define('M.store.Keyvalues-4', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-4',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=4',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});