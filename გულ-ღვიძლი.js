window.onresize = function() {
    დაფა.დაალაგე()
}

var გლობალური_ხ = 0, გლობალური_ჯ = 0

function მითხარი_ხოლმე_რაც_მოხდება(ბოლო_ნაქნარის_დრო) {
    var მოთხოვნა = new XMLHttpRequest()

    function ახალი_მოთხოვნა() {
        მოთხოვნა.onreadystatechange = function() {
            if (მოთხოვნა.readyState == 4) {
                if (მოთხოვნა.status == 200) {
                    var ნაქნარები = JSON.parse(მოთხოვნა.response)
                    ბოლო_ნაქნარის_დრო = ნაქნარები[ნაქნარები.length - 1].დრო
                    ახალი_მოთხოვნა()
                    დაფა.ყველა_გადაახატე(ნაქნარები)
                }
            }
        }
        მოთხოვნა.open("GET", '/რა-მოხდა?როდიდან=' + ბოლო_ნაქნარის_დრო + '&r=' + Math.random(), true)
        მოთხოვნა.send()
    }

    ახალი_მოთხოვნა()
}

function გააგზავნე_ობიექტი(მისამართზე, ობიექტი) {
    var მოთხოვნა = new XMLHttpRequest()
    მოთხოვნა.open("POST", მისამართზე, true)
    მოთხოვნა.send(ობიექტი)
}

function გააგზავნე(მისამართზე, უკუძახილი) {
    var მოთხოვნა = new XMLHttpRequest()
    if (უკუძახილი) {
        მოთხოვნა.onreadystatechange = function() {
            if (მოთხოვნა.readyState == 4 && მოთხოვნა.status == 200) {
                უკუძახილი(მოთხოვნა.response)
            }
        }
    }
    მოთხოვნა.open("GET", მისამართზე, true)
    მოთხოვნა.send()
}

function თქვი_რომ_წავნაცვლდი() {
    გააგზავნე('/წავნაცვლდი?ხ=' + დაფა.გლობ_ხ + '&ჯ=' + დაფა.გლობ_ჯ +
            '&სიგანე=' + დაფა.ნახაზი.width + '&სიმაღლე=' + დაფა.ნახაზი.height)
}
var დაფა = function() {
    var that = {
        კანტი: {ხ: -50, ჯ: -50},
        წანაცვლების_ჯამი: {მარცხ_ხ: 0, მარჯვ_ხ:0, ზედა_ჯ:0, ქვედა_ჯ: 0},
        დაალაგე: function() {
            this.ნახაზი.width = window.innerWidth + this.კანტი.ხ * 2
            this.ნახაზი.height = window.innerHeight + this.კანტი.ჯ * 2
            console.log(this.ნახაზი.width, this.ნახაზი.height)
            this.გამოთვალე_კოორდინატები()
            this.განაახლე_ფრაგმენტი(0,0, this.ნახაზი.width, this.ნახაზი.height)
        },
        განაახლე_ფრაგმენტი: function(ხ, ჯ, სიგანე, სიმაღლე){
            var გლობ=დაფა.მომე_გლობალური_კოორდინატები(ხ, ჯ)
            var სურათი = document.createElement('img')
            სურათი.src = '/მომე-ფრაგმენტი?ხ=' + გლობ.ხ + '&ჯ=' + გლობ.ჯ + 
                    '&სიგანე=' + სიგანე + '&სიმაღლე=' + სიმაღლე
            
            სურათი.onload=function(გ_ხ, გ_ჯ, სიგ, სიმ){
                // თუ ჩამოტვირთვისას გადანაცვლება მოასწრო, 
                // უნდა შევავსოთ შესაბამისად
                return function(){
                    var ლოკ = დაფა.მომე_ლოკალური_კოორდინატები(გ_ხ, გ_ჯ)
                    დაფა.კონტ.drawImage(სურათი,0,0,სიგ, სიმ, 
                    ლოკ.ხ, 
                    ლოკ.ჯ,
                    სიგ, სიმ)
                }
            }(გლობ.ხ, გლობ.ჯ, სიგანე, სიმაღლე)
        },
        გამოთვალე_კოორდინატები: function() {
            this.გლობ_ხ = გლობალური_ხ - Math.floor(this.ნახაზი.width / 2),
                    this.გლობ_ჯ = გლობალური_ჯ - Math.floor(this.ნახაზი.height / 2)
        },
        წანაცვლდი: function(ხ_ცვლილება, ჯ_ცვლილება) {
            გლობალური_ხ += ხ_ცვლილება
            გლობალური_ჯ += ჯ_ცვლილება

            var სურათი = this.კონტ.getImageData(ხ_ცვლილება, ჯ_ცვლილება,
                    this.ნახაზი.width, this.ნახაზი.height)
            this.კონტ.putImageData(სურათი, 0, 0)

            this.გამოთვალე_კოორდინატები()

            // ცარიელი გვერდების შევსება
            this.წანაცვლების_ჯამი.მარცხ_ხ += ხ_ცვლილება
            this.წანაცვლების_ჯამი.მარჯვ_ხ += ხ_ცვლილება
            this.წანაცვლების_ჯამი.ზედა_ჯ += ჯ_ცვლილება
            this.წანაცვლების_ჯამი.ქვედა_ჯ += ჯ_ცვლილება
            
            if(this.წანაცვლების_ჯამი.მარცხ_ხ>0){
                this.წანაცვლების_ჯამი.მარცხ_ხ=0
            }
            if(this.წანაცვლების_ჯამი.მარჯვ_ხ<0){
                this.წანაცვლების_ჯამი.მარჯვ_ხ=0
            }
            
            if(this.წანაცვლების_ჯამი.ზედა_ჯ>0){
                this.წანაცვლების_ჯამი.ზედა_ჯ=0
            }
            if(this.წანაცვლების_ჯამი.ქვედა_ჯ<0){
                this.წანაცვლების_ჯამი.ქვედა_ჯ=0
            }
            
            // ხ-ები
            if (this.წანაცვლების_ჯამი.მარცხ_ხ < -100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
        
                სიგანე = Math.abs(this.წანაცვლების_ჯამი.მარცხ_ხ)
                სიმაღლე = this.ნახაზი.height
                ჯ = 0
                ხ=0
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.მარცხ_ხ=0
            }
            if (this.წანაცვლების_ჯამი.მარჯვ_ხ > 100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
        
                სიგანე = Math.abs(this.წანაცვლების_ჯამი.მარჯვ_ხ)
                სიმაღლე = this.ნახაზი.height
                ჯ = 0
                ხ=this.ნახაზი.width - this.წანაცვლების_ჯამი.მარჯვ_ხ
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.მარჯვ_ხ=0
            }
            
            // ჯ-ები
            if (this.წანაცვლების_ჯამი.ზედა_ჯ < -100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
        
                სიგანე = this.ნახაზი.width
                სიმაღლე = Math.abs(this.წანაცვლების_ჯამი.ზედა_ჯ)
                ხ = 0
                ჯ = 0
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.ზედა_ჯ=0
            }
            if (this.წანაცვლების_ჯამი.ქვედა_ჯ > 100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
                
                სიგანე = this.ნახაზი.width
                სიმაღლე = Math.abs(this.წანაცვლების_ჯამი.ქვედა_ჯ)
                ხ = 0
                ჯ = this.ნახაზი.height - this.წანაცვლების_ჯამი.ქვედა_ჯ
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.ქვედა_ჯ=0
            }
        },
        ყველა_გადაახატე: function(ნაქნარები) {
            for (var ნ in ნაქნარები) {
                this.გადაახატე(ნაქნარები[ნ])
            }
        },
        გადაახატე: function(ნაქნარი, ინდექსი) {
            if (!ინდექსი) {
                ინდექსი = 1
            }
            var ნაფეხური = ნაქნარი.გზა[ინდექსი],
                    წინა_ნაფეხური = ნაქნარი.გზა[ინდექსი - 1],
                    ლოკ1 = დაფა.მომე_ლოკალური_კოორდინატები(ნაფეხური.ხ, ნაფეხური.ჯ),
                    ლოკ2 = დაფა.მომე_ლოკალური_კოორდინატები(წინა_ნაფეხური.ხ, წინა_ნაფეხური.ჯ)

            this.გაუსვი_ხაზი(ლოკ1.ხ, ლოკ1.ჯ,ლოკ2.ხ, ლოკ2.ჯ)

            // ეს ნიშნავს ბოლო ჩანაწერს
            if (!ნაფეხური.დრო) {
                return
            }

            var that = this
            setTimeout(function() {
                that.გადაახატე(ნაქნარი, ++ინდექსი)
            }, ნაფეხური.დრო)
        },
        გააახლეკურსორი: function() {
            if (მიჭირავს === ხელი) {
                დაფა.ნახაზი.style.cursor = 'pointer'
            } else {
                დაფა.ნახაზი.style.cursor = 'auto'
            }
        },
        მომე_გლობალური_კოორდინატები: function(ლოკალური_ხ, ლოკალური_ჯ) {
            return {ხ: დაფა.გლობ_ხ + ლოკალური_ხ, ჯ: დაფა.გლობ_ჯ + ლოკალური_ჯ}
        },
        მომე_გლობალური_კოორდინატები_ეკრანიდან: function(ლოკალური_ხ, ლოკალური_ჯ) {
            return {ხ: დაფა.გლობ_ხ + დაფა.კანტი.ხ + ლოკალური_ხ, 
                ჯ: დაფა.გლობ_ჯ + დაფა.კანტი.ჯ + ლოკალური_ჯ}
        },
        მომე_ლოკალური_კოორდინატები:function(გლობალური_ხ, გლობალური_ჯ) {
            return {ხ: გლობალური_ხ - დაფა.გლობ_ხ, ჯ: გლობალური_ჯ - დაფა.გლობ_ჯ}
        },
        გაუსვი_ხაზი:function(ხ1,ჯ1,ხ2,ჯ2){
            this.კონტ.beginPath()
            this.კონტ.moveTo(ხ1, ჯ1)
            this.კონტ.lineTo(ხ2, ჯ2)
            this.კონტ.stroke()
        }
    }

    that.ნახაზი = document.getElementById('დაფა')
    that.კონტ = that.ნახაზი.getContext('2d')
    
    გააგზავნე("/რა-დროა", function(დრო){
        მითხარი_ხოლმე_რაც_მოხდება(+დრო)
    })

    that.ნახაზი.onmousedown = function(მოვლ) {
        if (მიჭირავს && მოვლ.button===0) {
            მიჭირავს.დაიწყე(მოვლ.clientX, მოვლ.clientY)
        }
    }
    that.ნახაზი.onmousemove = function(მოვლ) {
        if (მიჭირავს && მოვლ.button===0) {
            მიჭირავს.გაამოძრავე(მოვლ.clientX, მოვლ.clientY)
        }
    }
    that.ნახაზი.onmouseup = function(მოვლ) {
        if (მიჭირავს && მოვლ.button===0) {
            მიჭირავს.დაასრულე(მოვლ.clientX, მოვლ.clientY)
        }
    }
    that.ნახაზი.oncontextmenu = function() {
        მიჭირავს = მიჭირავს == ხელი ? ფუნჯი : ხელი
        that.გააახლეკურსორი();
        return false
    }

    return that
}()

დაფა.დაალაგე()
თქვი_რომ_წავნაცვლდი()

var ფუნჯი = {
    იხატება: false,
    გზას_მიუმატე: function(ხ, ჯ) {
        var გლობ = დაფა.მომე_გლობალური_კოორდინატები_ეკრანიდან(ხ, ჯ)
        this.გზა.push({ხ: გლობ.ხ, ჯ: გლობ.ჯ, 
            დრო: new Date().getTime()})
    },
    დაიწყე: function(ხ, ჯ) {
        this.იხატება = true

        this.გზა = []
        this.გზას_მიუმატე(ხ, ჯ)
    },
    გაამოძრავე: function(ხ, ჯ) {
        if (this.იხატება) {
            var წინა_გზა=this.გზა[this.გზა.length-1],
                წინა=დაფა.მომე_ლოკალური_კოორდინატები(წინა_გზა.ხ, წინა_გზა.ჯ)
            
            დაფა.გაუსვი_ხაზი(წინა.ხ, წინა.ჯ,
                დაფა.კანტი.ხ + ხ, დაფა.კანტი.ჯ + ჯ)

            this.გზას_მიუმატე(ხ, ჯ)
        }
    },
    დაასრულე: function(ხ, ჯ) {
        this.იხატება = false
        
        this.გზას_მიუმატე(ხ, ჯ)

        var გასაგზავნი_გზა = []
        for (var ი = 0; ი < this.გზა.length - 1; ი++) {
            var ესგზა = this.გზა[ი]
            var მერეგზა = this.გზა[ი + 1]
            გასაგზავნი_გზა.push({
                ხ: ესგზა.ხ,
                ჯ: ესგზა.ჯ,
                დრო: მერეგზა.დრო - ესგზა.დრო
            })
        }
        var გზისბოლო = this.გზა[this.გზა.length - 1]
        გასაგზავნი_გზა.push({
            ხ: გზისბოლო.ხ,
            ჯ: გზისბოლო.ჯ
        })
        გააგზავნე_ობიექტი('/ვქენი', JSON.stringify(გასაგზავნი_გზა))
    },
}

var ხელი = {
    გადამაქვს: false,
    დაიწყე: function(ხ, ჯ) {
        this.გადამაქვს = true
        this.წინა = {ხ: ხ, ჯ: ჯ}
    },
    გაამოძრავე: function(ხ, ჯ) {
        if (this.გადამაქვს) {
            var ხ_ცვლილება = this.წინა.ხ - ხ,
                    ჯ_ცვლილება = this.წინა.ჯ - ჯ 

            დაფა.წანაცვლდი(ხ_ცვლილება, ჯ_ცვლილება)

            this.წინა = {ხ: ხ, ჯ: ჯ}
        }
    },
    დაასრულე: function(ხ, ჯ) {
        this.გადამაქვს = false

        თქვი_რომ_წავნაცვლდი()
    },
}
var მიჭირავს = ფუნჯი
