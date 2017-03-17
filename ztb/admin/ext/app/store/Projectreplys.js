Ext.define('M.store.Projectreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Projectreply',
    pageSize: 24,
    storeId:'projectreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../projectreply/list.action?idtype=projectwithlimit&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'projectreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});