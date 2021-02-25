Vue.component('popper', {
    props: [],
    data() {
        return {
            opened: false
        }
    },
    computed:{
        
    },
    methods: {
        
    },
    mounted () {
        //this.$emit('input', false)

    },
    template: `
        <div class="popper">
            <div class="popper__opener animate__animated animate__pulse animate__infinite animate__slower" @click="opened=true">
                <div class="popper__hand animate__animated animate__pulse animate__infinite"></div>
                <slot></slot>
            </div>
            <div class="popper__window" v-if="opened">
                <div class="popper__closer" @click="opened=false">x</div>
                <div class="container">
                    <slot></slot>
                </div>
            </div>
        </div>
    `
})