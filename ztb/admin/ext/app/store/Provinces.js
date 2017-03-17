Ext.define('M.store.Provinces', {
    extend: 'Ext.data.Store',
    model: 'M.model.Province',
    pageSize: 240,
    storeId:'provinceStore',
    proxy : {  
        type : 'ajax',  
        url : 'province/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'provinces',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});