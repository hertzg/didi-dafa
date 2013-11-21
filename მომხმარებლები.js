var ნამცხვარი = require('./ნამცხვარი')
var სია = {}
exports.სია = სია

exports.მომე = function(მოთხ, პასუხ) {
    var სესიის_იდ = ნამცხვარი.მომე(მოთხ, 'სესიის-იდ')
    var მომხმარებელი
    if (სესიის_იდ) {
        მომხმარებელი = სია[სესიის_იდ]
    }
    if (!მომხმარებელი) {
        var შემოსვლის_დრო = new Date().getTime()
        var სესიის_იდ = შემოსვლის_დრო

        მომხმარებელი = {
            სესიის_იდ: სესიის_იდ,
            შემოსვლის_დრო: შემოსვლის_დრო,
            შეცვალე_ხედვის_არე: function(ხ, ჯ, სიგანე, სიმაღლე) {
                this.ხედვის_არე = {ხ: ხ, ჯ: ჯ, სიგანე: სიგანე, სიმაღლე: სიმაღლე,
                    შუაწერტილი: {
                        ხ: ხ + Math.floor(სიგანე / 2),
                        ჯ: ჯ + Math.floor(სიმაღლე / 2),
                    }
                }

                console.log(this.ხედვის_არე.შუაწერტილი)
            },
            ველოდები_მოვლენას: function(პასუხ) {
                this.მოლოდინის_პასუხ = პასუხ
            }
        }

        სია[სესიის_იდ] = მომხმარებელი

        ნამცხვარი.მიე(პასუხ, 'სესიის-იდ', სესიის_იდ)
    }
    return მომხმარებელი
}

exports.მიეცი_მომლოდინეებს = function(ნაქნარი, მოდულები) {
    for (var მომხმარებელი in სია){
        if (მომხმარებელი.მოლოდინის_პასუხ) {
            if (მოდულები.ნაქნარები.კვეთს_ხედვის_არეს(
                    ნაქნარი, მომხმარებელი.ხედვის_არე)) {
                მომხმარებელი.მოლოდინის_პასუხ.end(ნაქნარი)
                delete მომხმარებელი.მოლოდინის_პასუხ
            }
        }
    }
}