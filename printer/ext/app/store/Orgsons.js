Ext.define('M.store.Orgsons', {
    extend: 'Ext.data.Store',
    model: 'M.model.Org',
    pageSize: 24,
    storeId:'orgsonStore',
    proxy : {  
        type : 'ajax',  
        url : 'org/list.action?idtype=son&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'orgs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});