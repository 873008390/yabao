Ext.define('M.controller.Suppliers2', {
    extend: 'Ext.app.Controller',

    stores: [
             'Suppliers'
         ],
    
    models: ['Supplier'],
         
    views: [
            'supplier.SupplierList2'
        ],
       
    init: function() {
        this.control({
            'supplierlist' : {
                itemdblclick: this.modifyClick
            },
            'supplierlist button[id=close]':{
                click: this.cClick
            },
            'supplierlist button[id=search]': {
                click: this.searchClick
            }
            
        });
    },

    cClick: function(o){
        //alert("1");
        window.parent.frames.close();
    },
    
    modifyClick: function(o){
        var grid = o.up('supplierlist');
        var model = grid.getSelectionModel();
        if(model.hasSelection()){
            var record = model.getLastSelected();
            if(record.get('id') == null || record.get('id') == ''){
                
            }else{
                window.parent.frames.getData1(record.get('supplierno'));
            }
        }else{
            alert("请选择供应商");
        }
    },
     
    searchClick: function(o){
        //alert(Ext.getCmp("keyword").getValue());
        var grid = o.up('supplierlist');
        var store = grid.getStore();
        store.getProxy().url = "supplier/list.action?idtype=allauditedwithsearch&typeid="+ Ext.getCmp("keyword").getValue();
        store.load();
     }
});