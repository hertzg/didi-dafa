exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    console.log(მოთხ.პარამები)
    var მომხდარი = მოდულები.ნაქნარები.მომე(მომხმარებელი, მოთხ.პარამები.როდიდან)
        
    if(მომხდარი){
        პასუხ.end(JSON.stringify(მომხდარი))
    }else{
        მომხმარებელი.ველოდები_მოვლენას(მოთხ)
    }
} 
