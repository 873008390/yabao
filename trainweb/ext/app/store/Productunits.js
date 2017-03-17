Ext.define('M.store.Productunits', {
    extend: 'Ext.data.Store',
    model: 'M.model.Productunit',
    pageSize: 240,
    storeId:'productunitStore',
    proxy : {  
        type : 'ajax',  
        url : 'productunit/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'productunits',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});