Ext.define('M.store.Auditgroupusers', {
    extend: 'Ext.data.Store',
    model: 'M.model.Auditgroupuser',
    pageSize: 240,
    storeId:'auditgroupuserStore',
    proxy : {  
        type : 'ajax',  
        url : 'auditgroup/userlist.action?idtype=mainid&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'auditgroupusers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});