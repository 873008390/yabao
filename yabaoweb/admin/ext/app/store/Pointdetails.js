Ext.define('M.store.Pointdetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Pointdetail',
    pageSize: 24,
    storeId:'pointdetailStore',
    proxy : {  
        type : 'ajax',  
        url : 'pointdetail/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'pointdetails',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});