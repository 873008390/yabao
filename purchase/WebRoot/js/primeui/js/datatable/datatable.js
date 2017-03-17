(function(){$.widget("primeui.puidatatable",{options:{columns:null,datasource:null,paginator:null,selectionMode:null,rowSelect:null,rowUnselect:null,caption:null,footer:null,sortField:null,sortOrder:null,keepSelectionInLazyMode:false,scrollable:false,scrollHeight:null,scrollWidth:null,responsive:false,expandableRows:false,expandedRowContent:null,rowExpandMode:"multiple",draggableColumns:false,resizableColumns:false,columnResizeMode:"fit",draggableRows:false,filterDelay:300,stickyHeader:false,editMode:null,tabindex:0},_create:function(){this.id=this.element.attr("id");
if(!this.id){this.id=this.element.uniqueId().attr("id")
}this.element.addClass("pui-datatable ui-widget");
if(this.options.responsive){this.element.addClass("pui-datatable-reflow")
}if(this.options.scrollable){this._createScrollableDatatable()
}else{this._createRegularDatatable()
}if(this.options.datasource){if($.isArray(this.options.datasource)){this._onDataInit(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onDataInit,{first:0,sortField:this.options.sortField,sortOrder:this.options.sortOrder})
}else{this.options.datasource.call(this,this._onDataInit)
}}}}},_createRegularDatatable:function(){this.tableWrapper=$('<div class="pui-datatable-tablewrapper" />').appendTo(this.element);
this.table=$("<table><thead></thead><tbody></tbody></table>").appendTo(this.tableWrapper);
this.thead=this.table.children("thead");
this.tbody=this.table.children("tbody").addClass("pui-datatable-data");
if(this.containsFooter()){this.tfoot=this.thead.after("<tfoot></tfoot>").next()
}},_createScrollableDatatable:function(){this.element.append('<div class="ui-widget-header pui-datatable-scrollable-header"><div class="pui-datatable-scrollable-header-box"><table><thead></thead></table></div></div>').append('<div class="pui-datatable-scrollable-body"><table><tbody></tbody></table></div>');
this.thead=this.element.find("> .pui-datatable-scrollable-header > .pui-datatable-scrollable-header-box > table > thead");
this.tbody=this.element.find("> .pui-datatable-scrollable-body > table > tbody");
if(this.containsFooter()){this.element.append('<div class="ui-widget-header pui-datatable-scrollable-footer"><div class="pui-datatable-scrollable-footer-box"><table><tfoot></tfoot></table></div></div>');
this.tfoot=this.element.find("> .pui-datatable-scrollable-footer > .pui-datatable-scrollable-footer-box > table > tfoot")
}},_initialize:function(){var a=this;
this._initHeader();
this._initFooter();
if(this.options.caption){this.element.prepend('<div class="pui-datatable-caption ui-widget-header">'+this.options.caption+"</div>")
}if(this.options.paginator){this.options.paginator.paginate=function(b,c){a.paginate()
};
this.options.paginator.totalRecords=this.options.lazy?this.options.paginator.totalRecords:this.data.length;
this.paginator=$("<div></div>").insertAfter(this.tableWrapper).puipaginator(this.options.paginator)
}if(this.options.footer){this.element.append('<div class="pui-datatable-footer ui-widget-header">'+this.options.footer+"</div>")
}if(this._isSortingEnabled()){this._initSorting()
}if(this.hasFiltering){this._initFiltering()
}if(this.options.selectionMode){this._initSelection()
}if(this.options.expandableRows){this._initExpandableRows()
}if(this.options.draggableColumns){this._initDraggableColumns()
}if(this.options.stickyHeader){this._initStickyHeader()
}if(this.options.sortField&&this.options.sortOrder){this._indicateInitialSortColumn();
this.sort(this.options.sortField,this.options.sortOrder)
}else{this._renderData()
}if(this.options.scrollable){this._initScrolling()
}if(this.options.resizableColumns){this._initResizableColumns()
}if(this.options.draggableRows){this._initDraggableRows()
}if(this.options.editMode){this._initEditing()
}},_initHeader:function(){if(this.options.headerRows){for(var a=0;
a<this.options.headerRows.length;
a++){this._initHeaderColumns(this.options.headerRows[a].columns)
}}else{if(this.options.columns){this._initHeaderColumns(this.options.columns)
}}},_initFooter:function(){if(this.containsFooter()){if(this.options.footerRows){for(var a=0;
a<this.options.footerRows.length;
a++){this._initFooterColumns(this.options.footerRows[a].columns)
}}else{if(this.options.columns){this._initFooterColumns(this.options.columns)
}}}},_initHeaderColumns:function(a){var b=$("<tr></tr>").appendTo(this.thead),c=this;
$.each(a,function(f,e){var d=$('<th class="ui-state-default"><span class="pui-column-title"></span></th>').data("field",e.field).uniqueId().appendTo(b);
if(e.headerClass){d.addClass(e.headerClass)
}if(e.headerStyle){d.attr("style",e.headerStyle)
}if(e.headerText){d.children(".pui-column-title").text(e.headerText)
}else{if(e.headerContent){d.children(".pui-column-title").append(e.headerContent.call(this,e))
}}if(e.rowspan){d.attr("rowspan",e.rowspan)
}if(e.colspan){d.attr("colspan",e.colspan)
}if(e.sortable){d.addClass("pui-sortable-column").data("order",0).append('<span class="pui-sortable-column-icon fa fa-fw fa-sort"></span>')
}if(e.filter){c.hasFiltering=true;
var g=$('<input type="text" class="pui-column-filter" />').puiinputtext().data({field:e.field,filtermatchmode:e.filterMatchMode||"startsWith"}).appendTo(d);
if(e.filterFunction){g.on("filter",function(h,i,j){return e.filterFunction.call(c,i,j)
})
}}})
},_initFooterColumns:function(a){var b=$("<tr></tr>").appendTo(this.tfoot);
$.each(a,function(e,d){var c=$('<td class="ui-state-default"></td>');
if(d.footerText){c.text(d.footerText)
}if(d.rowspan){c.attr("rowspan",d.rowspan)
}if(d.colspan){c.attr("colspan",d.colspan)
}c.appendTo(b)
})
},_indicateInitialSortColumn:function(){this.sortableColumns=this.thead.find("> tr > th.pui-sortable-column");
var a=this;
$.each(this.sortableColumns,function(b,c){var e=$(c),d=e.data();
if(a.options.sortField===d.field){var f=e.children(".pui-sortable-column-icon");
e.data("order",a.options.sortOrder).removeClass("ui-state-hover").addClass("ui-state-active");
if(a.options.sortOrder===-1){f.removeClass("fa-sort fa-sort-asc").addClass("fa-sort-desc")
}else{if(a.options.sortOrder===1){f.removeClass("fa-sort fa-sort-desc").addClass("fa-sort-asc")
}}}})
},_onDataInit:function(a){this.data=a;
if(!this.data){this.data=[]
}this._initialize()
},_onDataUpdate:function(a){this.data=a;
if(!this.data){this.data=[]
}this.reset();
this._renderData()
},_onLazyLoad:function(a){this.data=a;
if(!this.data){this.data=[]
}this._renderData()
},reset:function(){if(this.options.selectionMode){this.selection=[]
}if(this.paginator){this.paginator.puipaginator("setState",{page:0,totalRecords:this.options.lazy?this.options.paginator.totalRecords:this.data.length})
}this.thead.children("th.pui-sortable-column").data("order",0).filter(".ui-state-active").removeClass("ui-state-active").children("span.pui-sortable-column-icon").removeClass("fa-sort-asc fa-sort-desc").addClass("fa-sort")
},_initSorting:function(){var b=this,a=this.thead.find("> tr > th.pui-sortable-column");
a.on("mouseover.puidatatable",function(){var c=$(this);
if(!c.hasClass("ui-state-active")){c.addClass("ui-state-hover")
}}).on("mouseout.puidatatable",function(){var c=$(this);
if(!c.hasClass("ui-state-active")){c.removeClass("ui-state-hover")
}}).on("click.puidatatable",function(g){var f=$(this),d=f.data("field"),c=f.data("order"),e=(c===0)?1:(c*-1),h=f.children(".pui-sortable-column-icon");
f.siblings().filter(".ui-state-active").data("order",0).removeClass("ui-state-active").children("span.pui-sortable-column-icon").removeClass("fa-sort-asc fa-sort-desc").addClass("fa-sort");
b.options.sortField=d;
b.options.sortOrder=e;
b.sort(d,e);
f.data("order",e).removeClass("ui-state-hover").addClass("ui-state-active");
if(e===-1){h.removeClass("fa-sort fa-sort-asc").addClass("fa-sort-desc")
}else{if(e===1){h.removeClass("fa-sort fa-sort-desc").addClass("fa-sort-asc")
}}b._trigger("sort",g,{sortOrder:e,sortField:d})
})
},paginate:function(){if(this.options.lazy){if(this.options.selectionMode&&!this.options.keepSelectionInLazyMode){this.selection=[]
}this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{this._renderData()
}},sort:function(b,a){if(this.options.selectionMode){this.selection=[]
}if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{this.data.sort(function(d,g){var f=d[b],e=g[b],c=null;
if(typeof f=="string"||f instanceof String){if(f.localeCompare){return(a*f.localeCompare(e))
}else{if(f.toLowerCase){f=f.toLowerCase()
}if(e.toLowerCase){e=e.toLowerCase()
}c=(f<e)?-1:(f>e)?1:0
}}else{c=(f<e)?-1:(f>e)?1:0
}return(a*c)
});
if(this.options.selectionMode){this.selection=[]
}if(this.paginator){this.paginator.puipaginator("option","page",0)
}this._renderData()
}},sortByField:function(d,c){var f=d.name.toLowerCase();
var e=c.name.toLowerCase();
return((f<e)?-1:((f>e)?1:0))
},_renderData:function(){var a=this.filteredData||this.data;
if(a){this.tbody.html("");
var m=this._getFirst(),f=this.options.lazy?0:m,o=this._getRows();
for(var e=f;
e<(f+o);
e++){var c=a[e];
if(c){var n=$('<tr class="ui-widget-content" />').appendTo(this.tbody),h=(e%2===0)?"pui-datatable-even":"pui-datatable-odd",k=e;
n.addClass(h);
if(this.options.lazy){k+=m
}if(this.options.selectionMode&&PUI.inArray(this.selection,k)){n.addClass("ui-state-highlight")
}for(var d=0;
d<this.options.columns.length;
d++){var b=$("<td />").appendTo(n),l=this.options.columns[d];
if(l.bodyClass){b.addClass(l.bodyClass)
}if(l.bodyStyle){b.attr("style",l.bodyStyle)
}if(l.editor){b.addClass("pui-editable-column").data({editor:l.editor,rowdata:c,field:l.field})
}if(l.field){b.text(c[l.field])
}else{if(l.content){var g=l.content.call(this,c);
if($.type(g)==="string"){b.html(g)
}else{b.append(g)
}}else{if(l.rowToggler){b.append('<div class="pui-row-toggler fa fa-fw fa-chevron-circle-right"></div>')
}}}if(this.options.responsive&&l.headerText){b.prepend('<span class="pui-column-title">'+l.headerText+"</span>")
}}}}}},_getFirst:function(){if(this.paginator){var b=this.paginator.puipaginator("option","page"),a=this.paginator.puipaginator("option","rows");
return(b*a)
}else{return 0
}},_getRows:function(){return this.paginator?this.paginator.puipaginator("option","rows"):this.data.length
},_isSortingEnabled:function(){var b=this.options.columns;
if(b){for(var a=0;
a<b.length;
a++){if(b[a].sortable){return true
}}}return false
},_initSelection:function(){var a=this;
this.selection=[];
this.rowSelector="> tr.ui-widget-content:not(.ui-datatable-empty-message)";
if(this._isMultipleSelection()){this.originRowIndex=0;
this.cursorIndex=null
}this.tbody.off("mouseover.puidatatable mouseout.puidatatable mousedown.puidatatable click.puidatatable",this.rowSelector).on("mouseover.datatable",this.rowSelector,null,function(){var b=$(this);
if(!b.hasClass("ui-state-highlight")){b.addClass("ui-state-hover")
}}).on("mouseout.datatable",this.rowSelector,null,function(){var b=$(this);
if(!b.hasClass("ui-state-highlight")){b.removeClass("ui-state-hover")
}}).on("mousedown.datatable",this.rowSelector,null,function(){a.mousedownOnRow=true
}).on("click.datatable",this.rowSelector,null,function(b){a._onRowClick(b,this);
a.mousedownOnRow=false
});
this._bindSelectionKeyEvents()
},_onRowClick:function(f,e){if(!$(f.target).is(":input,:button,a,.pui-c")){var h=$(e),d=h.hasClass("ui-state-highlight"),g=f.metaKey||f.ctrlKey,b=f.shiftKey;
this.focusedRow=h;
if(d&&g){this.unselectRow(h)
}else{if(this._isSingleSelection()||(this._isMultipleSelection()&&!g&&!b)){if(this._isMultipleSelection()){var c=this.getSelection();
for(var a=0;
a<c.length;
a++){this._trigger("rowUnselect",null,c[a])
}}this.unselectAllRows()
}this.selectRow(h,false,f)
}PUI.clearSelection()
}},onRowRightClick:function(c,b){var e=$(b),f=this._getRowIndex(e),d=this.data[f],a=e.hasClass("ui-state-highlight");
if(this._isSingleSelection()||!a){this.unselectAllRows()
}this.selectRow(e,true);
this.dataSelectedByContextMenu=d;
this._trigger("rowSelectContextMenu",c,d);
PUI.clearSelection()
},_bindSelectionKeyEvents:function(){var a=this;
this.tbody.attr("tabindex",this.options.tabindex).on("focus",function(b){if(!a.mousedownOnRow){a.focusedRow=a.tbody.children("tr.ui-widget-content").eq(0);
a.focusedRow.addClass("ui-state-hover")
}}).on("blur",function(){if(a.focusedRow){a.focusedRow.removeClass("ui-state-hover");
a.focusedRow=null
}}).on("keydown",function(f){var d=$.ui.keyCode,b=f.which;
if(a.focusedRow){switch(b){case d.UP:var g=a.focusedRow.prev("tr.ui-widget-content");
if(g.length){a.focusedRow.removeClass("ui-state-hover");
a.focusedRow=g;
a.focusedRow.addClass("ui-state-hover")
}f.preventDefault();
break;
case d.DOWN:var c=a.focusedRow.next("tr.ui-widget-content");
if(c.length){a.focusedRow.removeClass("ui-state-hover");
a.focusedRow=c;
a.focusedRow.addClass("ui-state-hover")
}f.preventDefault();
break;
case d.ENTER:case d.NUMPAD_ENTER:case d.SPACE:f.target=a.focusedRow.children().eq(0).get(0);
a._onRowClick(f,a.focusedRow.get(0));
f.preventDefault();
break;
default:break
}}})
},_isSingleSelection:function(){return this.options.selectionMode==="single"
},_isMultipleSelection:function(){return this.options.selectionMode==="multiple"
},unselectAllRows:function(){this.tbody.children("tr.ui-state-highlight").removeClass("ui-state-highlight").attr("aria-selected",false);
this.selection=[]
},unselectRow:function(b,a){var c=this._getRowIndex(b);
b.removeClass("ui-state-highlight").attr("aria-selected",false);
this._removeSelection(c);
if(!a){this._trigger("rowUnselect",null,this.data[c])
}},selectRow:function(d,a,b){var e=this._getRowIndex(d),c=this.data[e];
d.removeClass("ui-state-hover").addClass("ui-state-highlight").attr("aria-selected",true);
this._addSelection(e);
if(!a){if(this.options.lazy){c=this.data[e-this._getFirst()]
}this._trigger("rowSelect",b,c)
}},getSelection:function(){var c=this.options.lazy?this._getFirst():0,b=[];
for(var a=0;
a<this.selection.length;
a++){if(this.data.length>this.selection[a]-c&&this.selection[a]-c>0){b.push(this.data[this.selection[a]-c])
}}return b
},_removeSelection:function(a){this.selection=$.grep(this.selection,function(b){return b!==a
})
},_addSelection:function(a){if(!this._isSelected(a)){this.selection.push(a)
}},_isSelected:function(a){return PUI.inArray(this.selection,a)
},_getRowIndex:function(b){var a=b.index();
return this.options.paginator?this._getFirst()+a:a
},_initExpandableRows:function(){var b=this,a="> tr > td > div.pui-row-toggler";
this.tbody.off("click",a).on("click",a,null,function(){b.toggleExpansion($(this))
}).on("keydown",a,null,function(f){var c=f.which,d=$.ui.keyCode;
if((c===d.ENTER||c===d.NUMPAD_ENTER)){b.toggleExpansion($(this));
f.preventDefault()
}})
},toggleExpansion:function(b){var c=b.closest("tr"),a=b.hasClass("fa-chevron-circle-down");
if(a){b.addClass("fa-chevron-circle-right").removeClass("fa-chevron-circle-down").attr("aria-expanded",false);
this.collapseRow(c);
this._trigger("rowCollapse",null,this.data[this._getRowIndex(c)])
}else{if(this.options.rowExpandMode==="single"){this.collapseAllRows()
}b.addClass("fa-chevron-circle-down").removeClass("fa-chevron-circle-right").attr("aria-expanded",true);
this.loadExpandedRowContent(c)
}},loadExpandedRowContent:function(b){var c=this._getRowIndex(b),a=$('<tr class="pui-expanded-row-content ui-widget-content"><td colspan="'+this.options.columns.length+'"></td></tr>');
a.children("td").append(this.options.expandedRowContent.call(this,this.data[c]));
b.addClass("pui-expanded-row").after(a);
this._trigger("rowExpand",null,this.data[this._getRowIndex(b)])
},collapseRow:function(a){a.removeClass("pui-expanded-row").next(".pui-expanded-row-content").remove()
},collapseAllRows:function(){var a=this;
this.getExpandedRows().each(function(){var f=$(this);
a.collapseRow(f);
var c=f.children("td");
for(var b=0;
b<c.length;
b++){var d=c.eq(b),e=d.children(".pui-row-toggler");
if(e.length){e.addClass("fa-chevron-circle-right").removeClass("fa-chevron-circle-down")
}}})
},getExpandedRows:function(){return this.tbody.children(".pui-expanded-row")
},_createStateMeta:function(){var a={first:this._getFirst(),rows:this._getRows(),sortField:this.options.sortField,sortOrder:this.options.sortOrder,filters:this.filterMetaMap};
return a
},_updateDatasource:function(a){this.options.datasource=a;
if($.isArray(this.options.datasource)){this._onDataUpdate(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){if(this.options.lazy){this.options.datasource.call(this,this._onDataUpdate,{first:0,sortField:this.options.sortField,sortorder:this.options.sortOrder})
}else{this.options.datasource.call(this,this._onDataUpdate)
}}}},_setOption:function(a,b){if(a==="datasource"){this._updateDatasource(b)
}else{$.Widget.prototype._setOption.apply(this,arguments)
}},_initScrolling:function(){this.scrollHeader=this.element.children(".pui-datatable-scrollable-header");
this.scrollBody=this.element.children(".pui-datatable-scrollable-body");
this.scrollHeaderBox=this.scrollHeader.children(".pui-datatable-scrollable-header-box");
this.headerTable=this.scrollHeaderBox.children("table");
this.bodyTable=this.scrollBody.children("table");
this.percentageScrollHeight=this.options.scrollHeight&&(this.options.scrollHeight.indexOf("%")!==-1);
this.percentageScrollWidth=this.options.scrollWidth&&(this.options.scrollWidth.indexOf("%")!==-1);
var c=this,b=this.getScrollbarWidth()+"px";
if(this.options.scrollHeight){if(this.percentageScrollHeight){this.adjustScrollHeight()
}else{this.scrollBody.css("max-height",this.options.scrollHeight+"px")
}if(this.hasVerticalOverflow()){this.scrollHeaderBox.css("margin-right",b)
}}this.fixColumnWidths();
if(this.options.scrollWidth){if(this.percentageScrollWidth){this.adjustScrollWidth()
}else{this.setScrollWidth(parseInt(this.options.scrollWidth))
}}this.cloneHead();
this.scrollBody.on("scroll.dataTable",function(){var d=c.scrollBody.scrollLeft();
c.scrollHeaderBox.css("margin-left",-d)
});
this.scrollHeader.on("scroll.dataTable",function(){c.scrollHeader.scrollLeft(0)
});
var a="resize."+this.id;
$(window).off(a).on(a,function(){if(c.element.is(":visible")){if(c.percentageScrollHeight){c.adjustScrollHeight()
}if(c.percentageScrollWidth){c.adjustScrollWidth()
}}})
},cloneHead:function(){this.theadClone=this.thead.clone();
this.theadClone.find("th").each(function(){var b=$(this);
b.attr("id",b.attr("id")+"_clone");
$(this).children().not(".pui-column-title").remove()
});
this.theadClone.removeAttr("id").addClass("pui-datatable-scrollable-theadclone").height(0).prependTo(this.bodyTable);
if(this.options.scrollWidth){var a=this.theadClone.find("> tr > th.pui-sortable-column");
a.each(function(){$(this).data("original",$(this).attr("id").split("_clone")[0])
});
a.on("blur.dataTable",function(){$(PrimeFaces.escapeClientId($(this).data("original"))).removeClass("ui-state-focus")
}).on("focus.dataTable",function(){$(PrimeFaces.escapeClientId($(this).data("original"))).addClass("ui-state-focus")
}).on("keydown.dataTable",function(d){var b=d.which,c=$.ui.keyCode;
if((b===c.ENTER||b===c.NUMPAD_ENTER)&&$(d.target).is(":not(:input)")){$(PrimeFaces.escapeClientId($(this).data("original"))).trigger("click.dataTable",(d.metaKey||d.ctrlKey));
d.preventDefault()
}})
}},adjustScrollHeight:function(){var d=this.element.parent().innerHeight()*(parseInt(this.options.scrollHeight)/100),f=this.element.children(".pui-datatable-header").outerHeight(true),b=this.element.children(".pui-datatable-footer").outerHeight(true),c=(this.scrollHeader.outerHeight(true)+this.scrollFooter.outerHeight(true)),e=this.paginator?this.paginator.getContainerHeight(true):0,a=(d-(c+e+f+b));
this.scrollBody.css("max-height",a+"px")
},adjustScrollWidth:function(){var a=parseInt((this.element.parent().innerWidth()*(parseInt(this.options.scrollWidth)/100)));
this.setScrollWidth(a)
},setOuterWidth:function(a,b){var c=a.outerWidth()-a.width();
a.width(b-c)
},setScrollWidth:function(a){var b=this;
this.element.children(".ui-widget-header").each(function(){b.setOuterWidth($(this),a)
});
this.scrollHeader.width(a);
this.scrollBody.css("margin-right",0).width(a)
},alignScrollBody:function(){var a=this.hasVerticalOverflow()?this.getScrollbarWidth()+"px":"0px";
this.scrollHeaderBox.css("margin-right",a)
},getScrollbarWidth:function(){if(!this.scrollbarWidth){this.scrollbarWidth=PUI.browser.webkit?"15":PUI.calculateScrollbarWidth()
}return this.scrollbarWidth
},hasVerticalOverflow:function(){return(this.options.scrollHeight&&this.bodyTable.outerHeight()>this.scrollBody.outerHeight())
},restoreScrollState:function(){var a=this.scrollStateHolder.val(),b=a.split(",");
this.scrollBody.scrollLeft(b[0]);
this.scrollBody.scrollTop(b[1])
},saveScrollState:function(){var a=this.scrollBody.scrollLeft()+","+this.scrollBody.scrollTop();
this.scrollStateHolder.val(a)
},clearScrollState:function(){this.scrollStateHolder.val("0,0")
},fixColumnWidths:function(){if(!this.columnWidthsFixed){if(this.options.scrollable){this.scrollHeaderBox.find("> table > thead > tr > th").each(function(){var b=$(this),a=b.width();
b.width(a)
})
}else{this.element.find("> .pui-datatable-tablewrapper > table > thead > tr > th").each(function(){var a=$(this);
a.width(a.width())
})
}this.columnWidthsFixed=true
}},_initDraggableColumns:function(){var a=this;
this.dragIndicatorTop=$('<span class="fa fa-arrow-down" style="position:absolute"/></span>').hide().appendTo(this.element);
this.dragIndicatorBottom=$('<span class="fa fa-arrow-up" style="position:absolute"/></span>').hide().appendTo(this.element);
this.thead.find("> tr > th").draggable({appendTo:"body",opacity:0.75,cursor:"move",scope:this.id,cancel:":input,.ui-column-resizer",drag:function(e,g){var i=g.helper.data("droppable-column");
if(i){var d=i.offset(),b=d.top-10,c=d.top+i.height()+8,f=null;
if(e.originalEvent.pageX>=d.left+(i.width()/2)){var h=i.next();
if(h.length==1){f=h.offset().left-9
}else{f=i.offset().left+i.innerWidth()-9
}g.helper.data("drop-location",1)
}else{f=d.left-9;
g.helper.data("drop-location",-1)
}a.dragIndicatorTop.offset({left:f,top:b-3}).show();
a.dragIndicatorBottom.offset({left:f,top:c-3}).show()
}},stop:function(b,c){a.dragIndicatorTop.css({left:0,top:0}).hide();
a.dragIndicatorBottom.css({left:0,top:0}).hide()
},helper:function(){var c=$(this),b=$('<div class="ui-widget ui-state-default" style="padding:4px 10px;text-align:center;"></div>');
b.width(c.width());
b.height(c.height());
b.html(c.html());
return b.get(0)
}}).droppable({hoverClass:"ui-state-highlight",tolerance:"pointer",scope:this.id,over:function(b,c){c.helper.data("droppable-column",$(this))
},drop:function(c,i){var m=i.draggable,f=i.helper.data("drop-location"),g=$(this),e=null,k=null;
var j=a.tbody.find("> tr:not(.ui-expanded-row-content) > td:nth-child("+(m.index()+1)+")"),l=a.tbody.find("> tr:not(.ui-expanded-row-content) > td:nth-child("+(g.index()+1)+")");
if(a.containsFooter()){var b=a.tfoot.find("> tr > td"),e=b.eq(m.index()),k=b.eq(g.index())
}if(f>0){m.insertAfter(g);
j.each(function(n,o){$(this).insertAfter(l.eq(n))
});
if(e&&k){e.insertAfter(k)
}if(a.options.scrollable){var h=$(document.getElementById(m.attr("id")+"_clone")),d=$(document.getElementById(g.attr("id")+"_clone"));
h.insertAfter(d)
}}else{m.insertBefore(g);
j.each(function(n,o){$(this).insertBefore(l.eq(n))
});
if(e&&k){e.insertBefore(k)
}if(a.options.scrollable){var h=$(document.getElementById(m.attr("id")+"_clone")),d=$(document.getElementById(g.attr("id")+"_clone"));
h.insertBefore(d)
}}a._trigger("colReorder",null,{dragIndex:m.index(),dropIndex:g.index()})
}})
},containsFooter:function(){if(this.hasFooter===undefined){this.hasFooter=this.options.footerRows!==undefined;
if(!this.hasFooter){if(this.options.columns){for(var a=0;
a<this.options.columns.length;
a++){if(this.options.columns[a].footerText!==undefined){this.hasFooter=true;
break
}}}}}return this.hasFooter
},_initResizableColumns:function(){this.element.addClass("pui-datatable-resizable");
this.thead.find("> tr > th").addClass("pui-resizable-column");
this.resizerHelper=$('<div class="pui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.element);
this.addResizers();
var a=this.thead.find("> tr > th > span.pui-column-resizer"),b=this;
setTimeout(function(){b.fixColumnWidths()
},5);
a.draggable({axis:"x",start:function(d,e){e.helper.data("originalposition",e.helper.offset());
var c=b.options.scrollable?b.scrollBody.height():b.thead.parent().height()-b.thead.height()-1;
b.resizerHelper.height(c);
b.resizerHelper.show()
},drag:function(c,d){b.resizerHelper.offset({left:d.helper.offset().left+d.helper.width()/2,top:b.thead.offset().top+b.thead.height()})
},stop:function(c,d){d.helper.css({left:"",top:"0px",right:"0px"});
b.resize(c,d);
b.resizerHelper.hide();
if(b.options.columnResizeMode==="expand"){setTimeout(function(){b._trigger("colResize",null,{element:d.helper.parent()})
},5)
}else{b._trigger("colResize",null,{element:d.helper.parent()})
}if(b.options.stickyHeader){b.thead.find(".pui-column-filter").prop("disabled",false);
b.clone=b.thead.clone(true);
b.cloneContainer.find("thead").remove();
b.cloneContainer.children("table").append(b.clone);
b.thead.find(".ui-column-filter").prop("disabled",true)
}},containment:this.element})
},resize:function(a,i){var b,d,h=null,c=null,e=null,k=(this.options.columnResizeMode==="expand"),l=this.thead.parent(),b=i.helper.parent(),d=b.next();
h=(i.position.left-i.originalPosition.left),c=(b.width()+h),e=(d.width()-h);
if((c>15&&e>15)||(k&&c>15)){if(k){l.width(l.width()+h);
setTimeout(function(){b.width(c)
},1)
}else{b.width(c);
d.width(e)
}if(this.options.scrollable){var g=this.theadClone.parent(),j=b.index();
if(k){var f=this;
g.width(g.width()+h);
this.footerTable.width(this.footerTable.width()+h);
setTimeout(function(){if(f.hasColumnGroup){f.theadClone.find("> tr:first").children("th").eq(j).width(c);
f.footerTable.find("> tfoot > tr:first").children("th").eq(j).width(c)
}else{f.theadClone.find(PrimeFaces.escapeClientId(b.attr("id")+"_clone")).width(c);
f.footerCols.eq(j).width(c)
}},1)
}else{this.theadClone.find(PrimeFaces.escapeClientId(b.attr("id")+"_clone")).width(c);
this.theadClone.find(PrimeFaces.escapeClientId(d.attr("id")+"_clone")).width(e)
}}}},addResizers:function(){var a=this.thead.find("> tr > th.pui-resizable-column");
a.prepend('<span class="pui-column-resizer">&nbsp;</span>');
if(this.options.columnResizeMode==="fit"){a.filter(":last-child").children("span.pui-column-resizer").hide()
}},_initDraggableRows:function(){var a=this;
this.tbody.sortable({placeholder:"pui-datatable-rowordering ui-state-active",cursor:"move",handle:"td,span:not(.ui-c)",appendTo:document.body,helper:function(g,h){var d=h.children(),f=$('<div class="pui-datatable ui-widget"><table><tbody></tbody></table></div>'),c=h.clone(),b=c.children();
for(var e=0;
e<b.length;
e++){b.eq(e).width(d.eq(e).width())
}c.appendTo(f.find("tbody"));
return f
},update:function(b,c){a.syncRowParity();
this._trigger("rowReorder",null,{fromIndex:c.item.data("ri"),toIndex:a._getFirst()+c.item.index()})
},change:function(b,c){if(a.cfg.scrollable){PUI.scrollInView(a.scrollBody,c.placeholder)
}}})
},syncRowParity:function(){var b=this.tbody.children("tr.ui-widget-content");
for(var a=this._getFirst();
a<b.length;
a++){var c=b.eq(a);
c.data("ri",a).removeClass("pui-datatable-even pui-datatable-odd");
if(a%2===0){c.addClass("pui-datatable-even")
}else{c.addClass("pui-datatable-odd")
}}},getContextMenuSelection:function(a){return this.dataSelectedByContextMenu
},_initFiltering:function(){var a=this;
this.filterElements=this.thead.find(".pui-column-filter");
this.filterElements.on("keyup",function(){if(a.filterTimeout){clearTimeout(a.filterTimeout)
}a.filterTimeout=setTimeout(function(){a.filter();
a.filterTimeout=null
},a.options.filterDelay)
})
},filter:function(){this.filterMetaMap=[];
for(var e=0;
e<this.filterElements.length;
e++){var g=this.filterElements.eq(e),f=g.val();
if(f&&$.trim(f)!==""){this.filterMetaMap.push({field:g.data("field"),filterMatchMode:g.data("filtermatchmode"),value:f.toLowerCase(),element:g})
}}if(this.options.lazy){this.options.datasource.call(this,this._onLazyLoad,this._createStateMeta())
}else{if(this.filterMetaMap.length){this.filteredData=[];
for(var e=0;
e<this.data.length;
e++){var h=true;
for(var d=0;
d<this.filterMetaMap.length;
d++){var b=this.filterMetaMap[d],l=b.value,k=b.field,c=this.data[e][k];
if(b.filterMatchMode==="custom"){h=b.element.triggerHandler("filter",[c,l])
}else{var a=this.filterConstraints[b.filterMatchMode];
if(!a(c,l)){h=false
}}if(!h){break
}}if(h){this.filteredData.push(this.data[e])
}}}else{this.filteredData=null
}if(this.paginator){this.paginator.puipaginator("option","totalRecords",this.filteredData?this.filteredData.length:this.data?this.data.length:0)
}this._renderData()
}},filterConstraints:{startsWith:function(b,a){if(a===undefined||a===null||$.trim(a)===""){return true
}if(b===undefined||b===null){return false
}return b.toString().toLowerCase().slice(0,a.length)===a
},contains:function(b,a){if(a===undefined||a===null||$.trim(a)===""){return true
}if(b===undefined||b===null){return false
}return b.toString().toLowerCase().indexOf(a)!==-1
}},_initStickyHeader:function(){var b=this.thead.parent(),f=b.offset(),d=$(window),c=this,e="scroll."+this.id,a="resize.sticky-"+this.id;
this.cloneContainer=$('<div class="pui-datatable pui-datatable-sticky ui-widget"><table></table></div>');
this.clone=this.thead.clone(true);
this.cloneContainer.children("table").append(this.clone);
this.cloneContainer.css({position:"absolute",width:b.outerWidth(),top:f.top,left:f.left,"z-index":++PUI.zindex}).appendTo(this.element);
d.off(e).on(e,function(){var h=d.scrollTop(),g=b.offset();
if(h>g.top){c.cloneContainer.css({position:"fixed",top:"0px"}).addClass("pui-shadow pui-sticky");
if(h>=(g.top+c.tbody.height())){c.cloneContainer.hide()
}else{c.cloneContainer.show()
}}else{c.cloneContainer.css({position:"absolute",top:g.top}).removeClass("pui-shadow pui-sticky")
}}).off(a).on(a,function(){c.cloneContainer.width(b.outerWidth())
});
this.thead.find(".pui-column-filter").prop("disabled",true)
},_initEditing:function(){var a="> tr > td.pui-editable-column",b=this;
this.tbody.off("click",a).on("click",a,null,function(d){var c=$(this);
if(!c.hasClass("pui-cell-editing")){b._showCellEditor(c)
}})
},_showCellEditor:function(a){var b=this.editors[a.data("editor")].call(),c=this;
b.val(a.data("rowdata")[a.data("field")]);
a.addClass("pui-cell-editing").html("").append(b);
b.focus().on("change",function(){c._onCellEditorChange(a)
}).on("blur",function(){c._onCellEditorBlur(a)
}).on("keydown",function(i){var d=i.which,h=$.ui.keyCode;
if((d===h.ENTER||d===h.NUMPAD_ENTER)){$(this).trigger("change").trigger("blur");
i.preventDefault()
}else{if(d===h.TAB){if(i.shiftKey){var g=a.prevAll("td.pui-editable-column").eq(0);
if(!g.length){g=a.parent().prev("tr").children("td.pui-editable-column:last")
}if(g.length){c._showCellEditor(g)
}}else{var f=a.nextAll("td.pui-editable-column").eq(0);
if(!f.length){f=a.parent().next("tr").children("td.pui-editable-column").eq(0)
}if(f.length){c._showCellEditor(f)
}}i.preventDefault()
}else{if(d===h.ESCAPE){c._onCellEditorBlur(a)
}}}})
},_onCellEditorChange:function(a){var b=a.children(".pui-cell-editor").val();
var c=this._trigger("cellEdit",null,{oldValue:a.data("rowdata")[a.data("field")],newValue:b,data:a.data("rowdata"),field:a.data("field")});
if(c!==false){a.data("rowdata")[a.data("field")]=b
}},_onCellEditorBlur:function(a){a.removeClass("pui-cell-editing").text(a.data("rowdata")[a.data("field")]).children(".pui-cell-editor").remove()
},editors:{input:function(){return $('<input type="text" class="pui-cell-editor"/>')
}}})
})();