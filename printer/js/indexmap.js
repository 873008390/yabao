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
	var map = new BMap.Map("map");            // 创建Map实例
	var point = new BMap.Point(116.404, 39.915);
	map.centerAndZoom(point, 8);
	map.enableScrollWheelZoom();
	map.enableInertialDragging();

	map.enableContinuousZoom();

	var size = new BMap.Size(10, 200);
	map.addControl(new BMap.CityListControl({
	    anchor: BMAP_ANCHOR_TOP_LEFT,
	    offset: size,
	    // 切换城市之间事件
	    // onChangeBefore: function(){
	    //    alert('before');
	    // },
	    // 切换城市之后事件
	    // onChangeAfter:function(){
	    //   alert('after');
	    // }
	}));
}
function reloadstore(newurl){
	
}