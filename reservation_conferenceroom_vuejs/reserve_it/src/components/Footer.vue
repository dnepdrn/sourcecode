<template>
  <div id="footer-all" class="w-100 border-top border-secondary d-flex align-items-center">
      <h6 class="p-3"></h6>
    <div class="recommend-browser d-flex align-items-center">
    <label>권장 브라우저</label>
      <a href="https://www.google.co.kr/chrome/" target="_blank"><img src="@/assets/chrome.svg" width="20" height="20" alt="크롬"></a>
      <a href="https://www.mozilla.org/ko/firefox/" target="_blank"><img src="@/assets/firefox.svg" width="20" height="20" alt="파이어폭스"></a>
      <a href="https://www.opera.com/ko" target="_blank"><img src="@/assets/opera.svg" width="20" height="20" alt="오페라"></a>
      <a href="https://www.microsoft.com/en-us/edge" target="_blank"><img src="@/assets/edge.svg" width="20" height="20" alt="엣지"></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainFooter'
}
</script>템
<style scoped>
  #footer-all {
    background: #292929;
    color: #fff;
  }
  .recommend-browser {
    margin-left: auto;
    padding: 1rem;
  }
  .recommend-browser img {
    margin: 0 4px;
  }
  .p-3 {
    transform: translate(calc(50vw - 40px), 0);
    margin-bottom: 0;
  }
  label {
    margin: 4px 8px 0 0;
    color:#999;
  }
  @media (max-width: 1090px) {
    .p-3 {
      transform: translate(0, 0);
    }
  }
</style>
