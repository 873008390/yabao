Ext.define('M.controller.Pointexchanges', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customers'
         ],
    
    models: ['Customer'],
         
    views: [
            'pointexchange.PointexchangeList',
            'pointexchange.PointexchangeoutlineList'
        ],
       
    init: function() {
        this.control({
            'pointexchangelist actioncolumn[id=information]':{
                click: this.informationClick
            },
            'pointexchangeoutlinelist button[id=back]':{
                click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
        self.location = 'doctorreportlist.html';
    }
});