Ext.define('M.store.Relationships', {
    extend: 'Ext.data.Store',
    model: 'M.model.Relationship',
    pageSize: 24,
    storeId:'relationshipStore',
    proxy : {  
        type : 'ajax',  
        url : '../relationship/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'relationships',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});