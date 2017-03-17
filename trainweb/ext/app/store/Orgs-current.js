Ext.define('M.store.Orgs-current', {
    extend: 'Ext.data.Store',
    model: 'M.model.Org',
    pageSize: 24,
    storeId:'orgs-currentStore',
    proxy : {  
        type : 'ajax',  
        url : 'org/list.action?idtype=current&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'orgs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});