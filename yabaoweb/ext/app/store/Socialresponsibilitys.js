Ext.define('M.store.Socialresponsibilitys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Socialresponsibility',
    pageSize: 24,
    storeId:'socialresponsibilityStore',
    proxy : {  
        type : 'ajax',  
        url : '../socialresponsibility/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'socialresponsibilitys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});