Ext.define('M.store.Activityreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Activityreply',
    pageSize: 24,
    storeId:'activityreplyStore',
    proxy : {  
        type : 'ajax',  
        url : 'activityreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'activityreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});