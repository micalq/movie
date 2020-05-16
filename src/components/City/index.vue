<template>
   <div class="city_body">
				<div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="(item) in hotCity" :key="item.id">{{item.nm}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="toCity">
						<div v-for="(item) in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="(itemList) in item.list" :key="itemList.id">{{itemList.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="city_index">
					<ul>
						<li v-for="(item,index) in cityList" :key="item.index" @touchstart="toCitylist(index)">{{item.index}}</li>
					</ul>
				</div>

			</div>
</template>
<script>
export default {
    data() {
      return {
        cityList:[],//全部城市集合
        hotCity:[],//热门城市集合
      }
    },
    mounted() {
        this.getCityList()
    },
    methods: {
      getCityList(){
        this.axios.get("/api/cityList").then((res)=>{
          // console.log(res);
          if (res.data.msg=="ok") {
            let cities=res.data.data.cities;
         const {cityList,hotCity}= this.formatCity(cities);
            this.cityList=cityList;
            this.hotCity=hotCity;
            // console.log(cityList);
          }
        })
      },
      formatCity(cities){ //格式化城市
        let cityList=[],hotCity=[];
          for(let i=0,len=cities.length;i<len;i++){//热门城市
                if (cities[i].isHot) {
                  hotCity.push(cities[i])
                }
          }
          console.log(hotCity)
        for(let i=0,len=cities.length;i<len;i++){
          let firstLetter=cities[i].py.substring(0,1).toUpperCase();//取出城市首字母进行比较
            if   (toCom(firstLetter)) {
              cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
            } else {
                for(let j=0,len=cityList.length;j<len;j++){
                  if (cityList[j].index==firstLetter) {
                    cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                  }
                }
            }
        };
        cityList.sort((a,b)=>{
            if (a.index>b.index) {
              return 1
            } else if(a.index<b.index){
              return -1
            }else{
              return 0
            }
        })
        function toCom(firstLetter){
        for(let i=0,len=cityList.length;i<len;i++){
          if (cityList[i].index==firstLetter) {
              return false
          }
        }
        return true;
      }
      // console.log(cityList);
      return{
        cityList,hotCity
      }
      },
      toCitylist(i){//跳转到城市
      // console.log(i)
      var h2=this.$refs.toCity.getElementsByTagName("h2");
      // console.log(h2);
      // console.log(this.$refs.toCity.parentNode);
            this.$refs.toCity.parentNode.scrollTop = h2[i].offsetTop;
            // console.log(1);
      }
    }
}
</script>
<style >
#content .city_body{ display: flex; width:100%; position: relative; top: 0;bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px;  text-align: center; border-left:1px #e6e6e6 solid;position: fixed; top:20% ;right:0;}
</style>
