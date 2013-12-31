

exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var საწყისი_ენა='ქართული-საქართველო'
    
    function თარგ(გასაღები){
        return მოდულები.თარგმანი.მომე_მნიშვნელობა(საწყისი_ენა, გასაღები)
    }
    var ზტაე = '<!DOCTYPE html>'+
        '<html>'+
            '<head>'+
                '<link rel="stylesheet" href="/სახე.css">'+
                '<title data-თარგმანი="დიდი დაფა - საერთო სახატავი ბევრი ადამიანისთვის">'+ თარგ('დიდი დაფა - საერთო სახატავი ბევრი ადამიანისთვის')+'</title>'+
            '</head>'+
            '<body>'+
                '<div id="მთავარი_ნაჭერი">'+
                '<canvas id="დაფა"">'+
                '</canvas>'+
                '<div id="ლაბი" class="დამალული"></div>'+
                '<div id="სახარახურე" class="სახარახურე">'+
                '<div id="სხვა_დანარჩენი_შიგთავსი" class="დამალული">'+
                '<h3 data-თარგმანი="სხვა დანარჩენი">'+ თარგ('სხვა დანარჩენი')+'</h3>'+
                    '<p data-თარგმანი="სხვა დანარჩენი დახასიათება">'+ თარგ('სხვა დანარჩენი დახასიათება')+'</p>'+
                    '<div class="სათაური" data-თარგმანი="კონფიდენციალობის პოლიტიკა">'+ თარგ('კონფიდენციალობის პოლიტიკა')+'</div>'+
                    '<p data-თარგმანი="სხვა დანარჩენი კონფიდენციალობის პოლიტიკა">'+ თარგ('სხვა დანარჩენი კონფიდენციალობის პოლიტიკა')+'</p>'+
                    '<div class="სათაური" data-თარგმანი="პასუხისმგებლობა">'+ თარგ('პასუხისმგებლობა')+'</div>'+
                    '<p data-თარგმანი="სხვა დანარჩენი პასუხისმგებლობა">'+ თარგ('სხვა დანარჩენი პასუხისმგებლობა')+'</p>'+
                    '<div class="სათაური" data-თარგმანი="მადლობა">'+ თარგ('მადლობა')+'</div>'+
                    '<p data-თარგმანი="სხვა დანარჩენი მადლობა">'+ თარგ('სხვა დანარჩენი მადლობა')+'</p>'+
                    '<div class="სათაური" data-თარგმანი="ბმულები">'+ თარგ('ბმულები')+'</div>'+
                    '<p><a href="https://bitbucket.org/rimnadze/didi-dafa/"><span data-თარგმანი="დიდი დაფა პროექტის ქსელ-გვერდი">'+ თარგ('დიდი დაფა პროექტის ქსელ-გვერდი')+'</span></a><br/>'+
                    '<a href="https://gnu.org/licenses/gpl.html"><span data-თარგმანი="გნუს ზოგადი საჯარო ლიცენზია">'+ თარგ('გნუს ზოგადი საჯარო ლიცენზია')+'</span></a></p>'+
                '</div>'+
                '<div id="სახარახურე_შიგთავსი">'+
                    '<div>'+
                        '<img alt="ლოგო" src="/სურათები/ლოგო.png"><br/>'+
                        '<h2>'+
                        '<span data-თარგმანი="დიდი დაფა">'+
                        თარგ('დიდი დაფა')+
                        '</span>'+
                        '</h2>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<select id="ენა">'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div class="ღრეჭო">'+
                        '<span data-თარგმანი="სახელი">'+
                        თარგ('სახელი')+
                        '</span>'+
                        '<input type="text" id="სახელი"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div id="ფერის_ასარჩევი" class="ღრეჭო">'+
                    '</div>'+
                    '<div id="სისქის_ასარჩევი" class="ღრეჭო">'+
                    '</div>'+
                    '<hr/>'+
                    '<div data-თარგმანი="სხვები" class="ღრეჭო">'+
                        თარგ('სვები')+
                    '</div>'+
                    '<div id="მომხმარებლები" class="ღრეჭო">'+
                    '</div>'+
                    '<hr/>'+
                    '<div class="ღრეჭო">'+
                        '<span data-თარგმანი="ინსტრუქციები">'+
                        თარგ('ინსტრუქციები')+
                        '</span>'+
                        '<div class="ტექსტი_სახარახურეში ღრეჭო" data-თარგმანი="ინსტრუქციების ტანი">'+
                        თარგ('ინსტრუქციების ტანი')+
                        '</div>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<input id="უკუკავშირი" type="submit" data-თარგმანი="უკუკავშირი" value="'+თარგ('უკუკავში')+'" class="სავსე"/>'+
                        '<input id="სხვა_დანარჩენი" type="submit" data-თარგმანი="სხვა დანარჩენი" value="'+თარგ('სხვა დანარჩენი')+'" class="სავსე"/>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<script type="text/javascript" src="/საცხობი.js"></script>'+
                '<script type="text/javascript" src="/ფერის-ასარჩევი.js"></script>'+
                '<script type="text/javascript" src="/სისქის-ასარჩევი.js"></script>'+
                '<script type="text/javascript" src="/გულ-ღვიძლი.js"></script>'+
                '<script type="text/javascript" src="/სახარახურე.js"></script>'+
            '</body>'+
        '</html>'
    პასუხ.end(ზტაე)
}
