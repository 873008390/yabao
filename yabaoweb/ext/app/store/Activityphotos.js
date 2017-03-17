Ext.define('M.store.Activityphotos', {
    extend: 'Ext.data.Store',
    model: 'M.model.Activityphoto',
    pageSize: 24,
    storeId:'activityphotoStore',
    proxy : {  
        type : 'ajax',  
        url : 'activity/listphoto.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'activityphotos',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});