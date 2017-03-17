Ext.define('M.store.Auditgroups-current', {
    extend: 'Ext.data.Store',
    model: 'M.model.Auditgroup',
    pageSize: 240,
    storeId:'auditgroup-currentStore',
    proxy : {  
        type : 'ajax',  
        url : 'auditgroup/list.action?idtype=all&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'auditgroups',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});