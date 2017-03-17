Ext.define('M.store.Relationshipreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Relationshipreply',
    pageSize: 24,
    storeId:'relationshipreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../relationshipreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'relationshipreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});