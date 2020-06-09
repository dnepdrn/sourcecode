<template>
  <div id="main-header" class="w-100 text-dark mb-0 border-bottom border-secondary">
    <img src="@/assets/time.png" alt="reservation">
    <p>schedule</p>
  </div>
</template>
<script>
export default {
  name: 'mainHeader'
}
</script>
<style scoped>
  img {
    width: auto;
    height: 38px;
    margin: 11px 0;
  }
  #main-header {
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    font-weight: 500;
    font-size: 19px;
    margin-bottom: 0;
    margin-top: 5px;
  }
</style>
