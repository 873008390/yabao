Ext.define('M.store.Helpfiles', {
    extend: 'Ext.data.Store',
    model: 'M.model.Helpfile',
    pageSize: 34,
    storeId:'helpfileStore',
    proxy : {  
        type : 'ajax',  
        url : '../helpfile/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'helpfiles',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});