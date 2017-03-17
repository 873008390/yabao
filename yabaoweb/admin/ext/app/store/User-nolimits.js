Ext.define('M.store.User-nolimits', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24000,
    storeId:'user-nolimitStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});