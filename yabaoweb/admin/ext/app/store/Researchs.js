Ext.define('M.store.Researchs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Research',
    pageSize: 24,
    storeId:'researchStore',
    proxy : {  
        type : 'ajax',  
        url : '../research/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'researchs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});