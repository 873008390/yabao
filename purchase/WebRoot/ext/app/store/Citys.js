Ext.define('M.store.Citys', {
    extend: 'Ext.data.Store',
    model: 'M.model.City',
    pageSize: 15,
    storeId:'cityStore',
    proxy : {  
        type : 'ajax',  
        url : 'city/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'citys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});