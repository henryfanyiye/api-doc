<template>
  <div class='preview-container'>
    <div id='preview' />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'Preview',
  props: {
    content: String
  },
  watch: {
    content() {
      if (this.content) {
        Vditor.preview(document.getElementById('preview'), this.content)
      }
    }
  }
}
</script>

<style>
.preview-container {
  background-color: #fff;
  width: 100%;
}

#preview {
  width: 100%;
  margin: auto;
}
</style>
