Ext.define('M.store.Researchreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Researchreply',
    pageSize: 24,
    storeId:'researchreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../researchreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'researchreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});