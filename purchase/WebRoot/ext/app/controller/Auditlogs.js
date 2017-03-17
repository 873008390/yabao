Ext.define('M.controller.Auditlogs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Auditlogs'
         ],
    
    models: ['Supplier','Supplierfile', 'Auditlog'],
         
    views: [
            'supplier.SupplierList',
            'supplier.SupplierfileList',
            'supplier.AuditlogList'
        ],
       
    init: function() {
    	this.control({
            'auditloglist button[id=logback]':{
           	 	click: this.filebackClick
            }
            
        });
    },
    
    filebackClick: function(o){
    	history.back();
    }
});