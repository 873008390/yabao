Ext.define('M.store.Auditgroups', {
    extend: 'Ext.data.Store',
    model: 'M.model.Auditgroup',
    pageSize: 240,
    storeId:'auditgroupStore',
    proxy : {  
        type : 'ajax',  
        url : 'auditgroup/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'auditgroups',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});