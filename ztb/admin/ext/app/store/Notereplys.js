Ext.define('M.store.Notereplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Notereply',
    pageSize: 240,
    storeId:'notereplyStore',
    proxy : {  
        type : 'ajax',  
        url : 'notereply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'notereplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});