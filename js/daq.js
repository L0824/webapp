var vm = new Vue({
	el : '#app',
	data : {},
	methods:{
		gotoTop:function(){
            $(".toTop").tooltip("toTop",{
                'movespeed':'300',
                'showspeed':'300',
                'overheight':'400'
            });
        }
	},
	mounted:function(){
		this.gotoTop(); 
	}

})