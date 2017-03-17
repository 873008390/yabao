Ext.define('M.store.Healthknowledge-reads', {
    extend: 'Ext.data.Store',
    model: 'M.model.Healthknowledge',
    pageSize: 240,
    storeId:'healthknowledge-readStore',
    proxy : {  
        type : 'ajax',  
        url : 'healthknowledge/list.action?idtype=read&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'healthknowledges',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});