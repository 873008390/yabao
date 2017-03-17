Ext.define('M.store.Pointpresents', {
    extend: 'Ext.data.Store',
    model: 'M.model.Pointpresent',
    pageSize: 24,
    storeId:'pointpresentStore',
    proxy : {  
        type : 'ajax',  
        url : 'pointpresent/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'pointpresents',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});