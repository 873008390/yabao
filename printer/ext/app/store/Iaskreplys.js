Ext.define('M.store.Iaskreplys', {
    extend: 'Ext.data.Store',
    model: 'M.model.Iaskreply',
    pageSize: 240,
    storeId:'iaskreplyStore',
    proxy : {  
        type : 'ajax',  
        url : 'iaskreply/list.action?idtype=iask&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'iaskreplys',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});