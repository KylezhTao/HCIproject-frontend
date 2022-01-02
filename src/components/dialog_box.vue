<template>
  <div class="dialogue-wrapper">
    <div id="button-open" class="dialogue-support-button">
      <i class="dialogue-support-icon"></i>
      <i class="dialogue-support-line"></i>
      <span class="dialogue-support-text">智能问答</span>
    </div>
    <div class="dialogue-main">
      <div class="dialogue-header">
        <i id="button-close" class="dialogue-close">×</i>
        <div class="dialogue-service-info">
          <i class="dialogue-service-img"></i>
          <div class="dialogue-service-title">
            <p class="dialogue-service-name">智能问答机器人</p>
          </div>
        </div>
      </div>
      <div id="dialogue-container" class="dialogue-container">
        <p class="dialogue-service-container">
          <img src="../assets/robot.jpg" class="avatar" />
          <span class="dialogue-text dialogue-service-text">我是AI小Q，你有什么连锁酒店方面的问题都可以问我哦😉！
          </span>
        </p>
      </div>
      <div class="dialogue-submit">
        <p id="dialogue-hint" class="dialogue-hint">
          <span class="dialogue-hint-icon">!</span>
          <span class="dialogue-hint-text">输入不能为空</span>
        </p>
        <textarea
          id="dialogue-input"
          class="dialogue-input-text"
          placeholder="请输入您的问题"
        ></textarea>
        <div id="dialogue-input-tool" class="dialogue-input-tool">
          发送
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { getAnswer } from '@/api/qaApi'
export default {
  name: 'dialog_box',
  data() {
    return {
      avatar: this.$store.state.userInfo.avatar,
    }
  },
  mounted() {
    this.simulator()
  },
  created() {},
  watch: {},
  methods: {
    simulator() {
      let that = this
      var doc = document
      var dialogueInput = doc.getElementById('dialogue-input'),
        dialogueContainer = doc.getElementById('dialogue-container'),
        dialogueHint = doc.getElementById('dialogue-hint'),
        buttonOpen = doc.getElementById('button-open'),
        buttonClose = doc.getElementById('button-close'),
        dialogueInputTool = doc.getElementById('dialogue-input-tool'),
        timer,
        timerId,
        shiftKeyOn = false //辅助判断是否按住shift
      buttonOpen.addEventListener('click', function () {
        console.log('click opb')
        $('.dialogue-support-button').css({ display: 'none' })
        $('.dialogue-main').css({ display: 'inline-block', height: '0' })
        $('.dialogue-main').animate({ height: '690px' })
      })

      buttonClose.addEventListener('click', function () {
        $('.dialogue-main').animate({ height: 0 }, function () {
          $('.dialogue-main').css({ display: 'none' })
          $('.dialogue-support-button').css({ display: 'inline-block' })
        })
      })

      dialogueInput.addEventListener('keydown', function (e) {
        var e_ = e || window.event
        if (e_.keyCode == 16) {
          shiftKeyOn = true
        }
        if (shiftKeyOn) {
          return true
        } else if (e_.keyCode == 13 && dialogueInput.value == '') {
          console.log('should not send an empty message')
          //多次触发只执行一次渐隐
          setTimeout(function () {
            fadeIn(dialogueHint)
            clearTimeout(timerId)
            timer = setTimeout(function () {
              fadeOut(dialogueHint)
            }, 2000)
          }, 10)
          timerId = timer
          return true
        } else if (e_.keyCode == 13) {
          console.log('create a bubble')
          var nodeP = doc.createElement('p'),
            nodeSpan = doc.createElement('span')
          nodeP.classList.add('dialogue-customer-container')
          nodeSpan.classList.add('dialogue-text', 'dialogue-customer-text')
          nodeSpan.innerHTML = dialogueInput.value
          nodeP.appendChild(nodeSpan)
          dialogueContainer.appendChild(nodeP)
          dialogueContainer.scrollTop = dialogueContainer.scrollHeight
          submitCustomerText(dialogueInput.value)
        }
      })
      dialogueInput.addEventListener('keyup', function (e) {
        var e_ = e || window.event
        if (e_.keyCode == 16) {
          shiftKeyOn = false
          return true
        }
        if (!shiftKeyOn && e_.keyCode == 13) {
          dialogueInput.value = null
        }
      })

      dialogueInputTool.addEventListener('click', function () {
        if (dialogueInput.value == '') {
          console.log('should not send an empty message')
          //多次触发只执行一次渐隐
          setTimeout(function () {
            fadeIn(dialogueHint)
            clearTimeout(timerId)
            timer = setTimeout(function () {
              fadeOut(dialogueHint)
            }, 2000)
          }, 10)
          timerId = timer
          return true
        } else {
          console.log('create a bubble')
          var nodeP = doc.createElement('p'),
            nodeSpan = doc.createElement('span'),
            customerAvatar = doc.createElement('img')
          nodeP.classList.add('dialogue-customer-container')
          nodeSpan.classList.add('dialogue-text', 'dialogue-customer-text')
          customerAvatar.classList.add('avatar')

          // 默认头像
          customerAvatar.src =
            that.avatar === undefined
              ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
              : that.avatar

          nodeSpan.innerHTML = dialogueInput.value
          nodeP.appendChild(nodeSpan)
          nodeP.appendChild(customerAvatar)
          dialogueContainer.appendChild(nodeP)
          dialogueContainer.scrollTop = dialogueContainer.scrollHeight
          submitCustomerText(dialogueInput.value)
          dialogueInput.value = null
        }
      })

      async function submitCustomerText(text) {
        let answer = await getAnswer(text)
        getServiceText(answer)
      }

      function getServiceText(serviceText) {
        var nodeP = doc.createElement('p'),
          nodeSpan = doc.createElement('span'),
          serviceAvatar = doc.createElement('img')
        nodeP.classList.add('dialogue-service-container')
        nodeSpan.classList.add('dialogue-text', 'dialogue-service-text')
        serviceAvatar.src = require('../assets/robot.jpg')
        serviceAvatar.classList.add('avatar')
        nodeSpan.innerHTML = serviceText
        nodeP.appendChild(serviceAvatar)
        nodeP.appendChild(nodeSpan)
        dialogueContainer.appendChild(nodeP)
        dialogueContainer.scrollTop = dialogueContainer.scrollHeight
      }

      function fadeOut(obj) {
        //渐隐
        var n = 100
        var time = setInterval(function () {
          if (n > 0) {
            n -= 10
            obj.style.opacity = '0.' + n
          } else if (n <= 30) {
            obj.style.opacity = '0'
            clearInterval(time)
          }
        }, 10)
        return true
      }

      function fadeIn(obj) {
        //渐显
        var n = 30
        var time = setInterval(function () {
          if (n < 90) {
            n += 10
            obj.style.opacity = '0.' + n
          } else if (n >= 80) {
            obj.style.opacity = '1'
            clearInterval(time)
          }
        }, 100)
        return true
      }
    },
  },
}
</script>

<style>
body {
  position: relative;
}

.dialogue-wrapper {
  font-size: 14px;
  color: #fff;
}
/*右侧点击按钮*/
.dialogue-wrapper .dialogue-support-button {
  position: fixed;
  display: inline-block;
  top: 20%;
  right: 0;
  margin-top: -70px;
  padding: 10px 0;
  width: 40px;
  height: 120px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.4);
  background-color: #7f7fd5;
}

.dialogue-wrapper .dialogue-support-button .dialogue-support-icon {
  position: relative;
  display: inline-block;
  margin-bottom: -2px;
  width: 20px;
  height: 16px;
  border-radius: 4px;
  background-color: #fff;
}

.dialogue-wrapper .dialogue-support-button .dialogue-support-icon:before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  margin-left: -3px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #ffffff;
}

.dialogue-wrapper .dialogue-support-button .dialogue-support-line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #ddd;
}
.dialogue-wrapper .dialogue-support-button .dialogue-support-text {
  padding: 5px;
  letter-spacing: 4px;
  writing-mode: vertical-rl;
  -webkit-user-select: none;
}

/*底部客服对话框*/
.dialogue-wrapper .dialogue-main {
  position: fixed;
  display: none;
  height: 30%;
  top: 10px;
  right: 100px;
  width: 400px;
  /*height: 800px;*/

  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
/*
客服对话框头部
 */
.dialogue-wrapper .dialogue-main .dialogue-header {
  position: relative;
  padding: 10px;
  height: 50px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #7f7fd5;
}

.dialogue-wrapper .dialogue-main .dialogue-close {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 2px;
  font-size: 22px;
  font-family: 微软雅黑;
  cursor: pointer;
}

.dialogue-wrapper .dialogue-main .dialogue-service-info {
  position: absolute;
  height: 40px;
}

.dialogue-wrapper .dialogue-main .dialogue-service-img {
  display: inline-block;
  margin: 0 10px 0 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  color: #000;
  border-radius: 50%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  background-image: url('../assets/robot.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  /*background-color: #ffffff;*/
}
.dialogue-wrapper .dialogue-main .dialogue-service-title {
  display: inline-block;
  vertical-align: middle;
}

.dialogue-wrapper .dialogue-main .dialogue-service-detail {
  font-size: 10px;
}
/*客服对话框内容*/
.dialogue-wrapper .dialogue-main .dialogue-container {
  overflow-y: auto;
  padding: 10px;
  height: 500px;
  word-wrap: break-word;
  background-color: #fff;
}

.dialogue-wrapper .dialogue-main .dialogue-text {
  display: inline-block;
  position: relative;
  padding: 10px;
  max-width: 320px;
  white-space: pre-wrap;
  border-radius: 4px;
  box-sizing: border-box;
}

.dialogue-service-container .dialogue-text {
  border: 1px solid #3fcc91;
  background-color: #3fcc91;
}

.dialogue-customer-container .dialogue-text {
  border: 1px solid #4c69c7;
  background-color: #4c69c7;
}

.dialogue-wrapper .dialogue-main .dialogue-service-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}
/*dialogue-wrapper .dialogue-main .dialogue-text*/
.dialogue-wrapper .dialogue-main .dialogue-service-text {
  margin-left: 20px;
}

.dialogue-wrapper .dialogue-main .dialogue-service-text:before {
  content: '';
  position: absolute;
  top: 50%;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 10px solid #3fcc91;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.dialogue-wrapper .dialogue-main .dialogue-customer-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  text-align: right;
}
.dialogue-wrapper .dialogue-main .dialogue-customer-text {
  margin-right: 20px;
  text-align: left;
}
.dialogue-wrapper .dialogue-main .dialogue-customer-text:after {
  content: '';
  position: absolute;
  top: 50%;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid #4c69c7;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

/*客服对话框底部输入*/
.dialogue-wrapper .dialogue-main .dialogue-submit {
  /*position: relative;*/
  bottom: 0px;
  padding: 10px;
  height: 100px;
  color: #ffffff;
  word-wrap: break-word;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
  background-color: #dedede;
}

/*输入空的提示*/
.dialogue-wrapper .dialogue-main .dialogue-hint {
  position: absolute;
  bottom: 88px;
  left: 20px;
  padding: 2px;
  width: 140px;
  height: 18px;
  opacity: 0;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 1px 1px 4px rgba(145, 143, 143, 0.4);
  background-color: #fff;
}

.dialogue-wrapper .dialogue-main .dialogue-hint-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  font-size: 14px;
  font-style: italic;
  font-weight: 700;
  vertical-align: middle;
  line-height: 18px;
  color: #fff;
  border-radius: 50%;
  background-color: #7f7fd5;
}

.dialogue-wrapper .dialogue-main .dialogue-hint-text {
  display: inline-block;
  vertical-align: middle;
  color: #3d3d3d;
}
/*输入框*/
.dialogue-wrapper .dialogue-submit .dialogue-input-text {
  overflow-y: auto;
  display: inline-block;
  padding: 5px 10px;
  width: 280px;
  height: 75px;
  vertical-align: middle;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  border-color: #ffffff;
  border-width: 2px;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
}
.dialogue-wrapper .dialogue-submit .dialogue-input-tool {
  /*display: inline-block;*/
  /*width: 80px;*/
  /*height: 80px;*/
  /*vertical-align: middle;*/
  display: inline-block;
  margin: 0 10px 0px 20px;
  width: 50px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  background-color: #7f7fd5;
}

.avatar {
  left: 20px;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background-color: rgb(242, 249, 255);
}
</style>
