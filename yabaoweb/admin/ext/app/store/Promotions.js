Ext.define('M.store.Promotions', {
    extend: 'Ext.data.Store',
    model: 'M.model.Promotion',
    pageSize: 240,
    storeId:'promotionStore',
    proxy : {  
        type : 'ajax',  
        url : 'promotion/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'promotions',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});