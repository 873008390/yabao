Ext.define('M.store.Labreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Labreply',
    pageSize: 24,
    storeId:'labreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../labreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'labreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});