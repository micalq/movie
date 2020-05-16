module.exports={
  devServer:{
    // host:"localhost",
    // port:8080,
    proxy:{
        "/api":{
          target:"http://39.97.33.178",
          changeOrigin:true,
          // pathRewrite:{
          //   "/api":""
          // }
        }
    }
  }
}
