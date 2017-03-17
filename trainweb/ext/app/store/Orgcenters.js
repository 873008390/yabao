Ext.define('M.store.Orgcenters', {
    extend: 'Ext.data.Store',
    model: 'M.model.Org',
    pageSize: 15,
    storeId:'orgcenterStore',
    proxy : {  
        type : 'ajax',  
        url : 'org/list.action?idtype=center&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'orgs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});