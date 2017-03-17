Ext.define('M.store.User-agentanddoctors', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-agentanddoctorStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allagentanddoctor&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});