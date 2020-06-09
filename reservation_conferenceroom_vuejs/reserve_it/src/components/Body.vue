<template>
  <div id="main-body" class="w-100">
    <div v-bind:key="listItem.id" v-for="listItem in totalList">
      <bodyItem v-bind:items="listItem" v-on:del-item="$emit('del-item', listItem)" v-bind:class="[listItem.roomName]" />
    </div>
  </div>
</template>
<script>
import bodyItem from './BodyItems'
export default {
  name: 'Body',
  data () {
    return {
    }
  },
  components: {
    bodyItem
  },
  props: [
    'totalList'
  ]
}
</script>
<style scoped></style>
