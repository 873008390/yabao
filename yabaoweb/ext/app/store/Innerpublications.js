Ext.define('M.store.Innerpublications', {
    extend: 'Ext.data.Store',
    model: 'M.model.Innerpublication',
    pageSize: 24,
    storeId:'innerpublicationStore',
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