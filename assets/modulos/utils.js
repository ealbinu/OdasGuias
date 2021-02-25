Vue.component('checkmark', {
    template: `<img src="../../assets/aimg/check.svg" class="animate__animated animate__heartBeat">`
})

Vue.component('markex', {
    template: `<img src="../../assets/aimg/markex.svg" class="animate__animated animate__heartBeat">`
})

Vue.component('aimg', {
    props: ['file'],
    template: `<img :src="'aimg/'+file" class="img-fluid">`
})



Vue.component('imgbg', {
    props: ['initclass', 'img'],
    template: `
        <div :class="'imgbgMod ' + initclass + ' animate__animated animate__pulse animate__delay-2s'">
            <img :src="img" class="w-100 ">
            <div class="inputs">
                <slot></slot>
            </div>
        </div>
        `
})


Vue.component('navigation', {
    props: ['currentScene', 'scenes', 'answereds', 'onlypages'],
    mounted(){
    },
    template: `
    <div class="row navigation  text-center">
        <div class="col paginas">
            <div v-for="(i, index) in scenes" :class="'pagina ' + (currentScene == index ? 'iscurrent':'') + (i.res!=undefined?' isok':'') + (i.res===false?' iswrong':'') + (answereds[index]===0 || answereds[index] && answereds[index]!==undefined && answereds[index]!='' && answereds[index]!=null && answereds[index]!='[]' ? ' isanswered':'')" @click="$emit('goto', index)"> <span>{{index+1}}</span> </div>
            <div :class="'pagina ' + (scenes.length == currentScene ? 'iscurrent':'')" @click="$emit('goto', scenes.length)"><span>F</span></div>
        </div>
        <div class="col-4 col-md-3" v-if="onlypages==undefined">
            <button @click="$emit('back')" :disabled="currentScene == 0">Anterior</button>
            <button @click="$emit('next')" :disabled="currentScene == scenes.length">Siguiente</button>
        </div>
    </div>
    `
})


