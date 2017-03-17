Ext.define('M.store.Auditlogs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Auditlog',
    pageSize: 240,
    storeId:'auditlogStore',
    proxy : {  
        type : 'ajax',  
        url : 'auditgroup/loglist.action?idtype=supplier&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'auditlogs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});