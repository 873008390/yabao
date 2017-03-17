Ext.define('M.store.Orggroups', {
    extend: 'Ext.data.Store',
    model: 'M.model.Org',
    pageSize: 24,
    storeId:'orggroupStore',
    proxy : {  
        type : 'ajax',  
        url : 'org/list.action?idtype='+ getParameter("idtype") +'&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'orgs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});