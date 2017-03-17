Ext.define('M.store.Suppliers-auditing', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 24,
    storeId:'supplier-auditingStore',
    proxy : {  
        type : 'ajax',  
        url : 'supplier/list.action?idtype=allauditingwithlimit&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});