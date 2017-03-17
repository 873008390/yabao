Ext.define('M.store.Users', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 15,
    storeId:'userStore',
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