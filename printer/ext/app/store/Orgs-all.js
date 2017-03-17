Ext.define('M.store.Orgs-all', {
    extend: 'Ext.data.Store',
    model: 'M.model.Org',
    pageSize: 24,
    storeId:'orggroup-allStore',
    proxy : {  
        type : 'ajax',  
        url : 'org/list.action?idtype=all&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'orgs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});