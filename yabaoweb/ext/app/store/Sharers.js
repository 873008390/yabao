Ext.define('M.store.Sharers', {
    extend: 'Ext.data.Store',
    model: 'M.model.Sharer',
    pageSize: 34,
    storeId:'sharerStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});