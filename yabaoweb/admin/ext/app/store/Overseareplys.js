Ext.define('M.store.Overseareplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Overseareply',
    pageSize: 24,
    storeId:'overseareplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../overseareply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'overseareplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});