Ext.define('M.store.Notes', {
    extend: 'Ext.data.Store',
    model: 'M.model.Note',
    pageSize: 240,
    storeId:'noteStore',
    proxy : {  
        type : 'ajax',  
        url : 'note/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'notes',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});