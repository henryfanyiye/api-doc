<template>
  <div id='edit' />
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'VditorEdit',
  props: {
    content: String,
    save: Function
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      contentEditor: '',
      text: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      const that = this
      if (that.content) {
        sessionStorage.setItem('content', that.content)
      } else {
        that.text = sessionStorage.getItem('content') || ''
      }
      that.contentEditor = new Vditor('edit', {
        value: that.content || that.text,
        height: this.screenHeight - 40,
        toolbar: [
          'headings', 'bold', 'italic', 'strike', '|',
          'list', 'ordered-list', '|',
          'line', 'code', 'inline-code', 'table', '|',
          'undo', 'redo', '|',
          'fullscreen', 'edit-mode', 'preview',
          {
            name: 'save',
            tipPosition: 'n',
            tip: '保存',
            icon: '<svg t="1619767395575" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1289" width="200" height="200"><path d="M426.666667 128h-149.333334v234.453333c0 12.074667 9.450667 21.546667 21.205334 21.546667h298.922666c11.626667 0 21.205333-9.6 21.205334-21.546667V128h-64v149.504c0 23.466667-19.157333 42.496-42.624 42.496h-42.752A42.666667 42.666667 0 0 1 426.666667 277.504V128zM192 896V661.546667C192 602.474667 239.786667 554.666667 298.837333 554.666667h426.325334A106.709333 106.709333 0 0 1 832 661.546667V896h42.517333A21.312 21.312 0 0 0 896 874.752V273.664L750.336 128H704v234.453333c0 58.965333-47.701333 106.88-106.538667 106.88H298.538667A106.56 106.56 0 0 1 192 362.453333V128H149.248A21.269333 21.269333 0 0 0 128 149.482667v725.034666C128 886.421333 137.578667 896 149.482667 896H192zM42.666667 149.482667A106.602667 106.602667 0 0 1 149.248 42.666667H768a42.666667 42.666667 0 0 1 30.165333 12.501333l170.666667 170.666667A42.666667 42.666667 0 0 1 981.333333 256v618.752A106.645333 106.645333 0 0 1 874.517333 981.333333H149.482667A106.752 106.752 0 0 1 42.666667 874.517333V149.482667z m704 512.042666c0-12.010667-9.536-21.525333-21.504-21.525333H298.837333C286.933333 640 277.333333 649.6 277.333333 661.546667V896h469.333334V661.546667z" fill="#000000" p-id="1290"></path></svg>',
            click() {
              that.save()
            }
          },
          {
            name: 'back',
            tipPosition: 'n',
            tip: '返回',
            icon: '<svg t="1620797340639" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1257" width="200" height="200"><path d="M482.7 249.9V106.1c0-37.4-45.3-56.2-71.7-29.7L140.3 347c-16.4 16.4-16.4 43 0 59.4L410.9 677c26.5 26.5 71.7 7.7 71.7-29.7v-155c96.1-0.3 271.5-10.7 271.5 227.7 0 118.1-92.8 216.8-216 239.6 198.1-24.4 326-236 326-361.9 0.1-292.6-309.4-346.3-381.4-347.8z" fill="" p-id="1258"></path></svg>',
            click() {
              that.$router.back()
            }
          }
        ],
        tab: '\t',
        mode: 'sv',
        preview: {
          actions: [],
          markdown: {
            autoSpace: true,
            fixTermTypo: true
          }
        },
        cache: {
          enable: false
        }
      })
    })
  }
}
</script>
