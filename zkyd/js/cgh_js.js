$(function(){
    $('#dowebok').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        paddingTop:'50px',
        paddingBottom:'50px'
    });
    $('.software_ht').click(function(){
        $('.software_ht').removeClass("active");
        $(this).addClass("active");
    });
    $('.navbar-nav li').click(function(){
        $('.navbar-nav li').removeClass("active");
        $(this).addClass("active");
    });
    Tab(".item2 .software_cot .col-md-3",".item2 .content_bd");
    Tab(".item3 .software_cot .col-md-3",".item3 .content_bd");
    newList();
    comPany();
    joinList();
    navBar();
    setcopyright();
    setAddress();
    setTabheader();
    setTabbody();
    setPagecontent();
    closemenu();
});
/*选项卡*/
function Tab(a,b){
    var aBtn = $(a);
    var aDiv = $(b);
    aBtn.click(function(){
        aDiv.css('display', 'none');
        aDiv.eq($(this).index()).css('display', 'block');
    })
}
/*nav*/
function navBar(){
    var content = "<li data-menuanchor = 'page1'  class='active'><a href='index.html#page1'>首页</a></lidata-menuanchor>"+
        "<li  data-menuanchor = 'page2'><a href='index.html#page2'>互联网+企业软件</a></li>"+
        "<li data-menuanchor = 'page3'><a href='index.html#page3'>行业典型客户</a></li>"+
        "<li data-menuanchor = 'page4'><a href='index.html#page4'>最新资讯</a></li>"+
        "<li data-menuanchor = 'page5'><a href='index.html#page5'>关于掌控</a></li>"+
        "<li data-menuanchor = 'page6'><a href='index.html#page6'>加入我们</a></li>"+
        "<li data-menuanchor = 'page7'><a href='index.html#page7'>联系我们</a></li>"+
        "<li><p class='navbar-text'><img src='images/tel.png' alt='电话'>0755-89812267</p></li>";
    $("#navbar-nav").html(content);
}
function closemenu(){
    $("#navbar-nav a").click(function(){
        $("#menu").addClass("collapsed").attr("aria-expanded","false");
        $("#navbar").removeClass("in").attr("aria-expanded","true")
    })
}
/*新闻列表*/
function newList(){
    var content ="<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>js新闻资讯</a></li>"+
                 "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>新闻资讯</a></li>"+
                 "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>新闻资讯</a></li>"+
                 "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>新闻资讯</a></li>";
    var pagelist = "<li><a href='#'>&laquo;</a></li>"+
                    "<li><a href='#'>1</a></li>"+
                    "<li><a href='#'>2</a></li>"+
                    "<li><a href='#'>3</a></li>"+
                    "<li><a href='#'>4</a></li>"+
                    "<li><a href='#'>5</a></li>"+
                    "<li><a href='#'>&raquo;</a></li>";
    $("#pagelist").html(pagelist);
    $("#newList").html(content);
}
function comPany(){
    var content ="<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>js关于掌控</a></li>"+
        "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>关于掌控</a></li>"+
        "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>关于掌控</a></li>"+
        "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>关于掌控</a></li>";
    var pagelist = "<li><a href='#'>&laquo;</a></li>"+
        "<li><a href='#'>1</a></li>"+
        "<li><a href='#'>2</a></li>"+
        "<li><a href='#'>3</a></li>"+
        "<li><a href='#'>4</a></li>"+
        "<li><a href='#'>5</a></li>"+
        "<li><a href='#'>&raquo;</a></li>";
    $("#pagelist2").html(pagelist);
    $("#company").html(content);
}
function joinList(){
    var content ="<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>js加入我们</a></li>"+
        "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>加入我们</a></li>"+
        "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>加入我们</a></li>"+
        "<li class='list-group-item'><a href='content.html'><img src='images/list1.jpg' alt=''>加入我们</a></li>";
    var pagelist = "<li><a href='#'>&laquo;</a></li>"+
        "<li><a href='#'>1</a></li>"+
        "<li><a href='#'>2</a></li>"+
        "<li><a href='#'>3</a></li>"+
        "<li><a href='#'>4</a></li>"+
        "<li><a href='#'>5</a></li>"+
        "<li><a href='#'>&raquo;</a></li>";
    $("#pagelist3").html(pagelist);
    $("#joinlist").html(content);
}
/*底部*/
function setcopyright(){
    $("footer").html("<p>版权所有： "+ (new Date()).getFullYear() +" @深圳市掌控移动软件有限公司<br>粤ICP备12092238号</p>");
}
/*联系地址*/
function setAddress(){
    var content = "<p>深圳市掌控移动软件有限公司</p>"+
                    "<p>深圳市龙华区观澜大道富嘉商务中心1501</p>"+
                    "<p>service@zhangkongmobile.com</p>"+
                    "<p>0755-89812267</p>"+
                    "<img src='images/wx.jpg' alt='微信二维码'>";
    $("#address").html(content);
}
/*选项卡*/
function  setTabheader(){
    var content1 = " <p>业务员行程管理系统</p>";
    var content2 = " <p>ERP+微信公众号整合</p>";
    var content3 = "<p>网站+微信公众号整合方案</p>";
    var content4 = " <p>服务器定时监测</p>";
    var content5 = "<p>外贸行业</p>";
    var content6 = " <p>食品行业</p>";
    var content7 = "<p>物流行业</p>";
    var content8 = " <p >心理行业</p>";
    $("#tab1_header1").html(content1);
    $("#tab1_header2").html(content2);
    $("#tab1_header3").html(content3);
    $("#tab1_header4").html(content4);
    $("#tab2_header1").html(content5);
    $("#tab2_header2").html(content6);
    $("#tab2_header3").html(content7);
    $("#tab2_header4").html(content8);
}
function  setTabbody(){
    var content1 = "<img src='images/map.jpg' alt='地图'>"+ "<p>js希望提升效率的您，是否还在为业务员、促销员、家政服务人员众多难管而头疼？行程管理可以帮您做到以下几点：1）严格执行工作计划；2）可通过手机随时随地向所有业务员、促销员、家政服务人员下达指令；3）掌握行程轨迹，确保费用合理；4）业务员、促销员、家政服务人员可通过手机随时发回现场数据，包括：现场图片等。最重要的是：您无需投入高昂的软件和硬件费用！了解详情，请点击 这里>></p>";
    var content2 = " <p>js22222222222222</p>";
    var content3 = "<p>333333333</p>";
    var content4 = " <p>44444444444444444444444444</p>";
    var content5 = "<img src='images/wm.jpg' alt='地图'>"+ "<p>js佛山运龙泰进出口有限公司位于中国广东省佛山市,是一家拥有多年不锈钢出口经验的工贸一体型企业，在不锈钢行业中处于领先地位。自2006年成立以来，秉承着 “先卖信誉，后卖产品” 的经营理念，始终把为客户提供优质服务放在首位，“你的信任，我的追求”是运龙泰的使命。因而在同行业中享有良好的商业信誉和口碑，产品远销东南亚、中东、欧洲、南美等国家。公司专业经营各类不锈钢冷轧卷板、平板、圆片、管、抛光机器、抛光材料、涂镀等产品，产品适用于金属制品、厨房五金、家用电器、日用五金等行业。公司拥有先进的生产设备，专业的技术队伍，高素质的管理人才，致力于提供高质价优的不锈钢产品，建立享誉全球的口碑，全力以赴为客户创造价值和成功。</p>";
    var content6 = " <p>js22222222222</p>";
    var content7 = "<p>333333333333</p>";
    var content8 = "<p>4444444444444444</p>";
    $("#tab1_body1").html(content1);
    $("#tab1_body2").html(content2);
    $("#tab1_body3").html(content3);
    $("#tab1_body4").html(content4);
    $("#tab2_body1").html(content5);
    $("#tab2_body2").html(content6);
    $("#tab2_body3").html(content7);
    $("#tab2_body4").html(content8);
}
/*内容页面*/
function setPagecontent(){
    var content = "<h1 class='text-center'>百名晋商重走崛起之路!</h1>"+
                "<div class='text-center'><div class='time'>日期：<span>2016-7-1</span>&nbsp;&nbsp;&nbsp;阅读数:<span>223</span></div></div>"+
                "<p>挖掘晋商发迹商路历史、探访当代优秀晋企成功基因、传承晋商精神、弘扬晋商文化……6月29日至7月1日，由山西省工商联指导，“重走万里茶路”活动组委会和晋商文化宣讲团组织，山西晚报与山西省民营经济研究会、山西晋商书画院和晋商文化宣讲团等共同参与的“晋商文化寻根溯源”考察研讨活动正式举行。晋商文化宣讲团发起单位负责人、相关专家学者，晋商发展智库成员、全省及全国其他商会组织负责人代表、省内外企业家代表、晋商书画院书画家，以及媒体记者近70人，走进晋中、吕梁和运城，探访新晋商，解读晋商文化，同时进行了省内外晋商组织和晋商企业的合作洽谈。</p>" +
        "<p>1、探访晋企　深度解读新晋晋商用勤劳的双手和智慧的头脑开拓了万里茶路，首创了百年票号，成就了货通天下、汇通天下的商业传奇。走进山西本土民营企业，追溯晋商传统文化，探寻新晋商精神，成为本次晋商文化寻根溯源活动的重要内容。从晋中开发区的东湖老陈醋醋博园，到位于太谷县的广誉远中药厂，再到位于吕梁汾阳市的杏花村汾酒博物馆、新晋商酒庄和白酒生产基地“中汾酒城”；从位于晋中灵石县两渡镇的山西聚义实业集团，再到位于运城市的亚宝集团、大运集团及山西诺维兰集团，寻根团一路马不停蹄，遍访晋商商路中具有较大影响力的本土民营企业，与作为新一代晋商的企业掌门人进行面对面沟通，了解本土晋企的企业文化，深度解读新晋商。1、探访晋企　深度解读新晋晋商用勤劳的双手和智慧的头脑开拓了万里茶路，首创了百年票号，成就了货通天下、汇通天下的商业传奇。走进山西本土民营企业，追溯晋商传统文化，探寻新晋商精神，成为本次晋商文化寻根溯源活动的重要内容。从晋中开发区的东湖老陈醋醋博园，到位于太谷县的广誉远中药厂，再到位于吕梁汾阳市的杏花村汾酒博物馆、新晋商酒庄和白酒生产基地“中汾酒城”；从位于晋中灵石县两渡镇的山西聚义实业集团，再到位于运城市的亚宝集团、大运集团及山西诺维兰集团，寻根团一路马不停蹄，遍访晋商商路中具有较大影响力的本土民营企业，与作为新一代晋商的企业掌门人进行面对面沟通，了解本土晋企的企业文化，深度解读新晋商。1、探访晋企　深度解读新晋晋商用勤劳的双手和智慧的头脑开拓了万里茶路，首创了百年票号，成就了货通天下、汇通天下的商业传奇。走进山西本土民营企业，追溯晋商传统文化，探寻新晋商精神，成为本次晋商文化寻根溯源活动的重要内容。从晋中开发区的东湖老陈醋醋博园，到位于太谷县的广誉远中药厂，再到位于吕梁汾阳市的杏花村汾酒博物馆、新晋商酒庄和白酒生产基地“中汾酒城”；从位于晋中灵石县两渡镇的山西聚义实业集团，再到位于运城市的亚宝集团、大运集团及山西诺维兰集团，寻根团一路马不停蹄，遍访晋商商路中具有较大影响力的本土民营企业，与作为新一代晋商的企业掌门人进行面对面沟通，了解本土晋企的企业文化，深度解读新晋商。</p>";
    $(".bdsharebuttonbox").before(content);
}
