<template>
<div id="addPicture">
  <md-layout md-gutter>

    <span class="md-display-4">Add your picture treasures</span>
    <span class="md-display-3">So anyone could enjoy it</span>

    <md-input-container>
      <label>Choose pictures</label>
      <md-file v-model="imageNames" multiple accept="image/*" @selected="generatePreview"></md-file>
    </md-input-container>

    <div class="card-holder">
      <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex="33" v-for="image in images" :key="image">
        <md-card>
          <md-card-media-cover md-text-scrim>
            <md-card-media>
              <img :src="image">
            </md-card-media>
          </md-card-media-cover>
        </md-card>
      </md-layout>
    </div>

  </md-layout>
</div>
</template>

<script>
export default {
  name: 'addPicture',
  data () {
    return {
      imageNames: '',
      images: []
    }
  },
  methods: {
    generatePreview (files) {
      Array.from(files).forEach((item) => {
        var reader = new FileReader()
        reader.onload = (e) => this.images.push(e.target.result)
        reader.readAsDataURL(item)
      })
    }
  }
}
</script>

<style lang="scss">

.page-content {
    min-height: 100%;
    max-height: 100%;
    flex: 1;
    display: flex;
    flex-flow: column
  }
.card-holder {
    .md-card {
      width: 100%;
      max-width: 320px;
      margin: 0 4px 16px;
      display: inline-block;
      vertical-align: top;
    }
  }
</style>
