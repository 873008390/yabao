Ext.define('M.store.Supplier-catalogs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplier',
    pageSize: 34,
    storeId:'supplier-catalogStore',
    proxy : {  
        type : 'ajax',  
        url : '../supplier/list.action?idtype=catalog&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'suppliers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});