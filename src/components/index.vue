<template>
    <el-row :gutter="20">
      <el-card class="box-card">
        <div class="demo-basic--circle">
          <div class="block"><el-avatar :size="150" :src="avatar"></el-avatar></div>
        </div>
          <h1>短视频/图集在线去水印解析</h1>
          <div class="typo">
            <p><strong>本站公告 </strong>解析失败请留言: <b><a href="https://5ime.cn/guestbook" target="_blank" rel="nofollow"> 留言反馈 </a></b><u>图集解析仅抖音/快手/微博/皮皮虾/最右可用</u></p>
            <p><strong>目前支持 </strong>皮皮虾/抖音/微视/快手/6间房/哔哩哔哩/微博/绿洲/度小视/开眼/陌陌/皮皮搞笑/全民k歌/逗拍/虎牙/新片场/哔哩哔哩/Acfun/美拍</p>
            <p><strong>温馨提示 </strong>粘贴视频地址时<u>无需删除文案</u><small> 但如果视频链接正确但解析失败请删掉文案后重试</small></p>
          </div>
          <hr>
          <div class="main" v-loading="loading">
            <div class="grid-content">
                <el-input placeholder="请粘贴分享链接" v-model="input" id="url" lass="input-with-select">
                  <el-select v-model="select" slot="prepend" placeholder="视频">
                    <el-option label="视频" value="1"></el-option>
                    <el-option label="图集" value="2"></el-option>
                  </el-select>
                  <el-button slot="append" @click="onSubmit" >解析</el-button>
                </el-input>
            </div>
            <div class="download" v-if="seen">
              <h4>{{info.title}}</h4>
              <a :href="info.cover" target="_blank"><el-button plain>下载封面</el-button></a>
              <a :href="info.url" target="_blank"><el-button plain>下载视频</el-button></a>
              <a :href="info.music.url" v-if="music" target="_blank"><el-button plain>下载音乐</el-button></a>
            </div>
            <div class="waterfall" v-if="iseen">
              <div class="item" v-for="url in images_url" :key ="url">
                <el-image 
                  :src="url" 
                  :preview-src-list="images_url">
                </el-image>
              </div>
            </div>
          </div>
      </el-card>
    </el-row>
</template>
<script>
export default {
  data() {
    return {
      info: {},
      input: '',
      select: '',
      music: false,
      seen: false,
      iseen: false,
      loading: false,
      avatar: "https://cdn.jsdelivr.net/gh/5ime/img/avatar.jpg",
      images_url: {}
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      const url = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+%]*[/]*/.exec(this.input)
      if(this.select == '1' || this.select == ''){
        this.axios.get('https://tenapi.cn/v2/video?url=' + url).then((res) => {
          if(res.data.code == 200){
            if(res.data.data.music != null){
              this.music = true
            }
            this.seen = true
            this.info = res.data.data
            this.loading = false
            this.$notify.success({
              title: '解析成功',
              message: '请及时下载音视频'
            });
          }else{
            this.seen = false
            this.loading = false
            this.$notify.error({
              title: '解析失败',
              message: '视频不存在或接口失效'
            });
          }
        })
      }else{
        this.seen = false
        this.axios.get('https://tenapi.cn/v2/images?url=' + url).then((res) => {
          if(res.data.code == 200){
            this.iseen = true
            this.loading = false
            this.images_url = res.data.data.images
            this.$notify.success({
              title: '解析成功',
              message: '图集暂不支持批量下载，请长按下载或右键另存为'
            });
          }else{
            this.iseen = false
            this.loading = false
            this.$notify.error({
              title: '解析失败',
              message: '图集不存在或接口失效'
            });
          }
          console.log(this.images_url);
        })
      }
    },
  }
}
</script>

<style>
  ::selection {
    background: rgba(0,149,255,.1);
  }

  body:before{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .3;
    z-index: -1;
    content: "";
    position: fixed;
    background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);
  }

  .grid-content {
    margin-top: 1em;
    border-radius: 4px;
    min-height: 50px;
  }

  .el-select .el-input {
    width: 80px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;

  }

  .box-card {
    margin-top: 4em!important;
    margin-bottom: 4em!important;
    opacity: .8;
  }

  @media screen and (max-width: 700px){
    .box-card {
      margin-top: 1em!important;
      margin-bottom: 1em!important;
    }
  }
  .download h3{
      margin-top: 2em;
    }

  .download button{
    margin-right: 0.5em;
    margin-left: 0.5em;
  }

  .waterfall {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
  }

  .item {
    padding: 5px;
    break-inside: avoid;
  }

  .item img {
    width: 100%;
    margin-bottom: 10px;
  }
  .typo {
    text-align: left;
  }
  .typo a {
    color: #2c3e50;
    text-decoration:none;
  }

  hr{
    height: 10px;
    margin-bottom: .8em;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.12);
  }
</style>
