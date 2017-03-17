Ext.define('M.controller.Pointsearchs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Points'
         ],
    
    models: ['Point'],
         
    views: [
            'pointsearch.PointsearchList'
        ],
       
    init: function() {
    	this.control({
    		'pointsearchlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'pointsearchlist button[id=add]':{
              	click: this.addClick
               },
            'pointsearchlist button[id=save]': {
                click: this.updatePointsearch
            }
        });
    }
});