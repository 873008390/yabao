Ext.define('M.controller.Humans', {
    extend: 'Ext.app.Controller',

    stores: [
             'Humans'
         ],
    
    models: ['Human'],
         
    views: [
            'human.HumanList'
        ],
       
    init: function() {
    	this.control({
    		'humanlist actioncolumn[id=add]':{
              	click: this.addClick
            },
            'humanlist button[id=back]': {
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
    		self.location = "humanadd.html?catalogid="+ store.getAt(rowIndex).get('catalogid');
    	}
	}
});