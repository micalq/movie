import Vue from 'vue';
import VueRouter from 'vue-router';
// import Cinema from '@/views/Cinema'

Vue.use(VueRouter);
const routes = [
    {path:"*/",redirect: "/movie"},
      {path:"/cinema",component:()=>import("@/views/Cinema")},//路由按需加载
      {path:"/mine",component:()=>import("@/views/Mine")},
      {path:"/movie",component:()=>import("@/views/Movie"),redirect:"/movie/nowplaying",
      children:[
        {path:"city",component:()=>import("@/components/City")},
        {path:"comingsoon",component:()=>import("@/components/Comingsoon")},
        {path:"nowplaying",component:()=>import("@/components/Nowplaying")},
        {path:"search",component:()=>import("@/components/Search")},
        {path:"detail/1/:movieId",components:{
            detail:()=>import("@/views/Movie/detail"),
            default:()=>import("@/components/Nowplaying")
        },
            props:{//路由组件传参
              detail:true
            }
      },
        {path:"detail/2/:movieId",components:{
            detail:()=>import("@/views/Movie/detail"),
            default:()=>import("@/components/Comingsoon")
        },
            props:{//路由组件传参
              detail:true
            }
      }
      ]},
      // {path:"/cinema",component:Cinema},
];
Vue.component({
  // Cinema,
})
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
