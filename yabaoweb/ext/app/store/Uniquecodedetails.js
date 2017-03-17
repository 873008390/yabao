Ext.define('M.store.Uniquecodedetails', {
    extend: 'Ext.data.Store',
    model: 'M.model.Uniquecodedetail',
    pageSize: 24,
    storeId:'uniquecodedetailStore',
    proxy : {  
        type : 'ajax',  
        url : 'uniquecode/list.action?idtype=id&typeid=0',  
        reader : {  
            type : 'json',  
            root : 'uniquecodes',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
}); 