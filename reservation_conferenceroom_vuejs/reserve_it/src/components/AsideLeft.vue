<template>
  <div class="border-right border-secondary">
    <div class="d-flex align-items-center justify-content-center time-title">
      <div class="pt-2 pb-2 pr-2">{{title}}</div>
      <div v-if="loadingStatus" id="loadingSection">
        <img src="/static/loader.svg" style="transform:translateY(50vh);z-index:9999;">
      </div>
      <div>
        <vueTime :show-day="showDay" :show-time="showTime" :show-date="showDate"  :locales="locales" :options="options"/>
      </div>
    </div>
    <datePicker :language="ko" :inline="true" @selected="selectedDate" :format="sendDate" />
    <div id="dateStatusWrapper" class="d-flex flex-row justify-content-center align-items-center">선택된 날짜 :<div id="selectedDate">{{this.$moment(new Date()).format('YYYY년 MM월 DD일')}}</div></div>
  </div>
</template>
<script>
import datePicker from 'vuejs-datepicker'
import {ko} from 'vuejs-datepicker/dist/locale'
import vueTime from 'vue-time'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  name: 'asideLeft',
  components: {
    datePicker,
    vueTime
  },
  props: [
    'totalList'
  ],
  data () {
    return {
      loadingStatus: false,
      title: '현재시간',
      ko: ko,
      showDate: false,
      showDay: true,
      showTime: true,
      locales: 'ko-KR',
      options: {
        weekday: 'short',
        timeZone: 'Asia/Seoul',
        hour12: false
        // era: 'long',
        // year: 'numeric',
        // month: 'numeric',
        // day: 'numeric'
      }
    }
  },
  methods: {
    selectedDate: function (date) {
      const db = firebase.firestore()
      const docRef = db.collection('ConferenceList')
      let empyArray = []
      let _this = this
      // let loadingStatus = this.loadingStatus
      docRef.where('resvDate', '==', this.$moment(new Date(date)).format('YYYYMMDD')).where('delYn', '==', 'N').get().then(function (querySnapshot) {
        if (querySnapshot) {
          _this.loadingStatus = false
          // console.log(_this.loadingStatus, 'children1')
          querySnapshot.forEach(function (doc) {
            let docs = doc.data()
            docs.fromtime = docs.fromtime.substring(0, 2) + ':' + docs.fromtime.substring(2, 4)
            docs.totime = docs.totime.substring(0, 2) + ':' + docs.totime.substring(2, 4)
            empyArray.push(docs)
          })
          empyArray.sort(function (a, b) { // 오름차순정렬
            return a.fromtime < b.fromtime ? -1 : a.fromtime > b.fromtime ? 1 : 0
          })
        } else {
          console.log('데이터가 존재하지 않습니다.')
        }
      }).catch(function (error) {
        console.log('예기치 못한 에러가 발생하였습니다:', error)
      })
      this.loadingStatus = true
      // console.log(this.loadingStatus, 'children2')
      this.$emit('selectedDate', empyArray)
      document.getElementById('selectedDate').innerText = this.$moment(new Date(date)).format('YYYY년 MM월 DD일')
    },
    sendDate: function (date) {
      this.$emit('sendDate', this.$moment(new Date(date)).format('YYYYMMDD'))
    }
  }
}
</script>
<style>
  .vdp-datepicker__calendar, .vdp-datepicker__calendar .cell.day-header {
    border: 0 !important;
    border-top: 1px solid #343a40 !important;
  }
  .vue-time {
    font-size: 16px;
  }
  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border: 1px solid #343a40 !important;
  }
  .vdp-datepicker__calendar .cell.selected {
    background: #343a40 !important;
    color: #fff;
  }
  .cell.day.today {
    font-weight: 600;
    background: #ececec;
  }
  .time-title {
    height: 40px;
    background: #e8e8e8;
  }
  .vdp-datepicker__calendar header {
    height: 40px;
    background: #e8e8e8;
  }
  #dateStatusWrapper {
    border-top: 1px solid #666;
    padding: 8px;
    border-bottom: 1px solid #666;
    background: #e8e8e8;
  }
  #selectedDate {
    margin-left: 5px;
  }
  @media (max-width: 1090px) {
    .border-right.border-secondary{
      border-right: 0 !important;
    }
    #dateStatusWrapper {
      border-bottom: 0;
      margin-top: 0;
      background: #fff;
    }
    .time-title {
      background: #fff;
    }
    .vdp-datepicker__calendar header {
      background: #fff;
    }
  }
</style>
