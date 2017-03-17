Ext.define('M.store.Growups', {
    extend: 'Ext.data.Store',
    model: 'M.model.Growup',
    pageSize: 34,
    storeId:'aboutStore',
    proxy : {  
        type : 'ajax',  
        url : '../about/list.action?idtype=growup&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'abouts',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});