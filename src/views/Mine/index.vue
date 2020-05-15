<template>
  <div id="main">
    <Header title="我的喵喵"/>
    <Login/>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import Login from '@/components/Login'
export default {
    name:"Mine",
    components:{
    Header,
    Footer,
    Login
  }
}
</script>
<style>

</style>
