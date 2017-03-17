Ext.define('M.store.Auditflows', {
    extend: 'Ext.data.Store',
    model: 'M.model.Auditflow',
    pageSize: 240,
    storeId:'auditflowStore',
    proxy : {  
        type : 'ajax',  
        url : 'auditflow/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'auditflows',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});