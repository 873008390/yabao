Ext.define('M.store.Towns', {
    extend: 'Ext.data.Store',
    model: 'M.model.Town',
    pageSize: 15,
    storeId:'townStore',
    proxy : {  
        type : 'ajax',  
        url : 'town/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'towns',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});