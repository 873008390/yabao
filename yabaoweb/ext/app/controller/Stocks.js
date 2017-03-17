Ext.define('M.controller.Stocks', {
    extend: 'Ext.app.Controller',

    stores: [
             'Stocks',
             'Stockdetails'
         ],
    
    models: [
             'Stock',
             'Stockdetail'
            ],
         
    views: [
            'stock.StockList',
            'stock.StockoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'stockoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('stockGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "outstock/detaillist.action?idtype=stock&typeid="+ store.getAt(rowIndex).get('customerid');
            downstore.load();
        }
    }
});