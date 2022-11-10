// resources/app.js

require('./bootstrap');

import { createApp } from 'vue';


import PdfConvert from './components/PdfConvert.vue';
import ButTon from './components/ButTon.vue'

const app = createApp({
    components: {
        PdfConvert,ButTon
    }
});
app.component("PDf-Convert",PdfConvert)       
app.component("But-Ton",ButTon)
app.mount("#app")

// Existen algunos documentos que analizan