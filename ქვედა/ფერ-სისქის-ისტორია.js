var ფერ_სისქის_ისტორია = function(ელემენტი, 
        საწყისი_ფერი, საწყისი_სისქე, უკუძახილი){
    var ელ = document.createElement('div'),
            ფერსისქეები=[],
            მონიშნული_ფერსისქე
    
    ელ.width=170
    ელ.height=20
    
    var ცალი_ფერსისქე=Math.floor(ელ.width/(20+2))
    
    ფერსისქეები.push({
            ფერი:საწყისი_ფერი,
            სისქე:საწყისი_სისქე,
            დაიხატა:false,
            დამალული:false,
            მონიშნული:false
        })
        
    for(var ი=1;ი<ცალი_ფერსისქე;ი++){
        ფერსისქეები.push({
            ფერი:'rgb(255,255,255)',
            სისქე:1,
            დაიხატა:false,
            დამალული:true,
            მონიშნული:false
        })
    }
    
    მონიშნული_ფერსისქე = ფერსისქეები
    ყველა_გადახატე()
    ელემენტი.appendChild(ელ)
    
    function ყველა_გადახატე(){
        while(ელ.firstChild){
            ელ.removeChild(ელ.firstChild)
        }
            
        for(var ფ in ფერსისქეები){
            var ფერი_ელ=document.createElement('div'),
                სისქე_ელ=document.createElement('div'),
                ფერსისქე=ფერსისქეები[ფ]
        
            ფერი_ელ.className='ფერსისქე_ფერი'
            if(ფერსისქე==მონიშნული_ფერსისქე){
                ფერი_ელ.className='ფერსისქე_ფერი ფერსისქე_მონიშნული'
            }
            if(ფერსისქე.დამალული){
                ფერი_ელ.className='ფერსისქე_ფერი დამალული'
            }
            ფერი_ელ.style.backgroundColor=ფერსისქე.ფერი
            ფერი_ელ.style.cursor = 'pointer'
            ფერი_ელ.addEventListener('click', (function(ფერსისქე){
                return function(){
                    მონიშნული_ფერსისქე=ფერსისქე
                    ყველა_გადახატე()
                    უკუძახილი(ფერსისქე.ფერი, ფერსისქე.სისქე)
                }
            })(ფერსისქე))
            
            // სტილი არაფრით ენიჭება
            var სისქე_კუთხე=Math.round(18/2-ფერსისქე.სისქე/2),
                    დამრგვალებული_სისქე=Math.round(ფერსისქე.სისქე)
            სისქე_ელ.className='ფერსისქე_სისქე'
            სისქე_ელ.style.left=(სისქე_კუთხე-1)+'px'
            სისქე_ელ.style.top=(სისქე_კუთხე-1)+'px'
            სისქე_ელ.style.width=დამრგვალებული_სისქე+'px'
            სისქე_ელ.style.height=დამრგვალებული_სისქე+'px'
            სისქე_ელ.style.borderRadius=Math.round(ფერსისქე.სისქე / 2)+'px'
            
            ფერი_ელ.appendChild(სისქე_ელ)
            ელ.appendChild(ფერი_ელ)
        }
    }
    
    return {
        შეიცვალა:function(ფერი, სისქე){
            
            var პირველი = ფერსისქეები[0]
            if(ფერსისქეები[0].დაიხატა){
                ფერსისქეები.pop()
                პირველი={
                    დაიხატა:false
                }
                ფერსისქეები.splice(0,0,პირველი)
            }
            
            პირველი.სისქე=სისქე
            პირველი.ფერი=ფერი
            მონიშნული_ფერსისქე=პირველი
            ყველა_გადახატე()
        },
        დაიხატა:function(){
            ფერსისქეები[0].დაიხატა=true
        }
    }
}

