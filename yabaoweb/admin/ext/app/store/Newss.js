Ext.define('M.store.Newss', {
    extend: 'Ext.data.Store',
    model: 'M.model.News',
    pageSize: 24,
    storeId:'newsStore',
    proxy : {  
        type : 'ajax',  
        url : '../news/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'newss',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});