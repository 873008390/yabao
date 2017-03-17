Ext.define('M.store.Contactuss', {
    extend: 'Ext.data.Store',
    model: 'M.model.Contactus',
    pageSize: 34,
    storeId:'contactusStore',
    proxy : {  
        type : 'ajax',  
        url : '../contact/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'contacts',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});