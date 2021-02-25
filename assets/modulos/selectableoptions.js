Vue.component('selectableoptions', {
    props: ['value', 'text', 'answer', 'id', 'watch', 'options', 'customclass', 'num'],
    data() {
        return {
            status: "",
            evaluate: false,
            result: false
        }
    },
    computed:{
        setclass () {
            if(this.evaluate) {
                return this.result ? 'isright':'iswrong'
            } else {
                return ''
            }
        }
    },
    watch: {
        value () {
            if(this.watch){
                this.status = this.value
            }
        }
    },
    methods: {
        clicked (val) {
            if(this.evaluate) {
                return false
            }
            this.status = val
            //this.status = !this.status
            this.$emit('input', this.status)

            this.$emit('clicked', this.status)
            if(this.status) {
                s_ok.play()
            } else {
                s_error.play()
            }
        },

        verify () { 
            this.evaluate = true
            if(Array.isArray(this.answer)){
                if(this.answer.find(element => element == this.status)){
                    this.$emit('isright', true)
                    this.result = true
                }
            } else {
                if(this.status == this.answer) {div
                    this.$emit('isright', true)
                    this.result = true
                } else {
                    this.$emit('iswrong')
                }
            }
        }
    },
    mounted () {
        this.$emit('input', "")
    },
    template: `
    <div :class="'row justify-content-center align-items-center selectableoptions '+setclass">
        <div class="label"><strong v-if="num">{{num}}</strong> <span v-html="text"></span></div>
        <div class="options">
            <div :class="customclass +' option '+ (option.val == status ? 'on':'off')" v-for="option in options" @click="clicked(option.val)">
                <slot name="option" :option="option" />
                <!--<div :class="status == option.val ? 'circledactive' : ''"></div>-->
            </div>
        </div>
        <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
    </div>
    `
})


/*
<selectableoptions v-model="r[0]" :ref="refCount()" @isright="right++" answer="yes" :options="[{val:'yes', img:'aimg/i2.png'},  {val:'no', img:'aimg/i2.png'}]" customclass="col-sm-6">
    <template v-slot:option="{option}">
        <img :src="option.img" class="img-fluid">
    </template>
</selectableoptions>
*/