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
                 title:'��ܰ��ʾ',
                 msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('title') +' ��',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("���ݴ����У����Ե�");
                         var result = "";
                         Ext.Ajax.request({
                                url: '../product/delete.action?productid='+ store.getAt(rowIndex).get('id'),
                                method: 'GET',
                                timeout: 4000,
                                success: function(response,opts){
                                    var result = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("��ܰ��ʾ",result.result);
                                    if(result.result == "ɾ���ɹ�"){
                                        store.removeAt(rowIndex);
                                    }
                                    Ext.getBody().unmask();
                                },
                                failure: function(response,opts){
                                    var result = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert("��ܰ��ʾ",result.result);
                                    Ext.getBody().unmask();
                                }
                         });     
                     }
                 }
            });
        }
    }
});