<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary">
                <div class="md-toolbar-row"><span class="md-title">ASOR Random Chat</span></div>
            </md-app-toolbar>
            <md-app-content>
                <md-field>
                    <label>채팅</label>
                    <md-textarea v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
                </md-field>
                <md-field>
                    <label>메세지를 입력하세요.</label>
                    <md-input v-model="message" @keyup.enter="sendMessage" ></md-input>
                    <md-button class="md-primary md-raised" @click="sendMessage" >Submit</md-button>
                </md-field>
            </md-app-content>
        </md-app>
    </div>
</template>
<script>
export default {
  name: 'Chat',
  created () {
    this.$socket.on('chat', (data) => {
      this.textarea += data.message + '\n'
    })
  },
  data () {
    return {textarea: '', message: ''}
  },
  methods: {
    sendMessage: function () {
      this.$socket.emit('chat', {message: this.message})
      this.textarea += this.message + '\n'
      this.message = ''
    }
  }
}
</script>
<style>
.md-app {
height: 800px;
}
.md-textarea {
    height: 300px;
}
textarea {
    padding-top: 40px;
}
</style>
