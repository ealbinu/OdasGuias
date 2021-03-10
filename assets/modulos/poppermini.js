Vue.component('poppermini', {
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
        <div class="popper mini">
            <div class="popper__opener animate__animated animate__pulse animate__infinite animate__slower" @click="opened=true">
                <div class="popper__q animate__animated animate__pulse animate__infinite"></div>
                <div class="popper_incontainer"><slot></slot></div>
            </div>
            <div class="popper__window" v-if="opened">
                <div class="popper__closer animate__animated animate__fadeInRight animate__delay-1s" @click="opened=false">x</div>
                <div class="container">
                    <slot></slot>
                </div>
            </div>
        </div>
    `
})