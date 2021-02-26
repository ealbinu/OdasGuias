Vue.component('checkmark', {
    template: `<img src="../assets/aimg/check.svg" class="animate__animated animate__heartBeat">`
})

Vue.component('markex', {
    template: `<img src="../assets/aimg/markex.svg" class="animate__animated animate__heartBeat">`
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
    props: ['currentScene', 'scenes', 'answereds', 'onlypages', 'totalscenes'],
    mounted(){

    },
    template: `
    <div class="row navigation  text-center">
        <div class="col paginas">


            <div v-for="(i, index) in scenes+1" v-if="onlypages==undefined" :class="
                [
                'pagina ',
                (currentScene == index*10 ? 'iscurrent':''),
                (i.res!=undefined?' isok':''),
                (i.res===false?' iswrong':''),
                
                ]"
                @click="$emit('goto', index*10)">
                    <span>{{(index*10)+1}} - <template v-if="index<scenes">{{(index*10)+10}}</template><template v-else>{{totalscenes.length}}</template></span>
            </div>
            
            <div v-for="(i, index) in totalscenes" v-if="onlypages!=undefined" :class="
            [
            'pagina',
            'unanswered',
            (i.res!=undefined?' isok':''),
            (i.res===false?' iswrong':''),
            (answereds[index]===0 || answereds[index] && answereds[index]!==undefined && answereds[index]!='' && answereds[index]!=null && answereds[index]!='[]' ? ' isanswered':'')
            ]"
            @click="$emit('goto', Math.floor(index/10)*10 )">
                <span>{{(index)+1}}</span>
            </div>
            
            
            <div :class="'pagina ' + (scenes == currentScene ? 'iscurrent':'')" @click="$emit('goto', totalscenes.length+1)"><span>F</span></div>
        
        
        </div>
        <div class="col-4 col-md-3" v-if="onlypages==undefined">
            <button @click="$emit('back')" :disabled="currentScene == 0">Anterior</button>
            <button @click="$emit('next')" :disabled="currentScene == (totalscenes.length+1)">Siguiente</button>
        </div>
    </div>
    `
})


