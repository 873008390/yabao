function setmenu(){
		var contentStr = 
'                    <li class="dropdown"><a href="index.html">首页</a></li>'+
'                    <li class="dropdown down1"><a class="dropdown-toggle" data-toggle="dropdown">111关于亚宝</a>'+
'                        <ul class="dropdown-menu menu1">'+
'                            <li class="nav-line">'+
'                                <a class="fontsize"><b>11亚宝概况</b></a>'+
'                                <a class="fontsize" href="about.html">集团简介</a>'+
'                                <a class="fontsize" href="zuzhijiagou.html">组织结构</a>'+
'                                <a class="fontsize" href="dongshizhang.html">董事长寄语</a>'+
'                            </li>'+
'                            <li class="nav-line">'+
'                                <a class="fontsize"><b>亚宝荣誉</b></a>'+
'                                <a class="fontsize" href="chengzhang.html">成长历程</a>'+
'                            </li>'+
'                            <li class="nav-line">'+
'                                <a class="fontsize"><b>亚宝人</b></a>'+
'                                <a class="fontsize" href="gongsilinian.html">公司理念</a>'+
'                                <a class="fontsize" href="leader.html">领导关怀</a>'+
'                                <a class="fontsize" href="qiyeneikan.html">企业内刊</a>'+
'                                <a class="fontsize" href="dangjian.html">党建工作</a>'+
'                            </li>'+
'                        </ul>'+
'                    </li>'+
'                    <li class="dropdown down2"><a href="#" class="dropdown-toggle" data-toggle="dropdown">新闻中心</a>'+
'                        <ul class="dropdown-menu menu2">'+
'                            <li class="nav-line"><a class="fontsize" href="newslist.html"><b>公司新闻</b></a></li>'+
'                            <li class="nav-line"><a class="fontsize" href="hangyenewslist.html"><b>行业资讯</b></a></li>'+
'                        </ul>'+
'                    </li>'+
'                    <li class="dropdown down3"><a href="#" class="dropdown-toggle" data-toggle="dropdown">品牌产品</a>'+
'                        <ul class="dropdown-menu menu3">'+
'                            <li class="nav-line">'+
'                                <a class="fontsize" href="product.html"><b>亚宝产品</b></a>'+
'                                <a class="fontsize" href="bjresearch.html">儿童用药</a>'+
'                                <a class="fontsize" href="heartproduct.html?menuid=47">心脑血管用药</a>'+
'                                <a class="fontsize" href="womenproduct.html?menuid=48">妇科用药</a>'+
'                                <a class="fontsize" href="healthproduct.html?menuid=49">大健康</a>'+
'                            </li>'+
'                            <li class="nav-line">'+
'                                <a class="fontsize"><b>研发与合作</b></a>'+
'                                <a class="fontsize" href="bjresearch.html">北京研究院</a>'+
'                                <a class="fontsize" href="szresearch.html">苏州研发公司</a>'+
'                                <a class="fontsize" href="oversearesearch.html">国际研发合作</a>'+
'                            </li>'+
'                            <li class="nav-line">'+
'                                <a class="fontsize"><b>透皮给药系统山西省重点实验室</b></a>'+
'                                <a class="fontsize" href="tplab.html">实验室概况</a>'+
'                                <a class="fontsize" href="researcharea.html">组织架构</a>'+
'                                <a class="fontsize" href="openresearch.html">科研成果</a>'+
'                                <a class="fontsize" href="researcharea.html?menuid=36">交流活动</a>'+
'                                <a class="fontsize" href="openresearch.html?menuid=37">联系我们</a>'+
'                            </li>'+
'                        </ul>'+
'                    </li>'+
'                    <li class="dropdown down4"><a href="#" class="dropdown-toggle" data-toggle="dropdown">国际化</a>'+
'                        <ul class="dropdown-menu menu4">'+
'                            <li class="nav-line">'+
'                                <a class="fontsize" href="oversea.html"><b>国际业务</b></a>'+
'                                <a class="fontsize" href="oversea.html">国际合作</a>'+
'                                <a class="fontsize" href="yuanliao.html">原料销售</a>'+
'                                <a class="fontsize" href="overseaproduct.html">产品销售</a>'+
'                            </li>'+
'                        </ul>'+
'                    </li>'+
'                    <li class="dropdown down5"><a href="#" class="dropdown-toggle" data-toggle="dropdown">社会责任</a>'+
'                        <ul class="dropdown-menu menu5">'+
'                            <li class="nav-line"><a class="fontsize" href="gongyi.html"><b>社会公益</b></a><a'+
'                                    class="fontsize" href="gongyi.html">扶贫</a><a class="fontsize"'+
'                                                                                 href="zhucan.html">助残</a><a'+
'                                    class="fontsize" href="jiuzai.html">救灾</a><a class="fontsize"'+
'                                                                                 href="zhuxue.html">助学</a><a'+
'                                    class="fontsize" href="huanbao.html">环保</a></li>'+
'                        </ul>'+
'                    </li>'+
'                    <li class="dropdown down6"><a href="#" class="dropdown-toggle" data-toggle="dropdown">投资者关系</a>'+
'                        <ul class="dropdown-menu menu6">'+
'                            <li class="nav-line"><a class="fontsize" href="gufeninfo.html"><b>股份资料</b></a></li>'+
'                            <li class="nav-line"><a class="fontsize" href="zhangcheng.html"><b>公司章程</b></a></li>'+
'                            <li class="nav-line"><a class="fontsize" href="gonggao.html"><b>公司公告</b></a></li>'+
'                            <li class="nav-line"><a class="fontsize" href="caiwureport.html"><b>董事会</b></a></li>'+
'                            <li class="nav-line"><a class="fontsize" href="jiaoyu.html"><b>投资者教育</b></a></li>'+
'                        </ul>'+
'                    </li>';
		$("#nav").html(contentStr);
}
function setcopyright(){
				$("#copyright").html(
									"<p>Copyright &copy; 互联网药品信息服务资格证书：(晋)-非经营性-2008-0007</p>"+
				           			" <p>"+ (new Date()).getFullYear() +" 2010@亚宝药业集团股份有限公司 | 晋ICP备15001663号</p>");
}

function getvideo(){
				var contentStr = "";
				var content = "";
					contentStr += "<video id='demo3' poster='images/s1.jpg' controls width='380' height='265' preload='auto' style='background: #000;'>"
					+"<source type='video/mp4' src='' />"
					+"</video>"
					+"<script>"
					+" var video1=document.getElementById('demo3');"
					+"video1.onclick=function(){"
					+"if(video1.paused){"
					+" video1.play();"
					+" }else{"
					+"video1.pause();"
					+" }"
					+"}"
					+"</script>";
					content = "<a href='about.html target='_blank'>11亚宝集团集药品研发、生产、物流、零售和中药材种植于一体，是山西省医药行业首家股票上市公司和首批认定的高新技术企业。公司下设5个分公司、13个控股子公司，有员工近6000人，资产总额28亿元，年销售收入22亿元，年创利税4亿多元，跻身全国制药企业百强。专利名牌产品丁桂儿脐贴，名优产品红花注射液、珍菊降压片等独具特色与优势，形成了治疗心脑血管病、妇科及儿科病的药物强势，响誉全国，声名远播。</a>";
				$("#video").html(contentStr);
				$("#aboutus").html(content);	
}
function getnewslist() {
		var contentStr = "";
		var topnew = "";
		topnew = 
'            <img src="images/i1.jpg" alt=""/>'+
'            <div class="zhezhao">'+
'            </div>'+
'            <div class="zhezhao-con" >'+
'                <div><a class="news-tit" href="">学习传统文化 打造卓越团队</a></div>'+
'                <div class=""><a class="news-con" href="">11月28日—29日，由集团文化宣传部组织举办的亚宝药业《弟子规》培训在集团公司三楼会议室举行。此次培训特邀清华...</a></div>'+
'                <div class="news-more"><a class="xiangqing-news">查看详情</a></div>'+
'            </div>';


		contentStr =
'<ul>'+
'    <li><a href="news.html">11亚宝药业对外投资公告</a><span>2015-11-16</span></li>'+
'    <li><a href="news.html">亚宝药业：坚持质量零容忍，严控不合格产品流入市场</a><span>2015-11-15</span></li>'+
'    <li><a href="news.html">亚宝员工在全市职工合唱艺术节上精彩亮相</a><span>2015-10-16</span></li>'+
'    <li><a href="news.html">亚宝药业关于通过新版GMP认证的公告</a><span>2015-10-10</span></li>'+
'    <li><a href="news.html">山西省重点实验室透皮给药系统研讨会在京举行</a><span>2015-10-06</span></li>'+
'    <li><a href="news.html">运城电视台专访王鹏博士 创新，让我们相约亚宝</a><span>2015-09-16</span></li>'+
'</ul>';			
				$("#topnew").html(topnew);
				$("#newslist").html(contentStr);
			
}
function getBrandProduct() {
	var contentStr = "";
		contentStr = 
'                    <ul class="JQ-slide-content imgList">'+
'                        <li>'+
'                            <a href="#" class="img"><img src="images/p5.png" width="256" height="256"/></a>'+
'                            <a href="#" class="txt">111儿童用药</a>'+
'                        </li>'+
'                        <li>'+
'                            <a href="#" class="img"><img src="images/p6.png" width="256" height="256"/></a>'+
'                            <a href="#" class="txt">心脑血管用药</a>'+
'                        </li>'+
'                        <li>'+
'                            <a href="#" class="img"><img src="images/p7.png" width="256" height="256"/></a>'+
'                            <a href="#" class="txt">妇科用药</a>'+
'                        </li>'+
'                        <li>'+
'                            <a href="#" class="img"><img src="images/p8.png" width="256" height="256"/></a>'+
'                            <a href="#" class="txt">大健康</a>'+
'                        </li>'+
'                        <li>'+
'                            <a href="#" class="img"><img src="images/p6.png" width="256" height="256"/></a>'+
'                            <a href="#" class="txt">心脑血管用药</a>'+
'                        </li>'+
'                    </ul>'+
'<script>'+
'    $(".hotPic .JQ-slide").Slide({'+
'        effect: "scroolLoop",'+
'        autoPlay: false,'+
'        speed: "normal",'+
'        timer: 3000,'+
'        steps: 1'+
'        });'+
'        $(".call").hover(function () {'+
'        $(\'.pre\').toggle();'+
'        });'+
'        $(".call").hover(function () {'+
'        $(\'.nex\').toggle();'+
'    });'+
'</script>';
				$("#BrandProduct").html(contentStr);		
}
function getInnovate() {
	var contentStr = "";
		contentStr = 
'                <ul>'+
'                    <li><a href="tplab.html">111透皮重点实验室</a></li>'+
'                    <li><a href="oversearesearch.html">国家重点实验室</a></li>'+
'                    <li><a href="bjresearch.html">研发与合作</a></li>'+
'                    <li><a href="oversea.html">亚宝国际</a></li>'+
'                </ul>';		
				$("#innovate").html(contentStr);
}
function getProductType() {
	var contentStr = "";
		contentStr =
'                 <select>'+
'                     <option value="allprod">全部产品</option>'+
'                     <option value="volvo">11儿童用药</option>'+
'                     <option value="saab">心脑血管用药</option>'+
'                     <option value="opel">妇科用药</option>'+
'                     <option value="audi">大健康</option>'+
'                 </select>';
				$("#ProductType").html(contentStr);			
}
function getProductContent() {
	var contentStr = "";
		contentStr =
'                                <a class="category" name="A"></a>'+
'                                <h3>A</h3>'+
'                                <div class="views-row">'+
'                                    <div class="views-field" onmouseover="this.style.cursor=\'hand\'" onclick="if (a1.style.display==\'none\'){a1.style.display=\'\';}else{a1.style.display=\'none\';}">'+
'                                        <a><span class="zhankai">阿奇霉素注射液</span><span class="field-class">注射剂®</span></a>'+
'                                    </div>'+
'                                    <div class="field-content" id="a1"  style="display:none;">'+
'                                        <div class="views-field views-field-field-therapy-areas">'+
'                                            <a>用于肺炎衣原体、金黄色葡萄球菌等引起的社区获得性肺炎，还有沙眼衣原体、淋病双球菌、人型支原体等引起的盆腔炎等。</a>'+
'                                        </div>'+
'                                        <img class="pro-img" src="images/produc_06.jpg">'+
'                                    </div>'+
'                                </div>'+
'                                <div class="views-row">'+
'                                    <div class="views-field" onmouseover="this.style.cursor=\'hand\'" onclick="if (a2.style.display==\'none\'){a2.style.display=\'\';}else{a2.style.display=\'none\';}">'+
'                                        <a><span class="zhankai">丁桂儿脐贴</span></a>'+
'                                    </div>'+
'                                    <div class="field-content" id="a2"  style="display:none;">'+
'                                        <div class="views-field views-field-field-therapy-areas">'+
'                                            <a>健脾温中，散寒止泻。适用于小儿泄泻，腹痛的辅助治疗。采用现代脐贴疗法，儿童使用人次超过10亿，药物通过脐部即时释放快速吸收，药效直达肠胃，有效，方便，安全，拉肚子贴红色止泻装，不吃饭贴绿色消化装。</a>'+
'                                        </div>'+
'                                        <img class="pro-img" src="images/produc_07.jpg">'+
'                                    </div>'+
'                                </div>'+
'                                <div class="views-row">'+
'                                    <div class="views-field" onmouseover="this.style.cursor=\'hand\'" onclick="if (a3.style.display==\'none\'){a3.style.display=\'\';}else{a3.style.display=\'none\';}">'+
'                                        <a><span class="zhankai">单硝酸异山梨酯注射液</span></a>'+
'                                    </div>'+
'                                    <div class="field-content"  id="a3"  style="display:none;">'+
'                                        <div class="views-field views-field-field-therapy-areas">'+
'                                            <a>主要用于冠心病的长期治疗，心绞痛的预防还有心肌梗死后持续心绞痛的治疗。与洋地黄和/ 或利尿剂联用，还可用于治疗慢性充血性心力衰竭。</a>'+
'                                        </div>'+
'                                        <img class="pro-img" src="images/produc_08.jpg">'+
'                                    </div>'+
'                                </div>';
				$(".product-group-item").html(contentStr);	
}
function getGrowthProcess() {
	var contentStr = "";
		contentStr =
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-picture">'+
'                                <img src="img/cd-icon-picture.svg" alt="Picture">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1978年2月</h2>'+
'                                <p>111原苪城职工医院制剂室的职工，靠10万元资金起步，创建成立了芮城制药厂。</p>'+
'                                <!--<a href="" class="cd-read-more" target="_blank">阅读全文</a>-->'+
'                                <span class="cd-date">1978-02-06</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-movie">'+
'                                <img src="img/cd-icon-movie.svg" alt="Movie">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1983年起</h2>'+
'                                <p>1983年起，企业经营开始滑坡，到1990年底，亏损达120余万元，濒临倒闭。</p>'+
'                                <span class="cd-date">1983年</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-picture">'+
'                                <img src="img/cd-icon-picture.svg" alt="Picture">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1990年11月</h2>'+
'                                <p>任武贤临危受命，出任厂长，改革管理体制，开发新产品，企业重新焕发活力。</p>'+
'                                <span class="cd-date">1900-11</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-movie">'+
'                                <img src="img/cd-icon-movie.svg" alt="Movie">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1991年</h2>'+
'                                <p>实现企业扭亏为盈。</p>'+
'                                <span class="cd-date">1991年</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-picture">'+
'                                <img src="img/cd-icon-picture.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1992年</h2>'+
'                                <p>企业采用新工艺生产的维脑路通（曲克芦丁）原料药，以成本低、质量高的优势占领了和市场，稳定了企业发展。</p>'+
'                                <span class="cd-date">1992年</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-movie">'+
'                                <img src="img/cd-icon-location.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1993年</h2>'+
'                                <p>1993年“宝宝一贴灵”（丁桂儿剂贴）研发成功后，通过中央电视台等媒体的广告宣传，成为蜚声国内的名牌产品，企业各项经济指标翻番增长。</p>'+
'                                <span class="cd-date">1993年</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-picture">'+
'                                <img src="img/cd-icon-picture.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1996年底</h2>'+
'                                <p>企业年产值突破1亿元，利税超千万元，开创了苪城工业的先河，并完成了对当地破产的原云河制药厂、外贸公司、植物提取厂的兼并收购后，着手组建企业集团。</p>'+
'                                <span class="cd-date">1996年底</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-movie">'+
'                                <img src="img/cd-icon-location.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>1999年1月</h2>'+
'                                <p>由苪城制药厂联合4家法人企业共同发起设立的“山西亚宝药业集团股份有限公司”正式批准成立，任武贤出任董事长兼总经理。</p>'+
'                                <span class="cd-date">1999年1月</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-picture">'+
'                                <img src="img/cd-icon-movie.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>2002年9月26日</h2>'+
'                                <p>亚宝药业在经历了“额度制”、“双高认证”、“核准制”后，A股股票在上海证券交易所成功上市。股票上市后，公司积极实施资本运营，加大科研研发力度，做大亚宝品牌，先后成立了亚宝大同、亚宝新龙、亚宝光泰、亚宝经销等控股子公司，建设了风陵渡、太原两大工业园，开发了一批新产品。</p>'+
'                                <span class="cd-date">2002年9月26日</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-movie">'+
'                                <img src="img/cd-icon-location.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>2005年8月</h2>'+
'                                <p>苪城县政府在公司的国有资产适度退出。</p>'+
'                                <span class="cd-date">2005年8月</span>'+
'                            </div>'+
'                        </div>'+
'                        <div class="cd-timeline-block">'+
'                            <div class="cd-timeline-img cd-picture">'+
'                                <img src="img/cd-icon-movie.svg" alt="Location">'+
'                            </div>'+
'                            <div class="cd-timeline-content">'+
'                                <h2>2006年2月</h2>'+
'                                <p>按照中国证监会要求，公司完成了股票分置改革，为进一步实施资本运营和参与国际竞争奠定了基础。</p>'+
'                                <span class="cd-date">2006年2月</span>'+
'                            </div>'+
'                        </div>';
				$("#cd-timeline").html(contentStr);		
}
$(document).ready(function(){
/*首页内容*/
/*	setcopyright();
	setmenu();
	getvideo();
 	getnewslist();
 	getBrandProduct();
 	getInnovate();

/*产品页内容*/ 
 /*	getProductType();
 	getProductContent();*/
/*成长历程*/
	getGrowthProcess(); 	
});


            