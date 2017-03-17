Ext.define('M.store.Keyvalues-13', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-13',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=13',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});