Ext.define('M.store.Orgcenters-all', {
    extend: 'Ext.data.Store',
    model: 'M.model.Org',
    pageSize: 24,
    storeId:'orgcenter-allStore',
    proxy : {  
        type : 'ajax',  
        url : 'org/list.action?idtype=allcenter&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'orgs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});