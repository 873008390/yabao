Ext.define('M.controller.Doctorpatients', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customer-doctorpatients',
             'Customer-doctorpatientoutlines'
         ],
    
    models: ['Customer'],
         
    views: [
            'doctorpatient.DoctorpatientList',
            'doctorpatient.DoctorpatientoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'doctorpatientoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'doctorpatientoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		var downgrid = Ext.getCmp('doctorpatientGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "customer/list.action?idtype=doctorpatient&typeid="+ store.getAt(rowIndex).get('zdy3') +"_"+ store.getAt(rowIndex).get('zdy4') +"_"+ store.getAt(rowIndex).get('zdy5') +"_"+ store.getAt(rowIndex).get('zdy6');
			downstore.load();
    	}
    },
    
    backClick: function(o){
    	self.location = 'doctorreportlist.html';
    }
});