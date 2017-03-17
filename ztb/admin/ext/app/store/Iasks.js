Ext.define('M.store.Iasks', {
    extend: 'Ext.data.Store',
    model: 'M.model.Iask',
    pageSize: 240,
    storeId:'iaskStore',
    proxy : {  
        type : 'ajax',  
        url : 'iask/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'iasks',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});