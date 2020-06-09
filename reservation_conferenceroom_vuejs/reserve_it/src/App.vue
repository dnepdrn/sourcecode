<template>
  <div id="app">
    <content-placeholders v-if="!callContent">
      <content-placeholders-img :height="3"/>
      <content-placeholders-text :lines="2" :thickness="20"/>
      <content-placeholders-list-item :items="1">
        <content-placeholders-img :height="18"/>
        <content-placeholders-text :lines="7" :thickness="20"/>
      </content-placeholders-list-item>
      <content-placeholders-list-item :items="1">
        <content-placeholders-img :height="2"/>
        <content-placeholders-text :lines="7" :thickness="20"/>
      </content-placeholders-list-item>
      <content-placeholders-img :height="3"/>
    </content-placeholders>
    <div class="d-flex flex-column" v-else>
    <div id="header">
      <mainHeader/>
    </div>
    <div id="mainBody">
      <asideLeft v-on:selectedDate="loadDatesLayout" v-on:sendDate="changedDate" />
      <div class="d-flex w-100 flex-column">
        <addList v-on:addThisList="addThis"/>
        <div class="body-sub d-flex flex-row" id="bigRoom">
          <div class="body-sub-title">
            <h6>대회의실</h6>
          </div>
          <router-view v-bind:totalList="list" v-on:del-item="deleteItem"/>
        </div>
        <div class="body-sub d-flex flex-row" id="middleRoom">
          <div class="body-sub-title">
            <h6>중회의실</h6>
          </div>
<!--          <div class="d-flex flex-column" v-if="loading" style="width: 100vw;position: absolute;">-->
<!--            <content-placeholders>-->
<!--              <content-placeholders-list-item :items="1">-->
<!--                <content-placeholders-text :lines="7" :thickness="20"/>-->
<!--              </content-placeholders-list-item>-->
<!--            </content-placeholders>-->
<!--          </div>-->
          <router-view v-bind:totalList="list" v-on:del-item="deleteItem" />
        </div>
      </div>
    </div>
    <div id="footer">
      <mainFooter/>
    </div>
    </div>
  </div>
</template>
<script>
import mainHeader from './components/Header.vue'
import asideLeft from './components/AsideLeft.vue'
import mainFooter from './components/Footer.vue'
import addList from './components/AddBodyItems.vue'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDkf3nirOlOH6AarBCGhhawrMPMK-m_5e8',
  authDomain: 'sallyscheduler.firebaseapp.com',
  projectId: 'sallyscheduler'
})

const db = firebase.firestore()
const docRef = db.collection('ConferenceList')

let emptyDate = ''

export default {
  name: 'App',
  components: {
    addList,
    mainHeader,
    asideLeft,
    mainFooter
  },
  data () {
    return {
      callContent: null,
      list: [
        // {
        //   id: 1,
        //   title: '회의내용은 이렇게 들어갑니다.',
        //   fromtime: '10:00',
        //   totime: '11:00',
        //   writer: '홍길동',
        //   phone: '010-3253-2533',
        //   corpName: '회사',
        //   corpCode: 1,
        //   roomName: '대회의실',
        //   roomCode: 1,
        //   groupName: '개발',
        //   groupCode: 4,
        //   delYn: 'N',
        //   resvDate: '20200414'
        // },
        // {
        //   id: 2,
        //   title: '시간순 자동정렬입니다.',
        //   fromtime: '11:00',
        //   totime: '12:00',
        //   writer: '김혜수',
        //   phone: '010-2412-1532',
        //   corpName: '회사2',
        //   corpCode: 2,
        //   roomName: '중회의실',
        //   roomCode: 2,
        //   groupName: '기획',
        //   groupCode: 1,
        //   delYn: 'N',
        //   resvDate: '20200414'
        // }
      ]
    }
  },
  methods: {
    deleteItem (listItem) {
      if (window.confirm('정말로 삭제하시겠습니까?') === true) {
        docRef.doc(listItem.id).update({
          delYn: 'Y'
        }).then(function () {
          // console.log('데이터 업데이트가 완료되었습니다.')
        }).catch(function (error) {
          console.error('예기치못한 에러가 발생하였습니다.', error)
        })
        this.list = this.list.filter(totalList => totalList.id !== listItem.id)
      }
    },
    addThis (newList) {
      // console.log(newList, 'newList')
      const todayDate = this.$moment(new Date()).format('YYYYMMDD')
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].resvDate === todayDate) {
          if (this.list[i].roomCode === 1 && newList.roomCode === 1) {
            // A.종료일자 >= B.시작일자 AND A.시작일자 <= B.종료일자
            if (newList.totime.replace(':', '') > this.list[i].fromtime.replace(':', '') && newList.fromtime.replace(':', '') < this.list[i].totime.replace(':', '')) {
              alert('회의시간이 중복되었습니다.')
              return
            }
            // if (newList.fromtime.replace(':', '') === newList.totime.replace(':', '')) {
            //   alert('시작시간과 종료시간이 같습니다.')
            //   return
            // }
            // if (newList.fromtime.replace(':', '') >= newList.totime.replace(':', '')) {
            //   alert('종료시간이 시작시간보다 빠릅니다.')
            //   return
            // }
          } else if (this.list[i].roomCode === 2 && newList.roomCode === 2) {
            // A.종료일자 >= B.시작일자 AND A.시작일자 <= B.종료일자
            if (newList.totime.replace(':', '') > this.list[i].fromtime.replace(':', '') && newList.fromtime.replace(':', '') < this.list[i].totime.replace(':', '')) {
              alert('회의시간이 중복되었습니다.')
              return
            }
            // if (newList.fromtime.replace(':', '') === newList.totime.replace(':', '')) {
            //   alert('시작시간과 종료시간이 같습니다.')
            //   return
            // }
            // if (newList.fromtime.replace(':', '') >= newList.totime.replace(':', '')) {
            //   alert('종료시간이 시작시간보다 빠릅니다.')
            //   return
            // }
          }
        }
      }
      // console.log(newList, 'newList')
      docRef.add({
        id: newList.id,
        title: newList.title,
        fromtime: newList.fromtime,
        totime: newList.totime,
        writer: newList.writer,
        corpName: newList.corpName,
        corpCode: newList.corpCode,
        roomName: newList.roomName,
        roomCode: newList.roomCode,
        groupName: newList.groupName,
        groupCode: newList.groupCode,
        delYn: newList.delYn,
        resvDate: emptyDate.length > 0 ? emptyDate : newList.resvDate,
        phone: newList.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
      }).then(function (docRef2) {
        docRef.doc(docRef2.id).update({
          id: docRef2.id
        })
        newList.id = docRef2.id
      }).catch(function (error) {
        console.error('예기치못한 에러가 발생하였습니다.', error)
      })
      // console.log(newList)
      newList.fromtime = newList.fromtime.substring(0, 2) + ':' + newList.fromtime.substring(2, 4)
      newList.totime = newList.totime.substring(0, 2) + ':' + newList.totime.substring(2, 4)
      this.list = [...this.list, newList]
      this.list.sort(function (a, b) { // 오름차순정렬
        return a.fromtime < b.fromtime ? -1 : a.fromtime > b.fromtime ? 1 : 0
      })
      // console.log(this.list, 'this.list')
    },
    loadDatesLayout (loadList) {
      this.list = loadList
      // console.log(loadList)
    },
    changedDate (changedDate) {
      emptyDate = changedDate
      // console.log(changedDate, 'changeDate')
    }
  },
  created () {
    let empyArray = []
    docRef.where('resvDate', '==', this.$moment(new Date()).format('YYYYMMDD')).where('delYn', '==', 'N').get().then(function (querySnapshot) {
      if (querySnapshot) {
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
    this.list = empyArray
  },
  mounted () {
    setTimeout(() => {
      this.callContent = 'Example Data'
    }, 2000)
    setInterval(() => location.reload(), 120000)
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#mainBody {
  display: flex;
  flex-direction: row;
}
#bigRoom .중회의실 {
  display: none;
}
#middleRoom .대회의실 {
  display: none;
}
#loadingSection {
  background: rgba(0,0,0,0.4);
  width: 100%;
  height: calc(100% + 121px);
  /* min-height: calc(100% + 122px); */
  /* max-height: calc(100% + 122px); */
  position: absolute;
  right: 50vw;
  bottom: calc(50%);
  -webkit-transform: translate(50vw, calc(50% + 122px));
  transform: translate(50vw, calc(50% + 60px));
  z-index: 999;
}
.vdp-datepicker__calendar header .prev:not(.disabled):hover, .vdp-datepicker__calendar header .next:not(.disabled):hover, .vdp-datepicker__calendar header .up:not(.disabled):hover {
  background: rgba(0,0,0,0.1) !important;
}
.body-sub {
  min-height: calc(50vh - 102px);
}
.body-sub:last-child {
  border-top: 1px solid #666;
}
.body-sub-title h6 {
  height: 100%;
  width: 37px;
  padding: 8px;
  border-right: 1px dotted #ccc;
  align-items: center;
  justify-content: center;
  display: flex;
  line-height: 25px;
  margin-bottom: 0;
}
#add-form {
  background: #e8e8e8;
}
textarea:focus, input:focus, select:focus{
  outline: none;
}
#timeInfo {
  position: absolute;
  background: white;
  padding: 5px;
  bottom: 41px;
  left: 10px;
  border: 1px solid rgba(0,0,0,0.1);
  max-width: 144px;
  line-height: 18px;
  font-size: 13px;
  border-radius: 5px;
  -webkit-box-shadow: 3px 4px 3px 1px rgba(0,0,0,0.3);
  box-shadow: 3px 4px 3px 1px rgba(0,0,0,0.3);
}
#timeInfo::after {
  content: "\25BC";
  position: absolute;
  color: #fff;
  left: 7px;
  bottom: 4px;
  height: 0px;
  width: 5px;
  box-shadow: 6px 11px 3px 3px rgba(0,0,0,0.3);
}
@media (max-width: 1090px) {
  #mainBody {
    flex-direction: column;
  }
  #header {
    position: fixed;
    z-index: 99;
    width: 100%;
  }
  #mainBody {
    padding-top: 61px;
  }
  .vue-blog-placeholders-img.vue-blog-placeholders-height-18, .vue-blog-placeholders-img.vue-blog-placeholders-height-2 {
    display: none;
  }
  .body-sub {
    min-height: inherit;
  }
  .vdp-datepicker__calendar {
    width: 100% !important;
  }
  #main-body.w-75 {
    width: 100% !important;
  }
  #add-form {
    border-top: 1px solid #666;
  }
}
</style>
