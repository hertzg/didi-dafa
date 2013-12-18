exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var უმი=''
    მოთხ.on('data', function(ნაწყვეტი){
        უმი+=ნაწყვეტი.toString()
    })
    მოთხ.on('end', function(){
        var ნაქნარი
        try{
            ნაქნარი=JSON.parse(უმი)
        }catch(e){
            console.log(e)
            ცუდი_პარამეტრები()
            return
        }
        
        // შემოწმება
        if(!ნაქნარი.ტიპი){
            ცუდი_პარამეტრები()
            return
        }
        if(ნაქნარი.ტიპი=='დავხატე'){
            if(!ნაქნარი.მონაცემები||
                !ნაქნარი.მონაცემები.გზა||
                !ნაქნარი.მონაცემები.ფერი||
                !ნაქნარი.მონაცემები.სისქე||
                !+ნაქნარი.მონაცემები.სისქე||
                მოდულები.ნაქნარები.ნახატი_სცდება_დაფის_საზღვრებს(ნაქნარი)){
            // შესამოწმებელია პარამეტრების სისწორე
                ცუდი_პარამეტრები()
                return
            }
        }else if(ნაქნარი.ტიპი=='სახელი შევიცვალე'){
            if(!ნაქნარი.მონაცემები){
                ცუდი_პარამეტრები()
                return
            }
        }else if(ნაქნარი.ტიპი=='წავნაცვლდი'){
            if(!ნაქნარი.მონაცემები||
                !ნაქნარი.მონაცემები.ხ||
                !+ნაქნარი.მონაცემები.ხ||
                !ნაქნარი.მონაცემები.ჯ||
                !+ნაქნარი.მონაცემები.ჯ||
                !ნაქნარი.მონაცემები.სიგანე||
                !+ნაქნარი.მონაცემები.სიგანე||
                !ნაქნარი.მონაცემები.სიმაღლე||
                !+ნაქნარი.მონაცემები.სიმაღლე||
                მოდულები.ნაქნარები.მდებარეობა_სცდება_დაფის_საზღვრებს(ნაქნარი)){
                ცუდი_პარამეტრები()
                return
            }
        }else if(ნაქნარი.ტიპი='ფერი შევიცვალე'){
            if(!ნაქნარი.მონაცემები){
                ცუდი_პარამეტრები()
                return
            }
        }else if(ნაქნარი.ტიპი='სიგანე შევიცვალე'){
            if(!ნაქნარი.მონაცემები||
                !+ნაქნარი.მონაცემები){
                ცუდი_პარამეტრები()
                return
            }
        }
        
        // საქმე
        var შეფუთული_ნაქნარი = მოდულები.ნაქნარები.დაამატე(მომხმარებელი, ნაქნარი)
        
        if(ნაქნარი.ტიპი=='დავხატე'){
            მოდულები.საცავი.მიახატე(შეფუთული_ნაქნარი.მონაცემები)
        }else if(ნაქნარი.ტიპი=='სახელი შევიცვალე'){
            მომხმარებელი.სახელი=""+შეფუთული_ნაქნარი.მონაცემები
        }else if(ნაქნარი.ტიპი=='წავნაცვლდი'){
            მომხმარებელი.შეცვალე_ხედვის_არე(
                +შეფუთული_ნაქნარი.მონაცემები.ხ,
                +შეფუთული_ნაქნარი.მონაცემები.ჯ,
                +შეფუთული_ნაქნარი.მონაცემები.სიგანე,
                +შეფუთული_ნაქნარი.მონაცემები.სიმაღლე)
        }else if(ნაქნარი.ტიპი='ფერი შევიცვალე'){
            მომხმარებელი.ფერი=შეფუთული_ნაქნარი.მონაცემები
        }else if(ნაქნარი.ტიპი='სიგანე შევიცვალე'){
            მომხმარებელი.სიგანე=+შეფუთული_ნაქნარი.მონაცემები
        }
        
        მოდულები.მომხმარებლები.მიეცი_მომლოდინეებს(შეფუთული_ნაქნარი)
        პასუხ.end()
    })
    
    function ცუდი_პარამეტრები(){
        console.log('ვქენი: ცუდი მოთხოვნა')
        პასუხ.statusCode=400;
        პასუხ.end('ცუდი მოთხოვნა');
    }
} 
