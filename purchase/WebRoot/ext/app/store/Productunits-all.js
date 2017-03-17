Ext.define('M.store.Productunits-all', {
    extend: 'Ext.data.Store',
    model: 'M.model.Productunit',
    pageSize: 240,
    storeId:'productunit-allStore',
    proxy : {  
        type : 'ajax',  
        url : 'productunit/list.action?idtype=all&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'productunits',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});