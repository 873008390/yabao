Ext.define('M.controller.Products', {
    extend: 'Ext.app.Controller',

    stores: [
             'Products'
         ],
    
    models: ['Product'],
         
    views: [
            'product.ProductList'
        ],
       
    init: function() {
    	this.control({
    		'productlist actioncolumn[id=addcontent]':{
              	click: this.addcontentClick
            },
            'productlist actioncolumn[id=delete]':{
              	click: this.deleteClick
            },
            'productlist button[id=back]': {
                click: this.backClick
            },
            'productlist button[id=add]':{
                click: this.addClick
            }
        });
    },
    
    backClick: function(o){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
	 
	addcontentClick: function(o, item, rowIndex, colIndex, e){
		store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		self.location = "productadd.html?id="+ store.getAt(rowIndex).get('id');
    	}
	},
	 
	addClick: function(o){
		var grid = o.up('productlist');
		var store = grid.getStore();
		self.location = "productadd.html?id=0&catalogid="+ getParameter("typeid");
	},
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'温馨提示',
                 msg: '确定要删除：'+ store.getAt(rowIndex).get('title') +' ？',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'确定',cancel: '取消'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("数据处理中，请稍等");
                         var result = "";
                         Ext.Ajax.request({
                                url: '../product/delete.action?productid='+ store.getAt(rowIndex).get('id'),
                                method: 'GET',
                                timeout: 4000,
                                success: function(response,opts){
                                    var result = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("温馨提示",result.result);
                                    if(result.result == "删除成功"){
                                        store.removeAt(rowIndex);
                                    }
                                    Ext.getBody().unmask();
                                },
                                failure: function(response,opts){
                                    var result = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("温馨提示",result.result);
                                    Ext.getBody().unmask();
                                }
                         });     
                     }
                 }
            });
        }
    }
});