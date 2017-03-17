Ext.define('M.controller.Doctorsearchs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customer-doctorsearchoutlines',
             'Customer-doctorsearchs'
         ],
    
    models: ['Customer'],
         
    views: [
            'doctorsearch.DoctorsearchList',
            'doctorsearch.DoctoroutlineList'
        ],
       
    init: function() {
    	this.control({
    		'doctoroutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'doctoroutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		var downgrid = Ext.getCmp('doctorGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "customer/list.action?idtype=doctorsearch&typeid="+ store.getAt(rowIndex).get('zdy3') +"_"+ store.getAt(rowIndex).get('zdy4') +"_"+ store.getAt(rowIndex).get('zdy5');
			downstore.load();
    	}
    },
    
    backClick: function(o){
    	self.location = 'doctorreportlist.html';
    }
});