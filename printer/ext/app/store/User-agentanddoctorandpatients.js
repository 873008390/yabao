Ext.define('M.store.User-agentanddoctorandpatients', {
    extend: 'Ext.data.Store',
    model: 'M.model.User',
    pageSize: 24,
    storeId:'user-agentanddoctorandpatientStore',
    proxy : {  
        type : 'ajax',  
        url : 'user/list.action?idtype=allagentanddoctorandpatient&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'users',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});