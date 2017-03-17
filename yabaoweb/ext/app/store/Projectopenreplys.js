Ext.define('M.store.Projectopenreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Projectopenreply',
    pageSize: 24,
    storeId:'projectopenreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../projectopenreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'projectopenreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});