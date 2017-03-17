Ext.define('M.store.Newsreply-unreads', {
    extend: 'Ext.data.Store',
    model: 'M.model.Newsreply',
    pageSize: 24,
    storeId:'newsreply-unreadStore',
    proxy : {  
        type : 'ajax',  
        url : '../newsreply/list.action?idtype=unread&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'newsreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});