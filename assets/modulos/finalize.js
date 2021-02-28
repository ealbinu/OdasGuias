Vue.component('finalize', {
    props: ['resultado', 'right', 'total'],
    data() {
        return {
            areyousure: false,
            saving: 0
        }
    },

    methods: {
        savit(){
            this.$emit('save')
            this.saving = 1
            var _this = this
            setTimeout(function (){
                _this.saving = 2
                setTimeout(function (){
                    _this.saving = 0
                },1500)
            },1000)
            
        }
    },
    mounted () {
        
    },
    template: `
        <div class="finalize">
            <div class="d-flex justify-content-center mt-5 flex-column text-center" v-if="!resultado">
                
                
                <template v-if="!saving">
                    <button class="animate__animated animate__rubberBand finalizar small my-5 mx-auto" @click="savit">Guardar respuestas y continuar más tarde</button>
                </template>
                <template v-if="saving==1">
                    <div class="saving-itm animate__animated animate__heartBeat my-5 mx-auto text-center">Guardando...</div>
                </template>
                <template v-if="saving==2">
                    <div class="finalizar small savedok animate__animated animate__pulse my-5 mx-auto text-center">¡Respuestas guardadas!</div>
                </template>

                <button class="finalizar" @click="areyousure = true" v-if="!areyousure">Finalizar Dominio</button>
                <template v-if="areyousure">
                    <p class="yessure">¿Deseas terminar con el Dominio? Tus resultados se guardarán y ya no podrás cambiar las respuestas.</p>
                    <button class="finalizar sure" @click="$emit('evaluate')">Terminar Dominio</button>
                    </template>
                <div class="text-center"><button class="finalizar small mt-5" @click="areyousure=false; $emit('goback')">Regresar al Dominio</button></div>
            </div>

            <div class="d-flex justify-content-center mt-5 resultado" v-if="resultado">
                <h3>Resultado</h3>
                <div><strong>{{right}} respuesta<span v-if="right>1 || right==0">s</span> correcta<span v-if="right>1 || right==0">s</span> </strong> de {{total}} preguntas</div>
                <!--<button class="finalizar" @click="$emit('reset')">Volver a intentar</button>-->
            </div>

        </div>
    `
})