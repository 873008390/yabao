Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout: {
        	    type: 'vbox',
        	    align : 'stretch',
        	    pack  : 'start'
        	},
            items: [
                    {
                    	id: 'map',
                    	xtype: 'panel',
                    	flex: 1
                    }]
        });
        openmap("");
    }
});
function openmap(url){
	var marker;
	var xmlhttp;
	var map = new BMap.Map("map");            // ����Mapʵ��
	var point = new BMap.Point(116.404, 39.915);
	map.centerAndZoom(point, 8);
	map.enableScrollWheelZoom();
	map.enableInertialDragging();

	map.enableContinuousZoom();

	var size = new BMap.Size(10, 200);
	map.addControl(new BMap.CityListControl({
	    anchor: BMAP_ANCHOR_TOP_LEFT,
	    offset: size,
	    // �л�����֮���¼�
	    // onChangeBefore: function(){
	    //    alert('before');
	    // },
	    // �л�����֮���¼�
	    // onChangeAfter:function(){
	    //   alert('after');
	    // }
	}));
}
function reloadstore(newurl){
	
}