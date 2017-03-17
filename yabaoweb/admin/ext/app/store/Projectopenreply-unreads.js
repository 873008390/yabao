Ext.define('M.store.Projectopenreply-unreads', {
    extend: 'Ext.data.Store',
    model: 'M.model.Projectopenreply',
    pageSize: 24,
    storeId:'projectopenreply-unreadStore',
    proxy : {  
        type : 'ajax',  
        url : '../projectopenreply/list.action?idtype=unread&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'projectopenreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});