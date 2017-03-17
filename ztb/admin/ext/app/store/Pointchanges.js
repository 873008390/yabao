Ext.define('M.store.Pointchanges', {
    extend: 'Ext.data.Store',
    model: 'M.model.Pointchange',
    pageSize: 24,
    storeId:'pointchangeStore',
    proxy : {  
        type : 'ajax',  
        url : 'pointchange/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'pointchanges',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});