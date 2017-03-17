Ext.define('M.store.Newsreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Newsreply',
    pageSize: 24,
    storeId:'newsreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../newsreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'newsreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});