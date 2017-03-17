Ext.define('M.store.Activitys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Activity',
    pageSize: 24,
    storeId:'activityStore',
    proxy : {  
        type : 'ajax',  
        url : 'activity/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'activitys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});