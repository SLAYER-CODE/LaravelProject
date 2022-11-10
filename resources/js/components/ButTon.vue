<template>
  <button
    aria-expanded="false"
    aria-haspopup="true"
    role="button"
    type="button"
  >
    Click me
  </button>
</template>

<script>
import Article from "./Article.vue"
export default {
    components:{
        Article
    },
    setup() {
        console.log("Se cargo el componente")
    },
    mounted(){
        console.log("Se     cargo el elemento")
    }
}
</script>