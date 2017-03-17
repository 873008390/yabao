Ext.define('M.store.Agents', {
    extend: 'Ext.data.Store',
    model: 'M.model.Agent',
    pageSize: 34,
    storeId:'agentStore',
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