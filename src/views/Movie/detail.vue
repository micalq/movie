<template>
 	<div id="detail" class="qq">
		<Header id="header">
			<i class="iconfont icon-right" @touchstart="goback"></i>
		</Header>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" v-if="detail.img" :style="{'background-image':'url('+detail.img.replace(/w\.h/,'150.210')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img" v-if="detail.img">
						<img :src="detail.img|setWH('110.140')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detail.nm}}</h2>
						<p>{{detail.enm}}</p>
						<p>想看{{detail.wish}}</p>
						<p>{{detail.cat}}</p>
						<p>{{detail.src}} / {{detail.dur}}分钟</p>
						<p>{{detail.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detail.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="photo">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item, index) in detail.photos" :key="index">
						<div v-if="item">
							<img :src="item|setWH('100.140')" alt="">
						</div>
						<p>{{item.star}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
      import Header from '@/components/header'
export default {
        name:"detail",
        data() {
          return {
            title:"电影详情",
            detail:{},
          }
        },
        props:["movieId"],
        components: {
          Header
        },
        mounted() {
          console.log(this.movieId)
          this.getDetail()
        },
        methods: {
          goback(){
            this.$router.back()
          },
         async getDetail(){
              const {data:res}=await this.axios.get(`/api/detailmovie?movieId=${this.movieId}`)
              if(res.status==0){
                this.detail=res.data.detailMovie;
                console.log(this.detail);
              }
              this.$nextTick(()=>{
                new Swiper(this.$refs.photo , {
		slidesPerView : 'auto',
		freeMode : true,
		freeModeSticky: true
	});
              })
          }
        },

}
</script>
<style scoped>
#detail{width: 100%;min-height: 100%;position: absolute;left: 0;top: 0;background-color: #fff;z-index: 10;}
.qq{animation: trans .6s linear;}
@keyframes trans{
      from{
        transform: translateX(100%);
      }to{
        transform: translateX(0%);
      }
}
#content.contentDetail{ display: block; margin-bottom:0;margin-top: 52px;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; height: 40px; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>
