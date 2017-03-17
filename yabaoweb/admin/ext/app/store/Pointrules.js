Ext.define('M.store.Pointrules', {
    extend: 'Ext.data.Store',
    model: 'M.model.Pointrule',
    pageSize: 24,
    storeId:'pointruleStore',
    proxy : {  
        type : 'ajax',  
        url : 'pointrule/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'pointrules',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});