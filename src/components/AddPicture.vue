<template>
<div id="addPicture">

  <v-container>
    <div class="display-3">Add your picture treasures</div>
    <div class="display-1">So anyone could enjoy it</div>

    <upload-file label="Choose pictures" multiple accept="image/*" @selected="generatePreview" />

    <!--  -->

  </v-container>

  <v-layout wrap>
    <v-flex xs12 sm6 md4 lg3 xl2 v-for="index in imageCounter" :key="imageNames[index - 1]">

      <div class="portrait" v-if="imageDatas[index - 1]">
        <v-card :img="imageDatas[index - 1]" height="300px">
          <v-card-row actions class="white--text pl-3 pt-3 pb-3">{{ imageNames[index - 1] }}</v-card-row>
        </v-card>
      </div>

      <div class="progress-circular-wrapper" v-else>
        <v-progress-circular indeterminate :size="150" :width="3" class="primary--text"/>
      </div>

    </v-flex>
  </v-layout>

</div>
</template>

<script>
import UploadFile from './inner/UploadFile'
import imageCompressMixin from '../imageCompressMixin'

export default {
  name: 'addPicture',
  components: {
    UploadFile
  },
  mixins: [imageCompressMixin],
  data () {
    return {
      imageNames: [],
      imageDatas: [],
      imageCounter: 0
    }
  },
  methods: {
    generatePreview (files) {
      this.imageCounter = files.length
      const compressed = this.processImages(files)
      this.imageNames = compressed.imageNames
      this.imageDatas = compressed.resizedImages
    }
  }
}
</script>

<style scoped>
.flex {
  margin-bottom: 16px
}

.card__row--actions {
  background: rgba(0, 0, 0, 0.25)
}

.progress-circular-wrapper {
  height: 300px;
  position: relative;
  text-align: center;
}

.progress-circular {
  top: 50%;
  transform: translateY(-50%);
}
</style>
