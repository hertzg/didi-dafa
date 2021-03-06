var ფერი = function(წითელი, მწვანე, ლურჯი) {
    if(!isFinite(წითელი)||
            !isFinite(მწვანე)||
            !isFinite(ლურჯი)){
        წითელი=მწვანე=ლურჯი=0
    }
    var ეგს = წმლ_ეგსსკენ(წითელი, მწვანე, ლურჯი)
    
    function წმლ_ეგსსკენ(წ, მ, ლ){
        წ /= 255, მ /= 255, ლ /= 255
        var მაქს = Math.max(წ, მ, ლ), მინ = Math.min(წ, მ, ლ)
        var ე, გ, ს = (მაქს + მინ) / 2

        if(მაქს == მინ){
            ე = გ = 0
        }else{
            var d = მაქს - მინ
            გ = ს > 0.5 ? d / (2 - მაქს - მინ) : d / (მაქს + მინ)
            switch(მაქს){
                case წ: ე = (მ - ლ) / d + (მ < ლ ? 6 : 0); break
                case მ: ე = (ლ - წ) / d + 2; break
                case ლ: ე = (წ - მ) / d + 4; break
            }
            ე /= 6;
        }

        return {ე:Math.floor(ე * 360), 
            გ:Math.floor(გ * 100), 
            ს:Math.floor(ს * 100)};
    }
    return {
        შეავსე_ტექსტურით: function(ფერი) {
            var წმლ_მთხვ = ფერი.match(/rgb\((\d*),(\d*),(\d*)\)/)
            if (წმლ_მთხვ) {
                this.წითელი=წმლ_მთხვ[1]
                this.მწვანე=წმლ_მთხვ[2]
                this.ლურჯი=წმლ_მთხვ[3]
                
                var ეგს = წმლ_ეგსსკენ(this.წითელი,
                    this.მწვანე,
                    this.ლურჯი)
                    
                this.ელფერი=ეგს.ე
                this.გაჟღენთა=ეგს.გ
                this.სინათლე=ეგს.ს
            }
            return this
        },
        შეავსე_ეგსით:function(ფერი){
            
        },
        ტექსტურისკენ: function() {
            return 'rgb(' + this.წითელი + ',' + 
                    this.მწვანე + ',' + 
                    this.ლურჯი + ')'
        },
        
        წითელი: წითელი,
        მწვანე:მწვანე,
        ლურჯი: ლურჯი,
        ელფერი:ეგს.ე,
        გაჟღენთა:ეგს.გ,
        სინათლე:ეგს.ს,
    }
}

