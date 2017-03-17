Ext.define('M.store.Instocks', {
    extend: 'Ext.data.Store',
    model: 'M.model.Instock',
    pageSize: 240,
    storeId:'instockStore',
    proxy : {  
        type : 'ajax',  
        url : 'instock/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'instocks',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});