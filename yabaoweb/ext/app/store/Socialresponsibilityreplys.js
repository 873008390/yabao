Ext.define('M.store.Socialresponsibilityreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Socialresponsibilityreply',
    pageSize: 24,
    storeId:'socialresponsibilityreplyStore',
    proxy : {  
        type : 'ajax',  
        url : '../socialresponsibilityreply/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'socialresponsibilityreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});