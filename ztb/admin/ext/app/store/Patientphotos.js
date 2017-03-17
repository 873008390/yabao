Ext.define('M.store.Patientphotos', {
    extend: 'Ext.data.Store',
    model: 'M.model.Patientphoto',
    pageSize: 24,
    storeId:'patientphotoStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/listphoto.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customerphotos',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});