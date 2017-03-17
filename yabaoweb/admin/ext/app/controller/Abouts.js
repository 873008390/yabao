Ext.define('M.controller.Abouts', {
    extend: 'Ext.app.Controller',

    stores: [
             'Abouts'
         ],
    
    models: ['About'],
         
    views: [
            'about.AboutList'
        ],
       
    init: function() {
    	this.control({
    		'aboutlist actioncolumn[id=add]':{
              	click: this.addClick
            },
            'aboutlist button[id=back]': {
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
    		self.location = "aboutadd.html?catalogid="+ store.getAt(rowIndex).get('catalogid');
    	}
	}
});