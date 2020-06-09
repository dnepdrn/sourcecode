<template>
  <div class="item-list">
    <div class="d-flex align-items-center list-display-mobile">
      <div class="d-flex align-items-center">
        <p class="time-flow">{{items.fromtime}} ~ {{items.totime}}</p>
      </div>
      <div class="contact-wrapper d-flex align-items-center flex-column">
        <p class="writer-this">{{items.writer}}</p>
        <p class="phone-number">&nbsp;({{items.phone}})</p>
      </div>
    </div>
    <p class="contents">{{items.title}}</p>
    <p class="where-group">{{items.groupName ? items.groupName + ' /' : ''}} {{items.corpName}}</p>
    <b-button class="delete-it" size="sm" @click="$emit('del-item', items)">X</b-button>
  </div>
</template>
<script>
export default {
  name: 'BodyItems',
  props: ['items']
}
</script>
<style scoped>
.item-list {
  padding: 0 8px;
  border-bottom: 1px #ccc dotted;
  display: flex;
  align-items: center;
  text-align: left;
  height: 41px;
}
.item-list p {
  margin-bottom: 0;
}
.item-list button {
  background: #343a40;
  border-radius: 0;
}
.contents {
  padding: 0 8px;
  max-width: calc(100vw - 735px);
  line-height: 20px;
  word-break: break-all;
}
.time-flow {
  width: 115px;
  text-align: center;
  height: 41px;
  line-height: 41px;
  border-right: 1px #ccc dotted;
  padding: 0 8px;
  padding-left: 0;
}
.writer-this {
  line-height: 15px;
  padding-top: 4px;
}
.phone-number {
  padding: 0 14px 0 8px;
  letter-spacing: 1px;
}
.contact-wrapper {
  border-right: 1px dotted #ccc;
  width: 159px;
}
.writer-this, .phone-number {
  font-size: 15px;
}
.where-group {
  margin-left: auto;
  margin-right: 8px;
  font-size: 14px;
}
@media (max-width: 1090px) {
  .where-group {
    display: none;
  }
  .delete-it {
    margin-left: auto;
  }
  .time-flow {
    height: 22px;
    line-height: 28px;
    width: 159px;
  }
  .list-display-mobile {
    flex-direction: column;
  }
  .item-list {
    height: auto;
  }
  .writer-this {
    padding-left: 0;
    padding-right: 8px;
    width: 100%;
    text-align: center;
  }
  .phone-number {
    /*width: 116px;*/
    padding-left: 0;
    padding-right: 16px;
    width: 100%;
    text-align: center;
  }
  .contents {
    line-height: 20px;
    max-width: inherit;
  }
}
</style>
