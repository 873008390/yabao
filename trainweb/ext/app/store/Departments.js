Ext.define('M.store.Departments', {
    extend: 'Ext.data.Store',
    model: 'M.model.Department',
    pageSize: 15,
    storeId:'departmentStore',
    proxy : {  
        type : 'ajax',  
        url : 'department/list.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'departments',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});