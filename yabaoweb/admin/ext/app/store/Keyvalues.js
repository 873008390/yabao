Ext.define('M.store.Keyvalues', {
    extend: 'Ext.data.Store',
    model: 'M.model.Keyvalue',
    pageSize: 240,
    storeId:'keyStore',
    proxy : {  
        type : 'ajax',  
        url : '../admin/keyvaluelist.action?type=1',  
        reader : {  
            type : 'json',  
            root : 'keyvalues',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});