<template>
  <div class="message" v-if="showMessage">
      <div class="title"><h2>定位</h2></div>
      <p>{{city}}</p>
      <div class="btn">
        <div @touchend="showMessage=false">取消</div>
        <div @touchend="change">切换定位</div>
      </div>
  </div>
</template>
<script>
export default {
        data() {
          return {
            city:"北京",
              showMessage:false,
          }
        },
         mounted () {
            setTimeout(() => {
            this.getCity()
            }, 3000);
        },
        methods: {
            async getCity(){
              const {data:res}=await this.axios.get("/api/getLocation")
              const nm=res.data.nm;
              const id=res.data.id;
                      if(this.$store.state.id==id)  return;
                         this.showMessage=true
                    // console.log(nm);
                    if(res.status==0){
                      this.city=nm
                    }
                    // console.log(this.$store.state.id==id);
                    this.change(nm,id)
            },
            change(nm,id){
                       window.localStorage.setItem("nowNm",nm);
                window.localStorage.setItem("nowId",id);
                    window.location.reload();
                    this.showMessage=false
                    }
        }
}
</script>
<style scoped>
.message{
  width: 200px;
  height: 140px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 2px #eee;
  text-align: center;
  position: fixed;
    top: 200px;
    left: 100px;
    overflow: hidden;
}
  .title{
    margin-top: 10px;
  }
  p{
    margin-top: 20px;
  }
  .btn{
    display: flex;
    margin-top: 20px;
  }
  .btn div{
    flex: 1;
    border-top: 1px solid;
    height: 40px;
    line-height: 40px;
  }
  .btn div:nth-child(1){
    border-right: 1px solid;
  }
</style>
