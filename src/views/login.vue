<template>
  <div class="homepage-hero-module">
    <!-- 登录框 -->
    <div class="login-container">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-position="left"
        class="login-form form-primary"
      >
        <h2 class="login-title">
          <img
            src="@/assets/logo.png"
            style="width: 32px; height: 32px; margin-right: 5px;"
            alt=""
          />
          GoodOrder 好订
        </h2>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <div style="display:flex; justify-content:flex-end;">
            <a href="" style="font-size: 12px; line-height: 20px;">忘记密码？</a>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>

        <el-divider></el-divider>
        <div class="jump-to-register">
          还没有账号？
          <a href="register">👉 戳这里注册！</a>
        </div>
        <div class="visitor">
          <a href="/">>>以游客身份登录</a>
        </div>
      </el-form>
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
export default {
  name: 'login',
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    canplay() {
      this.vedioCanPlay = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid) 验证通过为true，有一个不通过就是false
        if (valid) {
          // 通过的逻辑 -- 调用登录接口
        } else {
          console.log('验证失败')
          return false
        }
      })
    },
  },

  mounted() {
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

.login-form.form-primary {
  border-top: 2px solid #d75455;
}

.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 6px;
  border: none;
}

.login-title {
  display: flex;
  color: #303133;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.jump-to-register {
  color: #3e4244;
  text-align: center;
}
</style>
