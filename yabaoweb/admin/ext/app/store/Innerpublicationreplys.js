Ext.define('M.store.Innerpublicationreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Innerpublicationreply',
    pageSize: 24,
    storeId:'innerpublicationreplyStore',
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