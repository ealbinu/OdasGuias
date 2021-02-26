/* AUDIOS */
var s_end = new Howl({ src: ['../assets/asound/end.mp3'] });
var s_error = new Howl({ src: ['../assets/asound/error.mp3'] });
var s_ok = new Howl({ src: ['../assets/asound/ok.mp3'] });
var s_select = new Howl({ src: ['../assets/asound/select.mp3'] });
var s_win = new Howl({ src: ['../assets/asound/win.mp3'] });

var counterRef = 0


/* ################ */
/* VUE INIT */
var app = new Vue({
    el: '#app',
    data () {
        return {
            r: [],
            right: 0,
            total: 0,
            resultado: false,
            scenes: questions,
            currentScene:0,
            scenesby10: 0,
            automaticSeconds: 3600,
            temps: {},
            unanswered:0,
            finalData:{
                score: 100,
                scoresum: 0,
                oks: 0,
                errors: 0,
                answers: 0,
                unanswered: 0,
                wrongAnswers: 0,
                screen: [],
                progress: null
            },
            screen: [],
            started: false,
            currentTime: 0,
            progress: null,
            stillMissing: true
        }
    },
    watch: {
        currentTime(ov, nv){
            let segundos = 60 - (nv % 60)
            if(segundos == 1){ this.buildStoreCall();  }
        },
        r: {
            deep: true,
            handler(){
                this.buildStoreCall()
                var _this = this
                _this.storeScreencapture()
                this.stillMissing = !_.every(this.r, function(num) { return num != undefined })
                /*
                setTimeout(function () {
                    _this.storeScreencapture()
                }, 50)
                */
            }
        }
    },
    methods: {
        buildOpImgs(opciones, opcionesImgsPrefix, settings){
            if(opcionesImgsPrefix == null){
                return opciones.map(item => ''+item+'<span class="fixline">...</span>')
            } else {
                var imgs3 = []
                imgs3.push('<img src="aimg/'+opcionesImgsPrefix+'a.png">')
                imgs3.push('<img src="aimg/'+opcionesImgsPrefix+'b.png">')
                imgs3.push('<img src="aimg/'+opcionesImgsPrefix+'c.png">')
                if(settings){
                    if(settings.imgs==4){
                        imgs3.push('<img src="aimg/'+opcionesImgsPrefix+'d.png">')
                    }
                }
                return imgs3
            }
        },
        buildStoreCall () {
            if(!this.started){
                return false
            }
                let time = this.currentTime + '/'
                let arra = []
                for(i in this.r){
                    if(this.r[i] == null ) {
                        arra.push(-1)
                    } else {
                        arra.push(this.r[i])
                    }
                }



                let arrayt = JSON.stringify(arra) + '/'
                let stringr = time + arrayt + this.currentScene

                //console.log('GUARDADO:',stringr)
                let stringr64 = window.btoa(stringr)
                this.progress = stringr64

                window.location.hash = '#s'+this.finalData.score+'&#d'+stringr64

                var endData = JSON.stringify({progreso: stringr64})
                window.top.postMessage(endData, "*")
                
        },
        refCount($e){
            let ct = 'rf_'+counterRef
            counterRef = counterRef+1
            return ct
        },
        reset () { location.reload() },
        finalizar () {
            s_win.play()

            for(un in this.r){
                var res = this.r[un]
                if(res === undefined || res === "" || res === null || res === -1 || res.length===0){
                    this.unanswered++
                }
            }
            
            this.total = this.r.length
            for(var i in this.$refs){
                if(this.$refs[i]!=undefined){
                    if(Array.isArray(this.$refs[i])){
                        if(this.$refs[i][0]!=undefined){
                            this.$refs[i][0].verify()
                        }
                    } else {
                        this.$refs[i].verify()
                    }
                }
            }
            this.resultado = true
            /* screenshot */
            var _this = this
            domtoimage.toPng(document.body).then(function (dataUrl) {
                _this.screen.push(dataUrl)
                _this.ended()
            }).catch(function (error) { console.error(error) })
            //this.ended()
        },
        ended () {
            var _this = this
            _this.finalData.scoresum = (_this.finalData.score / _this.total) * _this.right
            _this.finalData.oks = _this.right
            _this.finalData.errors = _this.total-_this.right
            _this.finalData.answers = _this.total
            _this.finalData.screen = _this.screen
            _this.finalData.progress = _this.progress
            _this.finalData.unanswered = _this.unanswered
            _this.finalData.wrongAnswers = _this.finalData.errors - _this.unanswered
            var endData = JSON.stringify(_this.finalData)
            window.top.postMessage(endData, "*")
        },
        loadScreencap(){
            var s = document.createElement("script")
            s.type = "text/javascript"
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"
            document.head.appendChild(s)

        },
        loadDataAndContinue(hashData){
            let hash = hashData
            if(hash){
                hash = window.atob(hash)
                hash = hash.split('/')
                /* Time */
                var time = parseInt(hash[0])
                /* Answers */

                let data = JSON.parse(hash[1])
                //console.log('CARGADO:',data)


                /* set data */
                for(d in data){
                    //NUMERICO
                    if(typeof data[d] == 'number'){
                        //console.log(d,data[d], typeof data[d], 'number')
                        if(data[d] >= 0){
                            this.r[d] = data[d]
                        } else {
                            this.r[d] = undefined
                        }
                    }
                    //STRING
                    else if(typeof data[d] == 'string' ){
                        //console.log(d,data[d], typeof data[d], 'string')
                        if(data[d].trim() !== ""){
                            this.r[d] = data[d]
                        } else { 
                            this.r[d] = ""
                        }
                    }
                    //ARRAY
                    else {
                        //console.log(d,data[d], typeof data[d], 'array')
                        if(data[d].length>0){
                            this.r[d] = data[d]
                        } else { 
                            this.r[d] = undefined
                        }
                    }
                }

                /* set time */
                this.currentTime = time
                /*RECORDAR PAGINA */
                this.$set(this, 'currentScene', parseInt(hash[2]) )

            }
        },
        hashScorreAndContinue (){
            var breakHash = window.location.hash.split('&')
            if(breakHash.length>1){
                for(bh in breakHash){
                    if(breakHash[bh].includes('#s')){
                        let setScore = breakHash[bh].replace('#s', '')
                        this.finalData.score = setScore
                    }
                    if(breakHash[bh].includes('#d')){
                        let setData = breakHash[bh].replace('#d', '')
                        this.loadDataAndContinue(setData)

                    }
                }
            } else {
                if(breakHash[0].includes('#s')){
                    let setScore = breakHash[0].replace('#s', '')
                    this.finalData.score = parseInt(setScore)
                }
                if(breakHash[0].includes('#d')){
                    let setData = breakHash[0].replace('#d', '')
                    this.loadDataAndContinue(setData)
                }
            }
        },
        storeScreencapture (clickedscene) {
            var _this = this
            let sceneNum = clickedscene ? clickedscene : _this.currentScene
            if(!this.started){
                return false
            }
            var node = document.body
            var node = document.getElementById('scene_'+sceneNum)
            domtoimage.toPng(node).then(function (dataUrl) {
                _this.screen[sceneNum] = null
                _this.screen[sceneNum] = dataUrl
            }).catch(function (error) { console.error(error) })
            
        }
    },
    mounted () {
        this.hashScorreAndContinue()
        /* Screen capture */
        this.loadScreencap()
        this.scenesby10 = Math.floor(this.scenes.length/10)

    },
    created () {
        this.automaticSeconds = this.scenes.length * 90
        if((this.automaticSeconds/60) % 1 != 0){
            this.automaticSeconds+=30
        }

        this.scenesby10 = Math.floor(this.scenes.length/10)
    }
})


