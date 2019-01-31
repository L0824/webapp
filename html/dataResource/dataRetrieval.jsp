<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="renderer" content="webkit" />
<meta name="force-rendering" content="webkit" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<script>/*@cc_on window.location.href="http://support.dmeng.net/upgrade-your-browser.html?referrer="+encodeURIComponent(window.location.href); @*/</script>
<title>数据检索</title>
<link rel="icon" type="image/x-icon" href="../../images/favicon.ico" />
<link rel="stylesheet" href="../../css/commoncss/bootstrap.min.css">
<link rel="stylesheet" href="../../js/commonjs/bootstraptable/bootstrap-table.css">
<link rel="stylesheet" href="../../font/iconfont.css">
<link rel="stylesheet" href="../../css/commoncss/normalize.css">
<link rel="stylesheet" href="../../css/commoncss/common_header.css">
<link rel="stylesheet" href="../../css/commoncss/common_footer.css">
<link rel="stylesheet"
	href="../../js/commonjs/layui-v2.4.3/layui/css/layui.css">
<link rel="stylesheet" href="../../css/commoncss/common.css">
<link rel="stylesheet" href="../../css/dataResource.css">
<link rel="stylesheet" href="../../css/dataRetrieval.css">

<style>
[v-cloak] {
	display: none;
}
</style>
</head>
<body>
	<template type="text/x-template" id="search">
	<div class="main-right-box flex-right">
		<!-- 标题 s -->
		<div class="right-title">
			<div class="title">数据检索</div>
			<div class="line">
				<div class="info">
					<i class="iconfont icon-yichang"></i><span>下列检索条件都需填写，其中时间条件为世界时</span>
				</div>
			</div>
		</div>
		<!-- 标题 e -->
		<!-- form表单 s -->

		<form action="" class="js-form layui-form">
			<!-- 日期选择 s-->
			<div class="date flex-row">
				<label for="" class="label-n"><i class="red">*</i>日期选择：</label>
				<div class="date-s">
					<div class="date-box">
						<input type="text" class="layui-input" id="d-from">
					</div>
					<span class="m-line">-</span>
					<div class="date-box">
						<input type="text" class="layui-input" id="d-to">
					</div>
				</div>
			</div>
			<!-- 日期选择 e-->
			<!-- 台站选择 s-->
			<div class="zhantai flex-row">
			<label for="" class="label-n"><i class="red">*</i>站台选择：</label>
			<div class="ztbox">
				<!-- 地图选择 s -->
				<a href="javascript:;" class="a-btn" @click="openMap">地图选择</a>
				<span class="mark">未选择地图区域</span>
				<span id="location"></span>
				<!-- 地图选择 e -->
			<!-- <div class="zt-select clearfix">
			<dl>
			<dt v-for="(item,i) in citys">
				<a :class="{'cur':index == i}" @click="selectZT(i)">
					<span class="a0">{{item.name}}</span>
					<div class="icon-cancel">
						<i class="icon_false"></i>
					</div>
											
				</a> 
			</dt>
			</dl>
			</div> -->
			<!-- <div class="zt-selected">
			<label for="" ><input type="checkbox" lay-filter="city"  title="全部" lay-skin="primary" ></label>
			<div class="items-box">
			<dl>
			<dt v-for="(item,index) in citys[0]['station']">
			<a :class="{'cur':checkedTags[index]}" @click="selectCity(index)"> 
                                                <span class="a1">[{{item.StationID}}]{{item.CNAME}}</span>
                                                <div class="icon-cancel icon-cancel-red" @click="cancelSelect(index)">
                                                    <i class="icon_false"></i>
                                                </div>
                                            </a> 
			</dt>
			</dl>
			</div>
			<! 展开按钮 s-->
			<!-- <div class="toggle-btn" @click="slideDown">
				<i class="iconfont icon-drop-down"></i>
			</div> -->
			<!-- 展开按钮 e-->
			<!-- </div> --> 
			</div>
			</div>
			<!-- 台站选择 e-->
			<!-- 要素选择 s -->
			<div class="yaosu flex-row">
				<label for="" class="label-n"><i class="red">*</i>要素选择：</label>
				<div class="yaosubox" v-if="tags.length>0">
					<div class="ys-selected">
						<dl>
							<dt>
								<a><span class="a0"><input type="checkbox" lay-skin="primary" lay-filter="yaosu" title="全部"></span></a>
							</dt>
							<dt v-for="(item,index) in yaosu">
								<a :class="{'cur':tags[index]['flag']}"
									@click="selectYS(item,index)"> <span class="a0">{{item.name}}</span>
									<div v-show="tags[index]['icon']" class="icon-cancel icon-cancel-red"
										@click.stop="cancelYS(index)">
										<i class="icon_false"></i>
									</div>

								</a>
							</dt>
						</dl>

					</div>
				</div>
			</div>
			<!-- 要素选择 e -->
			<!-- 检索按钮 s -->
			<div class="search-btn">
				<a href="javascript:history.back(-1)" class="a-btn a-back"> <i
					class="iconfont icon-fanhui"></i> <span>返回</span>
				</a> 
				<a href="javascript:;" class="a-btn" @click="search"> <i
					class="iconfont icon-sousuo"></i> <span>确定检索</span>
				</a>


			</div>
			<!-- 检索按钮 e -->
		</form>
		<!-- form表单 e -->
	</div>
	</template>
	<div class="page-wrapper" id="app" v-cloak>
		<!-- 头部 start-->
		<head-nav ></head-nav>
		<!-- 头部 end-->
		<!-- 内容 start-->
		<div class="main-container">
			<div class="g-container">
				<div class="page-nav">
					<span class="last-page">数据服务</span><span class="arrow-icon">&gt;</span><span>数据检索</span>
				</div>
				<div class="cnt-box">
					<div class="main-left  white radius">
						<div class="category-wrapper" v-if="categoryArr">
							<div class="main-title-box">
								<div class="bg"></div>
								<span class="main-title"> <span class="title">数据分类</span>
									<span class="border-line"></span> <span class="all"
									@click="showAllData">(全部)</span>
								</span>
							</div>
							<div class="category-content-box"
								v-for="(item,index) in categoryArr">
								<div class="category-content">
									<h4 class="menu-title">
										<i class=" icon-category iconfont" :class="item.icon"></i>{{item.name}}
									</h4>
									<ul class="submenu-ul">
										<li v-for="(x,subindex) in item.list"
											:class="{'cur':(x.id==dataGroupId)}"><a
											href="javascript:void(0)" class="a-hover"
											@click="changeRight(x.id)">{{x.name}}</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div id="rightTypeDiv" class="main-right">
						<!-- 右侧组件 start-->
						<search></search>
						<!-- 右侧组件 end-->
					</div>
				</div>
			</div>
		</div>
		<!-- 内容 end-->
		<!-- 底部 start-->
		<foot></foot>
		<!-- 底部 end-->
		<!-- 回到顶部 start-->
		<div class="toTop">
			<i class="iconfont icon-gengduo"></i>
		</div>
		<!-- 回到顶部 end-->
	</div>
		
	<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
	<script src="../../js/commonjs/polyfill.min.js"></script>
	<script src="../../js/commonjs/jquery-3.2.1.min.js"></script>
	
	
	<script src="../../js/commonjs/layui-v2.4.3/layui/layui.js"></script>
	<script src="../../js/commonjs/vue.min.js"></script>
	<script src="../../js/commonjs/axios.min.js"></script>
	<!-- <script src="../../js/commonjs/getUser.js"></script> -->
	<script>
		$(document).ready(function(){
			//var loginName = "${sessionScope['user'].loginName}";
			var loginName = "${sessionScope['user'].userName}";
			sessionStorage.setItem("loginName",loginName)
			// console.log(loginName)
		});
	</script>
	<script src="../../js/commonjs/footer.js"></script>
	<script src="../../js/commonjs/toTop.js"></script>
	<script src="../../js/dataResource/dataRetrieval.js"></script>
	<script src="../../js/commonjs/header.js"></script>
</body>