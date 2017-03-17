Ext.define('M.store.Keyvalues-12', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore-12',
    proxy : {  
        type : 'ajax',  
        url : '../admin/keyvaluelist.action?type=12',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});