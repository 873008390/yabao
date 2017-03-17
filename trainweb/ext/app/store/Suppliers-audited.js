Ext.define('M.store.Suppliers-audited', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 24,
    storeId:'supplier-auditedStore',
    proxy : {  
        type : 'ajax',  
        url : 'supplier/list.action?idtype=allauditedwithlimit&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});