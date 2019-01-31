var vm = new Vue({
	el:'#app',
	data(){
      baseUrl:null,
      newsList:null,
      metaList:null,
      intelData:[],
      lastedData:[]

	},
	created(){
      
	},
	mounted(){
      

	},
	methods:{
		getUrl(){
			_this = this;
			$.ajax({
				url:'../../api.json',
				type:'get',
				dataType:'json',
				success:function(data){
                   _this.baseUrl = data.result.baseUrl;
				},
				error:function(){
					console.log(error)
				}
			})
		},
		showNewsData(num){
            var _this = this;
            var apiUrl = this.baseUrl + '/manage/newsApi/getNewsByNum/' + num;
            axios.get(apiUrl).then((res)=>{
               var datas = res.data;
               _this.newsList = datas;
               _this.newsList.forEach((element)=>{
               	  element.content = unescape(unescape(element.content))
               }).catch((error)=>{
               	console.log(error)
               })
            })
		}

	}

})
