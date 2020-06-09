<template>
<div>
  <form id="add-form" @submit.prevent="addThisList">
    <div class="mobile-inner">
      <div class="mobile-spec-inner">
        <div class="sub-time-wrapper d-flex">
          <input id="fromTime1" max="23" type="number" placeholder="시작(시)" name="fromtime1" pattern="/^-?\d+\.?\d*$/" onkeydown="javascript: return event.keyCode == 69 ? false : true" @focus="focusCheck = 'checkOne'" v-on:keydown="keyMonitor" v-on:keyup="MoveOn" onKeyPress="if(this.value.length==2) return false" v-model="fromtime1">
          <label>:</label>
          <input id="fromTime2" max="59" type="number" placeholder="(분)" name="fromtime2" pattern="/^-?\d+\.?\d*$/" onkeydown="javascript: return event.keyCode == 69 ? false : true" @focus="focusCheck = 'checkTwo'"  v-on:keydown="keyMonitor" v-on:keyup="MoveOn" onKeyPress="if(this.value.length==2) return false" v-model="fromtime2">
        </div>
        <div class="sub-time-wrapper d-flex">
          <input id="toTime1" max="23" type="number" placeholder="종료(시)" name="totime1" pattern="/^-?\d+\.?\d*$/" onkeydown="javascript: return event.keyCode == 69 ? false : true" @focus="focusCheck = 'checkThree'" v-on:keydown="keyMonitor" v-on:keyup="MoveOn" onKeyPress="if(this.value.length==2) return false" v-model="totime1">
          <label>:</label>
          <input id="toTime2" max="59" type="number" placeholder="(분)" name="totime2" pattern="/^-?\d+\.?\d*$/" onkeydown="javascript: return event.keyCode == 69 ? false : true" @focus="focusCheck = 'checkFour'" v-on:keydown="keyMonitor" v-on:keyup="MoveOn" onKeyPress="if(this.value.length==2) return false" v-model="totime2">
        </div>
      </div>
      <div class="mobile-spec-inner">
          <select id="group" name="group" v-model="groupName">
            <option value="">부서 선택 <em>▼</em></option>
            <option value="임원">임원</option>
            <option value="기획">기획</option>
            <option value="디자인">디자인</option>
            <option value="퍼블리싱">퍼블리싱</option>
            <option value="개발">개발</option>
            <option value="전략기획">전략기획</option>
            <option value="경영지원">경영지원</option>
            <option value="기타">기타</option>
          </select>
          <input id="writer" type="text" name="writer" maxlength="10" placeholder="작성자" onKeyPress="this.value = this.value.replace(/^\s+/, '').replace(/\s+$/, '')" v-model="writer" >
        <input id="phones" type="number" name="phone" placeholder="휴대폰번호(숫자)" pattern="/^-?\d+\.?\d*$/" onkeydown="javascript: return event.keyCode == 69 ? false : true" onKeyPress="if(this.value.length==11) return false;" v-model="phone">
      </div>
    </div>
    <div class="mobile-inner">
      <div class="mobile-radio-input-inner d-flex">
        <div class="radio-input-inner">
          <input type="radio" name="corpName" value="회사" v-model="corpName">&nbsp;회사&nbsp;
          <input type="radio" name="corpName" value="회사2" v-model="corpName">&nbsp;회사2
        </div>
        <div class="radio-input-inner">
          <input type="radio" v-model="roomName" name="room" value="대회의실">&nbsp;대회의실&nbsp;
          <input type="radio" v-model="roomName" name="room" value="중회의실">&nbsp;중회의실
        </div>
      </div>
      <div class="text-input-inner d-flex">
        <input type="text" v-model="title" name="title" maxlength="40" placeholder="회의내용 입력">
        <input type="submit" value="추가" class="btn">
      </div>
    </div>
  </form>
</div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'AddBodyItems',
  data () {
    return {
      title: '',
      fromtime: '',
      totime: '',
      fromtime1: '',
      totime1: '',
      fromtime2: '',
      totime2: '',
      writer: '',
      phone: '',
      corpName: '회사',
      corpCode: '',
      roomName: '대회의실',
      roomCode: '',
      groupCode: '',
      groupName: '',
      delYn: 'N',
      resvDate: this.$moment(new Date()).format('YYYYMMDD')
    }
  },
  methods: {
    addThisList () {
      const newList = {
        id: uuidv4(),
        title: this.title,
        fromtime: this.fromtime1 + this.fromtime2,
        totime: this.totime1 + this.totime2,
        writer: this.writer,
        corpName: this.corpName,
        corpCode: this.corpCode,
        roomName: this.roomName,
        roomCode: this.roomCode,
        groupName: this.groupName,
        groupCode: this.groupCode,
        delYn: this.delYn,
        resvDate: this.resvDate,
        phone: this.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
      }
      // console.log(newList)
      if (newList.fromtime === '') {
        alert('시작시간을 입력해주십시요.')
        return
      } else if (newList.fromtime.length < 4) {
        alert('시작시간이 올바르지 않습니다.')
        return
      }
      if (newList.totime === '') {
        alert('종료시간을 입력해주십시요.')
        return
      } else if (newList.totime.length < 4) {
        alert('종료시간이 올바르지 않습니다.')
        return
      }
      if (newList.fromtime === newList.totime || newList.totime === newList.fromtime) {
        alert('시작시간과 종료시간이 같습니다.')
        return
      }
      if (newList.fromtime > newList.totime) {
        alert('종료시간이 시작시간보다 빠릅니다.')
        return
      }
      if (newList.corpName === '회사2') {
        newList.groupCode = ''
        newList.groupName = ''
      } else {
        if (newList.groupName === '기획') {
          newList.groupCode = 1
        } else if (newList.groupName === '디자인') {
          newList.groupCode = 2
        } else if (newList.groupName === '퍼블리싱') {
          newList.groupCode = 3
        } else if (newList.groupName === '개발') {
          newList.groupCode = 4
        } else if (newList.groupName === '전략기획') {
          newList.groupCode = 5
        } else if (newList.groupName === '경영지원') {
          newList.groupCode = 6
        } else if (newList.groupName === '임원') {
          newList.groupCode = 7
        } else if (newList.groupName === '기타') {
          newList.groupCode = 8
        } else {
          alert('부서를 선택해 주십시요.')
          return
        }
      }
      if (newList.writer === '') {
        alert('작성자를 입력해주십시요.')
        return
      }
      if (newList.phone === '') {
        alert('휴대폰번호를 입력해주십시요.')
        return
      } else if (newList.phone.length < 11) {
        alert('휴대폰번호가 올바르지 않습니다.')
        return
      }
      if (newList.title === '') {
        alert('회의내용을 입력해주십시요.')
        return
      }
      if (newList.corpName === '회사') {
        newList.corpCode = 1
      } else if (newList.corpName === '회사2') {
        newList.corpCode = 2
      }
      if (newList.roomName === '대회의실') {
        newList.roomCode = 1
      } else if (newList.roomName === '중회의실') {
        newList.roomCode = 2
      }
      this.$emit('addThisList', newList)
      this.title = ''
      this.fromtime1 = ''
      this.totime1 = ''
      this.fromtime2 = ''
      this.totime2 = ''
      this.fromtime = ''
      this.totime = ''
      this.writer = ''
      this.phone = ''
      this.corpName = '회사'
      this.roomName = '대회의실'
      document.getElementById('group').style.display = 'flex'
      document.querySelector('#writer').style.maxWidth = 'calc(50vw - 98px)'
      document.querySelector('#group option:first-child').selected = true
    },
    keyMonitor: function () {
      const key = event.keyCode || event.charCode
      if (this.fromtime1.length < 2 && this.focusCheck === 'checkOne') {
        this.fromtime1 = 0 + this.fromtime1
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.fromtime1 = this.fromtime1.substring(0, 1)
        } else if (this.fromtime1.length >= 2) {
          this.fromtime1 = this.fromtime1.substring(1, 2)
        }
        return
      } else if (this.fromtime1.length >= 2 && this.focusCheck === 'checkOne') {
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.fromtime1 = this.fromtime1.substring(0, 1)
          this.fromtime1 = 0 + this.fromtime1
        } else {
          if (key !== 9) {
            this.fromtime1 = this.fromtime1.substring(1, 2)
          }
        }
        return
      }
      if (this.fromtime2.length < 2 && this.focusCheck === 'checkTwo') {
        this.fromtime2 = 0 + this.fromtime2
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.fromtime2 = this.fromtime2.substring(0, 1)
        } else if (this.fromtime2.length >= 2) {
          this.fromtime2 = this.fromtime2.substring(1, 2)
        }
        return
      } else if (this.fromtime2.length >= 2 && this.focusCheck === 'checkTwo') {
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.fromtime2 = this.fromtime2.substring(0, 1)
          this.fromtime2 = 0 + this.fromtime2
        } else {
          if (key !== 9) {
            this.fromtime2 = this.fromtime2.substring(1, 2)
          }
        }
        return
      }
      if (this.totime1.length < 2 && this.focusCheck === 'checkThree') {
        this.totime1 = 0 + this.totime1
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.totime1 = this.totime1.substring(0, 1)
        } else if (this.totime1.length >= 2) {
          this.totime1 = this.totime1.substring(1, 2)
        }
        return
      } else if (this.totime1.length >= 2 && this.focusCheck === 'checkThree') {
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.totime1 = this.totime1.substring(0, 1)
          this.totime1 = 0 + this.totime1
        } else {
          if (key !== 9) {
            this.totime1 = this.totime1.substring(1, 2)
          }
        }
        return
      }
      if (this.totime2.length < 2 && this.focusCheck === 'checkFour') {
        this.totime2 = 0 + this.totime2
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.totime2 = this.totime2.substring(0, 1)
        } else if (this.totime2.length >= 2) {
          this.totime2 = this.totime2.substring(1, 2)
        }
      } else if (this.totime2.length >= 2 && this.focusCheck === 'checkFour') {
        if (key === 8 || key === 46) {
          event.preventDefault()
          this.totime2 = this.totime2.substring(0, 1)
          this.totime2 = 0 + this.totime2
        } else {
          if (key !== 9) {
            this.totime2 = this.totime2.substring(1, 2)
          }
        }
      }
    },
    MoveOn: function () {
      if (this.fromtime1.length >= 2 && this.focusCheck === 'checkOne' && this.fromtime1.substring(0, 1) !== '0') {
        document.getElementById('fromTime2').focus()
      } else if (this.fromtime2.length >= 2 && this.focusCheck === 'checkTwo' && this.fromtime2.substring(0, 1) !== '0') {
        document.getElementById('toTime1').focus()
      } else if (this.totime1.length >= 2 && this.focusCheck === 'checkThree' && this.totime1.substring(0, 1) !== '0') {
        document.getElementById('toTime2').focus()
      }
    }
  },
  mounted () {
    const radioDiv = document.querySelectorAll('input[type="radio"][name="corpName"]')
    radioDiv.forEach(function (input) {
      input.addEventListener('click', () => {
        if (input.value === '회사') {
          document.getElementById('group').style.display = 'flex'
          document.querySelector('#writer').style.maxWidth = 'calc(50vw - 98px)'
        } else if (input.value === '회사2') {
          document.getElementById('group').style.display = 'none'
          document.querySelector('#writer').style.maxWidth = '50vw'
        }
      })
    })
    const focusCheck = document.getElementById('fromTime1')
    focusCheck.addEventListener('focus', () => {
      const timeTooltip = document.createElement('div')
      timeTooltip.setAttribute('id', 'timeInfo')
      timeTooltip.innerText = '시간은 24시형 입니다.(예) 오후6:00 ⇒ 18:00'
      document.getElementById('fromTime1').insertAdjacentElement('beforebegin', timeTooltip)
    })
    focusCheck.addEventListener('blur', () => {
      document.getElementById('timeInfo').remove()
    })
  }
}
</script>
<style scoped>
form {
  display: flex;
  height: 82px;
  border-bottom:1px solid #666;
}
input[type="text"] {
  flex: 10;
  padding: 8px;
  border: 0;
  background: #e8e8e8;
}
input[type="submit"] {
  flex:1;
  background: #343a40;
  border-radius: 0;
  color: #fff;
}
/* Up/Down arrows for incrementing/decrementing the value */
input[type=number]::-webkit-inner-spin-button {
  display: none;
}
input[type=radio] {
margin-bottom: 2px;
}
label {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
input::placeholder {
  color: #2c3e50;
}
select {
  word-wrap: normal;
  border: 0px;
  border-radius: 0;
  border-right: 1px dotted #ccc;
  padding-left: 8px;
  padding-right: 8px;
  background: #fff;
  border-radius: 0px;
  -webkit-appearance: none;
  background: #e8e8e8;
}
#add-form {
  flex-direction: column;
}
#writer, #phones {
  flex: 1;
}
#writer {
  border-right: 1px dotted #ccc;
}
#phones {
  border: 0;
  padding: 8px;
  background: #e8e8e8;
}
.mobile-inner {
  display: flex;
  height: 40px;
}
.mobile-inner:last-child {
  flex:10;
  border-top: 1px solid #666;
  align-items: center;
}
.mobile-inner:last-child p {
  margin-bottom: 0;
}
.mobile-spec-inner {
  display: flex;
}
.mobile-spec-inner:last-child {
  flex: 1;
}
.radio-input-inner {
  display: flex;
  border-right: 1px dotted #ccc;
  line-height: 40px;
  align-items: center;
  width: 159.5px;
  justify-content: center;
  font-size: 14px;
}
.btn {
  height: 40px;
}
.text-input-inner {
  flex: 10;
}
.mobile-inner-specs {
  flex: 1;
}
#fromTime1, #fromTime2, #toTime1, #toTime2 {
  max-width: 77.6px;
  min-width: 77.6px;
  border:0;
  padding-left: 8px;
  background: #e8e8e8;
}
#fromTime1, #toTime1 {
  text-align: right;
  padding-right: 8px;
}
#fromTime2, #toTime2 {
  text-align: left;
  padding-left: 8px;
}
#fromTime2, #toTime2 {
  border-right: 1px dotted #ccc;
}
.sub-time-wrapper {
  position: relative;
}
@media (max-width: 1090px) {
  .sub-time-wrapper {
    width: 100%;
    position: relative;
  }
  #fromTime1, #fromTime2, #toTime1, #toTime2 {
    max-width: inherit;
    min-width: inherit;
    width: 100%;
  }
  .mobile-radio-input-inner {
    width: 100%;
  }
  input[type=time] {
    flex: 1;
    border-bottom: 1px dotted #ccc;
  }
  label {
    border-bottom: 1px dotted #ccc;
  }
  form {
    height: 164px;
  }
  #writer {
    padding-right: 7px;
    max-width: calc(50vw - 98px);
  }
  #phones {
    max-width: 50vw;
    min-width: 50vw;
  }
  .mobile-spec-inner {
    height: 40px;
  }
  .mobile-spec-inner:last-child {
    border-top:1px dotted #ccc;
  }
  .mobile-inner:first-child {
    flex-direction: column;
    height: 80px;
  }
  .mobile-inner:last-child {
    border-top:1px dotted #ccc;
  }
  .mobile-inner:last-child {
    flex-direction: column;
  }
  .text-input-inner {
    width: 100%;
    border-top:1px solid #666;
    max-height: 40px;
    margin-top: 1px;
  }
  .radio-input-inner {
    flex: 1;
  }
}
</style>
