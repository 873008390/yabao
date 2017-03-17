Ext.define('M.store.Activityreply-unreads', {
    extend: 'Ext.data.Store',
    model: 'M.model.Activityreply',
    pageSize: 24,
    storeId:'activityreply-unreadStore',
    proxy : {  
        type : 'ajax',  
        url : 'activityreply/list.action?idtype=unread&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'activityreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});