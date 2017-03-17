Ext.define('M.store.Dangjians', {
    extend: 'Ext.data.Store',
    model: 'M.model.Dangjian',
    pageSize: 24,
    storeId:'dangjianStore',
    proxy : {  
        type : 'ajax',  
        url : '../innerpublication/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'innerpublications',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});