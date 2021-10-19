<template>
  <div id="homepage">

    <div id="test" class="block" style="height: 100vh">
      <div class="kg_container">
        <KGBuilder id="酒店集团" :groupname="this.activeName" @child-event='changeActive'/>
      </div>

    </div>

    <div id="dialog_box">
      <dialog_box>

      </dialog_box>
    </div>


  </div>
</template>

<script>
import KGBuilder from "@/components/KGBuilder.vue";
import dialog_box from "@/components/dialog_box";

export default {
  name: "Home",
  components: {
    KGBuilder,
    dialog_box

  },
  data() {
    return {
      activeName: '华住酒店集团',
    };
  },
  mounted() {},
  methods: {
    changeActive(data){
      console.log(data);
      this.activeName = data;
      console.log(this.activeName);
    }
  },
};


</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.kg_container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3)), url('../assets/bg.jpeg') no-repeat;
  background-size: cover;

}

#dialog_box {
  z-index: 999;
  position: absolute;
}

</style>
