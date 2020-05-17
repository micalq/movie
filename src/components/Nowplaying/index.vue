<template>
      <div class="movie_body" ref="movie">
   <!-- <Loading v-if="isLoading"> -->
				<ul >
	<li v-for="(item) in movieList" :key="item.id" >
						<div class="pic_show"><img :src="item.img|setWH('130.180')" @touchstart="toDetail(item.id)"></div>
						<div class="info_list">
							<h2  @touchstart="toDetail(item.id)">{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
							<p>想看: <span class="grade">{{item.wish}}</span></p>
							<p>主演: {{item.star}}</p>
							<p>{{item.rt}}</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul>
   <!-- </Loading> -->
  </div>
</template>
<script>
// import Scroll from 'better-scroll'
export default {
      data() {
        return {
          movieList:[],//电影列表集合
          isLoading:true,
          originId:-1,//原始id
        }
      },
      activated(){//激活keep-alive时调用
        this.getMovieList()
      },
      methods: {
       async getMovieList(){
         let cityId=this.$store.state.id;
        //  console.log(1,cityId);
         if(this.originId==cityId) return;//如果id相等则没切换城市不继续执行
        const {data:res}= await this.axios.get(`/api/movieOnInfoList?cityId=${cityId}`);
        console.log(res);
            if (res.msg=="ok") {
              this.movieList=res.data.movieList;
              this.isLoading=false;
            this.originId=cityId
                /* this.$nextTick(()=>{
                let scroll=new Scroll(this.$refs.movie,{
                          tab:true,
              })
                      console.log(scroll);//hasVerticalScroll: false
                      scroll.on("scroll",()=>{
                        console.log(1)
                      })
                } ) */
            }
        },
        toDetail(movieId){
          // console.log(movieId);
                // this.$router.push(`/movie/detail/${movieId}`)
                this.$router.push("/movie/detail/1/"+movieId)
        }
      },
}
</script>
<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:90px 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
