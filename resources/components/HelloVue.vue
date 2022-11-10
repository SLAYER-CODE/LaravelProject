<template>
  <h1>Hello Vue!</h1>
</template>

<script>
import Article from "./Article.vue"
export default {
    components:{
      Article
    },
    mounted(){
      console.log("Se monto articulo")
    }
}
</script>