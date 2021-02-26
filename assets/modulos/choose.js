Vue.component('choose', {
    props: ['value', 'text', 'options', 'answer', 'num', 'isactive', 'settings'],
    data() {
        return {
            status: null,
            evaluate: false,
            result: false,
            customid: false,
            customclass: false,
            multiple: null,
            multipleAnswers: [],
        }
    },
    watch: {
        value (old, nu) {
            this.status = this.value
        }
    },
    computed:{
        setclass () {
            if(this.evaluate) {
                return this.result ? 'isright':'iswrong'
            } else {
                return ''
            }
        },
    },
    methods: {
        onOffItem(op){
            var i = this.multipleAnswers.indexOf(op)
            if (i === -1){
                return false
            } else {
                return true
            }
        },
        clicked (op) {
            if(this.evaluate) {
                return false
            }
            
            if(this.multiple==false){
                /* SINGLE */ // ############################ 
                this.status = op
                this.$emit('input', this.status)
                var _this = this
                setTimeout(function () {
                    _this.$emit('choosed')
                },100)
                if(this.status!=null) {
                    //s_ok.play()
                }
            } else if(this.multiple==true){
            /* MULTIPLE */ // >>>>>>>>>>>>>>>>>>>>>>>>>>>
                s_ok.play()
                var i = this.multipleAnswers.indexOf(op)
                if (i === -1){
                    this.multipleAnswers.push(op)
                } else {
                    this.multipleAnswers.splice(i,1)
                }
                this.$emit('input', this.multipleAnswers)
            }
        },
        verify () { 
            this.evaluate = true
            if(this.multiple==false){
            /* SINGLE */ // ############################ 
                if(this.status == this.answer) {
                    this.$emit('isright', true)
                    this.result = true
                } else {
                    this.$emit('iswrong')
                }

            } else if(this.multiple==true){
                /* MULTIPLE */ // >>>>>>>>>>>>>>>>>>>>>>>>>>>
                if(_.isEqual(this.answer.sort(), this.multipleAnswers.sort())){
                    this.$emit('isright', true)
                    this.result = true
                } else {
                    this.$emit('iswrong')
                }
            }
        }
    },
    mounted () {
        //this.$emit('input', null)
        
        if(this.value !== null){
            this.status = this.value
            this.$emit('input', this.status)
        }
        //SETTINGS
        if(this.settings){
            const st = this.settings
            this.customid = st.id ? st.id : ''
            this.customclass = st.class ? st.class : ''
        }
        // Multiple?
        if(Array.isArray(this.answer)){
            this.multiple = true
        } else {
            this.multiple = false
        }
    },
    template: `
        <div class="choose" :class="setclass + customclass" :id="customid">
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            <div class="label"><strong v-if="num">{{num}}</strong> <span v-html="text"></span></div>
            <div class="options">
                <template v-if="multiple==false">
                    <template v-for="(op, index) in options" v-if="multiple==false">  
                        <div @click="clicked(index)" v-if="status!=index" v-html="op+'<span class=fixline>.</span>'" :class="isactive ? 'animate__animated animate__bounce animate__fast':''"></div>
                        <div @click="clicked(index)" v-if="status==index" class="active animate__animated animate__rubberBand" v-html="op+'<span class=fixline>.</span>'"></div>
                    </template>
                </template>
                <template v-if="multiple==true">
                    <template v-for="(op, index) in options">
                        <!--<div @click="clicked(index)"  v-html="op" :class="isactive ? 'animate__animated animate__bounce animate__fast':''"></div>-->
                        <div @click="clicked(index)" :class="onOffItem(index) ? 'active animate__animated animate__rubberBand':'animate__animated animate__bounce animate__fast' " v-html="op"></div>
                    </template>
                </template>
            </div>
        </div>
    `
})

/*
<choose v-model="r[4]" :ref="refCount()" num="1." text="El vestido de la niña es:" :options="['rojo', 'amarillo', 'azul']" @isright="right++" answer="amarillo"></choose>
*/