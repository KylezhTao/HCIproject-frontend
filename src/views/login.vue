<template>
  <div class="homepage-hero-module">
    <div class="login-container">
      <div class="login-register-card form-primary">
        <h2 class="login-title">
          <img
            src="@/assets/logo.png"
            style="width: 32px; height: 32px; margin-right: 5px;"
            alt=""
          />
          GoodOrder 好订
        </h2>
        <!-- 登录框 -->
        <el-tabs v-model="activeName" ref="tabs">
          <el-tab-pane label="" name="login">
            <el-form
              ref="form"
              :rules="rules"
              :model="form"
              label-position="left"
            >
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="form.password"
                  show-password
                ></el-input>
              </el-form-item>

              <div style="display: flex; justify-content: flex-end;">
                <a href="javascript:void(0)" style="font-size: 12px; line-height: 20px;">
                  忘记密码？
                </a>
              </div>

              <el-form-item>
                <el-button type="primary" @click="submitLoginForm('form')">
                  登录
                </el-button>
              </el-form-item>

              <el-divider></el-divider>
              <div class="jump-to-another">
                还没有账号？
                <a href="#" @click="switchToRegister">👉 戳这里注册！</a>
              </div>
              <div class="visitor">
                <a href="/">&gt;&gt;以游客身份登录&lt;&lt;</a>
              </div>
            </el-form>
          </el-tab-pane>
          <!-- 注册框 -->
          <el-tab-pane label="" name="register" class="register-middle">
            <el-form
              ref="form2"
              :rules="rules2"
              :model="form2"
              label-position="left"
            >
              <el-form-item label="邮箱" prop="registerEmail">
                <el-input v-model="form2.registerEmail" style="max-width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="username">
                <el-input v-model="form2.username" style="max-width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="registerPassword">
                <el-input
                  type="password"
                  v-model="form2.registerPassword"
                  show-password
                  style="max-width:300px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  type="password"
                  v-model="form2.confirmPassword"
                  show-password
                  style="max-width:300px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号（选填）" prop="phoneNumber">
                <el-input v-model="form2.phoneNumber" style="max-width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="头像（选填）" prop="avatar">
                <div style="text-align: left;">
                  <el-upload
                    class="avatar-uploader"
                    ref="upload"
                    action="#"
                    :show-file-list="false"
                    :http-request="httpRequest"
                    :before-upload="beforeUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="register-avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过2MB
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item style="text-align:center;">
                <el-button type="primary" @click="submitRegisterForm('form2')">
                  注册
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <div v-if="activeName === 'register'">
            <el-divider></el-divider>
            <div class="jump-to-another">
              已有账号？
              <a href="#" @click="switchToLogin">前去登录！</a>
            </div>
          </div>
        </el-tabs>
      </div>
    </div>

    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
      <video
        :style="fixStyle"
        autoplay
        muted
        loop
        class="fillWidth"
        v-on:canplay="canplay"
      >
        <source src="@/assets/Hotel room tour.mp4" type="video/mp4" />
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="@/assets/bg.jpeg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '../api/userApi'
import router from '@/router/index.js'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default {
  name: 'login',
  data() {
    var validateEmail = (rule, value, callback) => {
      const re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (re.test(value)) {
        callback()
      } else {
        callback(new Error('当前邮箱格式不正确'))
      }
      callback()
    }

    var validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少6位'))
      }
      callback()
    }

    var validatePasswordConfirm = (rule, value, callback) => {
      const password = this.form.registerPassword
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    }

    return {
      vedioCanPlay: false,
      fixStyle: '',
      activeName: 'login',
      form: {
        email: '',
        password: '',
      },
      form2: {
        registerEmail: '',
        registerPassword: '',
        confirmPassword: '',
        username: '',
        phoneNumber: '',
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
      rules2: {
        registerEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        username: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
        ],
        registerPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePasswordConfirm, trigger: 'blur' },
        ],
      },

      imageUrl: '',
    }
  },

  methods: {
    canplay() {
      this.vedioCanPlay = true
    },

    submitLoginForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid) // 验证通过为true，有一个不通过就是false
        if (valid) {
          // 通过的逻辑 -- 调用登录接口
          const data = {
            email: this.form.email,
            password: this.form.password,
          }

          let res = await login(data)
          if (res.status === 200 && res.data.code === 0) {
            let userToken = this.form.email
            this.$store.commit('setuserInfo', res.data.content)
            this.$store.commit('setuserToken', userToken)
            this.$message.success('登录成功，将跳转至首页...')
            setTimeout(() => router.push('/'), 1000)
          }
          console.log('login: ' + localStorage.getItem('userToken'))
        } else {
          return false
        }
      })
    },

    submitRegisterForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 通过的逻辑 -- 调用注册接口
          const data = {
            email: this.form2.registerEmail,
            password: this.form2.registerPassword,
            username: this.form2.username,
            phoneNumber: this.form2.phoneNumber,
            avatar: this.form2.avatar,
          }

          let res = await register(data)
          if (res.status === 200 && res.data.code === 0) {
            this.$message.success('注册成功，将跳转至登录页...')
            setTimeout(() => this.activeName = 'login', 1000)
            

          }
        } else {
          return false
        }
      })
    },

    hideTabs() {
      this.$refs.tabs.$children[0].$el.style.display = 'none'
    },

    switchToRegister() {
      this.activeName = 'register'
    },

    switchToLogin() {
      this.activeName = 'login'
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只能上传JPG 或 PNG 文件')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小必须小于2MB!')
        return false
      }
      return true
    },

    httpRequest(data) {
      let that = this
      let rd = new FileReader() // 创建文件读取对象
      let file = data.file
      rd.readAsDataURL(file) // 文件读取转换为base64类型
      rd.onloadend =  function (e) {
        that.form2.avatar = that.imageUrl = this.result // this指向当前方法onloadend的作用域
      }
    },
  },

  mounted() {
    this.hideTabs()

    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial',
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial',
        }
      }
    }
    window.onresize()
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
a {
  color: #d75455;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.5s;
}

a:hover {
  color: #007bff;
  text-decoration: none;
}

.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: 0;
  // position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  color: #fff;
}

.login-register-card.form-primary {
  border-top: 2px solid #d75455;
}

.login-register-card {
  width: 350px;
  height: 480px;
  margin: auto auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.9); /* 透明背景色 */
  padding: 30px;
  border-radius: 6px;
  border: none;
  // overflow: scroll;
}

.register-middle {
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-align: left;
}

.register-middle::-webkit-scrollbar {
  width: 4px;
  height: 1px;
}

.register-middle::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(154, 209, 141);
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.register-middle::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.login-title {
  display: flex;
  color: #303133;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-shadow: -1px 0px 3px #817c7c;
}

.jump-to-another {
  color: #3e4244;
  text-align: center;
}

.visitor {
  margin-top: 10px;
  font-size: 13px;
}
</style>

<style>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px !important;
  text-align: center;
}
.register-avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>
