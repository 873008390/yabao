Ext.define('M.store.Supplierfiles', {
    extend: 'Ext.data.Store',
    model: 'M.model.Supplierfile',
    pageSize: 34,
    storeId:'supplierfileStore',
    proxy : {  
        type : 'ajax',  
        url : '../supplier/listfile.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'supplierfiles',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});