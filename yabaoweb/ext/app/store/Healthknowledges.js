Ext.define('M.store.Healthknowledges', {
    extend: 'Ext.data.Store',
    model: 'M.model.Healthknowledge',
    pageSize: 240,
    storeId:'healthknowledgeStore',
    proxy : {  
        type : 'ajax',  
        url : 'healthknowledge/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'healthknowledges',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});