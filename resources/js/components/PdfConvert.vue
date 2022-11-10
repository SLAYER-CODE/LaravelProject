<template>
  Mostrando Articulo
  <article id="1" title="Boton" body="Nop"/>
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