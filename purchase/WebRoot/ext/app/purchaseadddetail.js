Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Purchases'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
                header: false,
        	    bodyStyle: 'padding:0px'
        	},
        	items: [
        	   {
        	    title: '�ɹ�����ϸ',
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'purchaseadddetaillist'
        	}]
        });
    }
});

function getData(){
	var grid = Ext.getCmp("purchaseadddetailGrid");
	var store = grid.getStore();
	var records = store.getNewRecords();
	var records1 = store.getUpdatedRecords();
	
	records = records.concat(records1);
	var data = [];
    var isok = 1;
    var err = "";
    Ext.Array.each(records, function(model){
        if(model.get('zdy2') == '' || model.get('zdy2') == null){
            isok = 0;
            err = "���ϲ���Ϊ��";
        }
        if(model.get('zdy4') == '' || model.get('zdy4') == null){
            isok = 0;
            err = "��λ����Ϊ��";
        }
        if(model.get('quantity') == '' || model.get('quantity') == null){
            isok = 0;
            err = "��������Ϊ��";
        }
        if(model.get('price') == '' || model.get('price') == null){
            isok = 0;
            err = "���۲���Ϊ��";
        }
        model.set('money',0);
        model.set('mainid',getParameter("typeid"));
        if(model.get('id') == '' || model.get('id') == null){
            model.set('id', 0);
        }
        data.push(Ext.JSON.encode(model.data));
    });
    //alert(data);
    if(isok == 0){
        //Ext.Msg.alert('��ܰ��ʾ',err);
		var result =  '{"id":-1,"err":"'+ err +'"}';
        return result;
    }else{
		if(records == null || records == ''){
			return '{"id":-2,"err":"0"}';
		}else{
			return data;
		}
    }
}