Ext.define('M.store.Overseas', {
    extend: 'Ext.data.Store',
    model: 'M.model.Oversea',
    pageSize: 24,
    storeId:'overseaStore',
    proxy : {  
        type : 'ajax',  
        url : '../oversea/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'overseas',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});