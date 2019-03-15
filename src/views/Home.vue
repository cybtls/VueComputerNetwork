<template>
  <div>
    <el-button size="small" type="primary" @click="show">开启新时代</el-button>
    <el-dialog :visible.sync="detialPlayVideo" @close="closePlay">
      <vueplayer ref="videoPlayer" :video-url="videoUrl" :state="state"></vueplayer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detialPlayVideo = false" style="text-align:left">取 消</el-button>
        <el-button type="primary" @click="detialPlayVideo = false" style="text-align:right">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vueplayer from "../components/vueplayer";
export default {
  data() {
    return {
      detialPlayVideo: false,
      videoUrl: "",
      state: ""
    };
  },
  components: {
    vueplayer
  },
  methods: {
    show() {
      this.videoUrl = "../assets/IP.swf";
      this.detialPlayVideo = true;
    },
    closePlay() {
      this.$refs.videoPlayer.player.pause();
      this.videoUrl = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
