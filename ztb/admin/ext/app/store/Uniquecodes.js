Ext.define('M.store.Uniquecodes', {
    extend: 'Ext.data.Store',
    model: 'M.model.Uniquecode',
    pageSize: 24,
    storeId:'uniquecodeStore',
    proxy : {  
        type : 'ajax',  
        url : 'uniquecode/generatelist.action?idtype='+ getParameter("idtype") +'&typeid='+ getParameter("typeid"),  
        reader : {  
            type : 'json',  
            root : 'uniquecodegenerates',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
}); 