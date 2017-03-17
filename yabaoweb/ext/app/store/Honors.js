Ext.define('M.store.Honors', {
    extend: 'Ext.data.Store',
    model: 'M.model.Honor',
    pageSize: 34,
    storeId:'aboutStore',
    proxy : {  
        type : 'ajax',  
        url : '../about/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'abouts',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});