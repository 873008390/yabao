Ext.define('M.store.Keyvalues-19', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-19',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=19',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});