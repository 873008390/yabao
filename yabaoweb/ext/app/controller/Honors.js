Ext.define('M.controller.Honors', {
    extend: 'Ext.app.Controller',

    stores: [
             'Honors'
         ],
    
    models: ['Honor'],
         
    views: [
            'honor.HonorList'
        ],
       
    init: function() {
    	this.control({
    		'honorlist actioncolumn[id=add]':{
              	click: this.addClick
            },
            'honorlist button[id=back]': {
                click: this.backClick
            }
        });
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
	 
	addClick: function(o, item, rowIndex, colIndex, e){
		store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		self.location = "honoradd.html?catalogid="+ store.getAt(rowIndex).get('catalogid');
    	}
	}
});