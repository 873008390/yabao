Ext.define('M.store.Dangjianreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Dangjianreply',
    pageSize: 24,
    storeId:'dangjianreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../innerpublicationreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'innerpublicationreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});