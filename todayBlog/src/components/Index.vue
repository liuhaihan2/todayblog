<template>
  <div>
    <!--这个nav就算是头部了 header部分-->
    <img src="../assets/logo.png" class="logo">
    <nav  class="navbar-default navbar" role="navigation" style="width:60%;margin:50px auto;height:30px;font-size:20px;">
      <ul class="nav nav-pills nav-justified daohang" >
        <router-link to="/home" tag="li" style=""><a>主&nbsp;&nbsp;&nbsp;页</a></router-link>
        <router-link to="/message" tag="li"><a>文&nbsp;&nbsp;&nbsp;章</a></router-link>
        <router-link to="/habit" tag="li"><a>爱&nbsp;&nbsp;&nbsp;好</a></router-link>
        <router-link to="/connect" tag="li"><a>关&nbsp;&nbsp;于&nbsp;&nbsp;我</a></router-link>
      </ul>
    </nav>
    <hr>
    <router-view></router-view>
    <hr>
    <footer>
      <div style="height:80px;padding:20px;"><router-link to="/login" tag="button" class="btn">登录后台管理</router-link></div>
    </footer>
  </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
 .logo{
   margin:30px auto;
 }
 .navbar-default {
   background-color: #f8f8f8;
   border-color:white;
 }
 .daohang a{

   text-decoration: none;
   border-radius: 0px;
 }
 .daohang a:visited {background-color: white;border:none;}
 .daohang li:nth-child(1){
    border-top:4px solid lightseagreen;
    background-color:white;
  }
  .daohang li:nth-child(1) a{
    color:lightseagreen;

  }
  .daohang li:nth-child(1) a:hover{
    color:white;
    transition: 0.3s;
    background-color:lightseagreen;
  }
 .daohang li:nth-child(2){
   border-top:4px solid #f5917b;
   background-color:white;
 }
 .daohang li:nth-child(2) a{
   color:#f5917b;

 }
 .daohang li:nth-child(2) a:hover{
   color:white;
   transition: 0.3s;
   background-color:#f5917b;
 }
 .daohang li:nth-child(3){
   border-top:4px solid yellowgreen;
   background-color:white;
 }
 .daohang li:nth-child(3) a{
   color:yellowgreen;

 }
 .daohang li:nth-child(3) a:hover{
   color:white;
   transition: 0.3s;
   background-color:yellowgreen;
 }
 .daohang li:nth-child(4){
   border-top:4px solid deepskyblue;
   background-color:white;
 }
 .daohang li:nth-child(4) a{
   color:deepskyblue;

 }
 .daohang li:nth-child(4) a:hover{
   color:white;
   transition: 0.3s;
   background-color:deepskyblue;
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
</style>
