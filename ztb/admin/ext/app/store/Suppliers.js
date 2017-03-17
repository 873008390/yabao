Ext.define('M.store.Suppliers', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 34,
    storeId:'supplierStore',
    proxy : {  
        type : 'ajax',  
        url : '../supplier/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});