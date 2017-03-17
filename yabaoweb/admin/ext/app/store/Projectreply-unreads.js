Ext.define('M.store.Projectreply-unreads', {
    extend: 'Ext.data.Store',
    model: 'M.model.Projectreply',
    pageSize: 24,
    storeId:'projectreply-unreadStore',
    proxy : {  
        type : 'ajax',  
        url : '../projectreply/list.action?idtype=unread&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'projectreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});