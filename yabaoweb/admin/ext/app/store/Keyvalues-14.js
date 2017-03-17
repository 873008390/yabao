Ext.define('M.store.Keyvalues-14', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-14',
    proxy : {  
        type : 'ajax',  
        url : 'admin/keyvaluelist.action?type=14',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});