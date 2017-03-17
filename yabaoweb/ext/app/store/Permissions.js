Ext.define('M.store.Permissions', {
    extend: 'Ext.data.Store',
    model: 'M.model.Permission',
    pageSize: 240,
    storeId:'permissionStore',
    proxy : {  
        type : 'ajax',  
        url : 'admin/permissionlist.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'permissions',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});