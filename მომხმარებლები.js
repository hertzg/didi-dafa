var ნამცხვარი = require('./ნამცხვარი')
var სია = {}
exports.სია = სია

exports.მომე=function(მოთხ, პასუხ){
    var სესიის_იდ=ნამცხვარი.მომე(მოთხ, 'სესიის-იდ')
    var მომხმარებელი
    if(სესიის_იდ){
        მომხმარებელი=სია[სესიის_იდ]
    }
    if(!მომხმარებელი){
        var შემოსვლის_დრო=new Date().getTime()
        var სესიის_იდ=შემოსვლის_დრო

        მომხმარებელი={
            სესიის_იდ:სესიის_იდ,
            შემოსვლის_დრო:შემოსვლის_დრო,
            პასუხ:პასუხ,
        }
        
        სია[სესიის_იდ]=მომხმარებელი
        
        ნამცხვარი.მიე(პასუხ, 'სესიის-იდ', სესიის_იდ)
    }
    return მომხმარებელი
}

exports.შეცვალე_ხედვის_არე=function(ხ,ჯ,სიგანე,სიმაღლე){
    
}