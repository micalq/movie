<template>
 	<div class="cinema_body">
				<ul>
					<li v-for="(item) in cinemaList" :key="item.id">
						<div>
							<span>{{item.nm}}</span>
							<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{item.addr}}</span>
							<span>{{item.distance}}</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
                      <!-- <div v-for="(item1,key) in item.tag" :key="key"><span v-if="item1===1"></span></div> -->
       					</div>
					</li>
				</ul>
			</div>
</template>
<script>
export default {
        data() {
          return {
              cinemaList:[],
              originId:-1,
          }
        },
        mounted() {
            this.getCinemaList()
        },
        methods: {
       async  getCinemaList(){
         let cityId=this.$store.state.id
         if(this.originId==cityId) return;
          const {data:res}= await this.axios.get(`/api/cinemaList?cityId=${cityId}`);
            // console.log(res);
              if (res.msg=="ok"&&res.data.cinemas) {
                this.cinemaList=res.data.cinemas;
                this.originId=cityId
              }
              // console.log(this.cinemaList)
          }
        },
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;margin-top: -40px;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
