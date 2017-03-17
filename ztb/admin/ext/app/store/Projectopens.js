Ext.define('M.store.Projectopens', {
    extend: 'Ext.data.Store',
    model: 'M.model.Projectopen',
    pageSize: 24,
    storeId:'projectopenStore',
    proxy : {  
        type : 'ajax',  
        url : '../projectopen/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'projectopens',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});