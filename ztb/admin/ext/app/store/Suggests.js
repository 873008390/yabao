Ext.define('M.store.Suggests', {
    extend: 'Ext.data.Store',
    model: 'M.model.Suggest',
    pageSize: 34,
    storeId:'suggestStore',
    proxy : {  
        type : 'ajax',  
        url : '../suggest/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'suggests',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});