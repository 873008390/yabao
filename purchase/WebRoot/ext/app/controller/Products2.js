Ext.define('M.controller.Products2', {
    extend: 'Ext.app.Controller',

    stores: [
             'Products'
         ],
    
    models: [

             'Product'
            ],
         
    views: [

            'product.ProductList2'
        ],
       
    init: function() {
    	this.control({
            'productlist' : {
                itemdblclick: this.modifyClick
            },
            'productlist button[id=close]':{
                click: this.cClick
            },
            'productlist button[id=search]': {
                click: this.searchClick
            }
        });
    },
    cClick: function(o){
        window.parent.frames.close();
    },
    
    modifyClick: function(o){
        var grid = o.up('productlist');
        var model = grid.getSelectionModel();
        if(model.hasSelection()){
            var record = model.getLastSelected();
            if(record.get('id') == null || record.get('id') == ''){
                
            }else{
                window.parent.frames.getData2(record.get('productno'));
            }
        }else{
            alert("请选择供应商");
        }
    },
     
    searchClick: function(o){
        //alert(Ext.getCmp("keyword").getValue());
        var grid = o.up('productlist');
        var store = grid.getStore();
        store.getProxy().url = "product/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
        store.load();
     }
});