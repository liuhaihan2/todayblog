<template>
  <div>
    <form action="" role="form" id="form2" class="form" style="">
      <h2 style="color:mediumpurple">登&nbsp;&nbsp;&nbsp;&nbsp;录</h2>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="账号名" v-model="name">
        <i class="iconfont icon-zhanghu" style=""></i>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="密码" v-model="password">
        <i class="iconfont icon-yuechi"></i>
      </div>
      <button class="form-control btn" @click="login" :disabled="sendFlag">登录</button>

    </form>
    <router-link to="/home" tag="button" class="btn btn2">返回首页</router-link>
  </div>
</template>

<script>
  import store from '@/store/index'
  import {mapActions,mapState} from 'vuex'
  import axios from 'axios'
    export default {
        name: "Login",
        // computed:{
        //   ...mapState(['user'])
        // },
        data(){
          return{
            name: null,
            password: null,
            sendFlag: false
          }
        },
        methods:{
          ...mapActions(['sendLogin','setuser']),
          login:function(){
            this.sendFlag = true;

            let ex = /^\d{6}$/;
              if(!this.name || !this.password){
                alert("账号或者密码不能为空");
              }else if(!ex.test(this.password)){
                alert("密码必须为六位数字");
              }else{
                console.log("马上执行sendLogin");
                this.sendLogin({
                   name: this.name,
                   password: this.password
                }).then((res) => {
                  if(res.status === 200){
                    this.setuser("comein");
                    this.$router.push({name:'manage',params:{name: res.data.name, admin: true}})
                  }
                }).catch((err) => {
                  console.log(err);
                  alert("账号或者密码不对")
                  this.sendFlag = false;
                  document.getElementById("form2").reset();
                })

              }
          }

        },
        store
    }
</script>

<style scoped>
.form{
  width:400px;margin:10px auto 200px auto
}
.form input{
  border:1px solid mediumpurple;
}
.form .form-group{
  position: relative;
}
.form i{
  display:inline-block;
  color:mediumpurple;
  float:right;
  position:absolute;
  right:8px;top:6px;
}
.btn{
  border:1px solid mediumpurple;color:mediumpurple;
  background-color: white;
}
.btn:hover{
  color:white;
  background-color: mediumpurple;
  transition: 0.4s;

}
.btn2{
  border:1px solid lightseagreen;color:lightseagreen;
  background-color: white;
}
.btn2:hover{
  color:white;
  background-color: lightseagreen;
  transition: 0.4s;

}
</style>
