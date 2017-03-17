Ext.define('M.store.Producttypes', {
    extend: 'Ext.data.Store',
    model: 'M.model.Producttype',
    pageSize: 240,
    storeId:'producttypeStore',
    proxy : {  
        type : 'ajax',  
        url : 'producttype/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'producttypes',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});