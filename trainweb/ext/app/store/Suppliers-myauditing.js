Ext.define('M.store.Suppliers-myauditing', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 24,
    storeId:'supplier-myauditingStore',
    proxy : {  
        type : 'ajax',  
        url : 'supplier/list.action?idtype=allmyauditingwithlimit&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});