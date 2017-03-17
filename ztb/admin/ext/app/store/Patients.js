Ext.define('M.store.Patients', {
    extend: 'Ext.data.Store',
    model: 'M.model.Patient',
    pageSize: 34,
    storeId:'patientStore',
    proxy : {  
        type : 'ajax',  
        url : 'customer/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'customers',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});