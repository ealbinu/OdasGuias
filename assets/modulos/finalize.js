Vue.component('finalize', {
    props: ['resultado', 'right', 'total'],
    data() {
        return {
            areyousure: false
        }
    },

    methods: {
        
    },
    mounted () {
        
    },
    template: `
        <div class="finalize">
            <div class="d-flex justify-content-center mt-5 flex-column text-center" v-if="!resultado">
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