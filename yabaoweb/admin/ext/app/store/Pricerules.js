Ext.define('M.store.Pricerules', {
    extend: 'Ext.data.Store',
    model: 'M.model.Pricerule',
    pageSize: 24,
    storeId:'priceruleStore',
    proxy : {  
        type : 'ajax',  
        url : 'pricerule/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'pricerules',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
}); 