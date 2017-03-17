var typeid = 0;
if(getParameter("typeid") == null || getParameter("typeid") == ''){
	typeid = getCookie("typeid");
}else{
	typeid = getParameter("typeid");
}
//alert(typeid);
Ext.define('M.store.Projects', {
    extend: 'Ext.data.Store',
    model: 'M.model.Project',
    pageSize: 24,
    storeId:'projectStore',
    proxy : {  
        type : 'ajax',  
        url : '../project/list.action?idtype='+ getParameter("idtype") +'&typeid='+ typeid,  
        reader : {  
            type : 'json',  
            root : 'projects',  
            idProperty: 'id',
            totalProperty : 'total'  
        }  
    },  
    autoLoad : true
});