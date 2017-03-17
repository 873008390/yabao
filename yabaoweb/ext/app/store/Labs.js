Ext.define('M.store.Labs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Lab',
    pageSize: 24,
    storeId:'labStore',
    proxy : {  
        type : 'ajax',  
        url : '../lab/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'labs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});