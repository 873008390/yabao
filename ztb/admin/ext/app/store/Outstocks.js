Ext.define('M.store.Outstocks', {
    extend: 'Ext.data.Store',
    model: 'M.model.Outstock',
    pageSize: 240,
    storeId:'outstockStore',
    proxy : {  
        type : 'ajax',  
        url : 'outstock/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'outstocks',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});