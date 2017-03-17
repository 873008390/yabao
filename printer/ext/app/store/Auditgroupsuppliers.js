Ext.define('M.store.Auditgroupsuppliers', {
    extend: 'Ext.data.Store',
    model: 'M.model.Auditgroupsupplier',
    pageSize: 240,
    storeId:'auditgroupsupplierStore',
    proxy : {  
        type : 'ajax',  
        url : 'auditgroup/detaillist.action?idtype=mainid&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'auditgroupdetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});