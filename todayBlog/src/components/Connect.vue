<template>
<div>
  <!--<button class="btn">个人简历</button>-->
  <img src="../assets/person.png" alt="个人简介" style="width:900px;height:900px;">
  <form role="form" style="width:70%;margin:10px auto">
    <div class="form-group">
      <label for="name">联系我</label>
      <input type="text" class="form-control" placeholder="姓名">
      <input type="text" class="form-control" placeholder="联系电话">
      <textarea class="form-control" rows="3"></textarea>
    </div>
  </form>
</div>


</template>

<script>
    export default {
        name: "Connect"
    }
</script>

<style scoped>

</style>
