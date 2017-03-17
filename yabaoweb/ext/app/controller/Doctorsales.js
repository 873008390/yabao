Ext.define('M.controller.Doctorsales', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customer-doctorsearchoutlines',
             'Sales'
         ],
    
    models: [
             'Customer',
             'Sale'
            ],
         
    views: [
            'doctorsale.DoctorsaleList',
            'doctorsale.DoctorsaleoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'doctorsaleoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'doctorsaleoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		var downgrid = Ext.getCmp('doctorsaleGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "sale/list.action?idtype=doctorsale&typeid="+ store.getAt(rowIndex).get('zdy3') +"_"+ store.getAt(rowIndex).get('zdy4') +"_"+ store.getAt(rowIndex).get('zdy5');
			downstore.load();
    	}
    },
    
    backClick: function(o){
    	self.location = 'doctorreportlist.html';
    }
});