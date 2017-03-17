Ext.define('M.store.Productspecs', {
    extend: 'Ext.data.Store',
    model: 'M.model.Productspec',
    pageSize: 240,
    storeId:'productspecStore',
    proxy : {  
        type : 'ajax',  
        url : 'productspec/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'productspecs',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});