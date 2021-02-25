Vue.component('dropdowns', {
    props: ['value', 'options'],
    data() {
        return {
            status: "",
            evaluate: false,
            result: false,
            answers: []
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
    methods: {
        inputed () {
            if(this.evaluate) {
                return false
            }
            this.$emit('input', this.status)
            if(this.status) {
                s_ok.play()
            } else {
                s_error.play()
            }
        },
        verify () {

            this.evaluate = true

            this.result = true
            

            for(var i in this.options){
                let op = this.options[i]
                if(op.options){
                    if(op.answer == this.answers[i]){
                        console.log('OKAY', op.answer, this.answers[i])
                    } else {
                        console.log('ERRORW', op.answer, this.answers[i])
                        this.result = false
                    }
                    console.log(op.answer)
                }
            }

            //FINISHI
            if(this.result){
                this.$emit('isright', true)
                this.result = true
            }
        }
    },
    mounted () {
        this.$emit('input', "")
    },
    template: `
        <div class="dropdowns" :class="setclass">
            <template v-for="(i, index) in options">
                <div v-if="i.text" v-html="i.text"></div>
                <select v-if="i.options" v-model="answers[index]" :disabled="evaluate">
                    <option v-for="(op, opindex) in i.options" v-html="op"></option>
                </select>
                <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            </template>
        </div>
    `
})


/*

<dropdowns v-model="r[0]" :ref="refCount()"  @isright="right++" :options="[
    {options: [0,1, 2, 3, 4, 5, 6, 7,8,9, 10, 11, 12], answer: 4, placeholder: '0'},
    {text: ' : '},
    {options: ['00',15, 20, 25, 30, 35, 40, 45, 50, 55], answer: 15, placeholder: '00'}
]"></dropdowns>
*/