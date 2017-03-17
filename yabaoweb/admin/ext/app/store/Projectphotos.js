Ext.define('M.store.Projectphotos', {
    extend: 'Ext.data.Store',
    model: 'M.model.Projectreply',
    pageSize: 24,
    storeId:'projectphotoStore',
    proxy : {  
        type : 'ajax',  
        url : '../projectreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'projectreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});