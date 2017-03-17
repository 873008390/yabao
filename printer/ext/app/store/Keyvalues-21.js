Ext.define('M.store.Keyvalues-21', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-21',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=21',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});