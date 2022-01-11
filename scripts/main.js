var mainaudio = new Audio('audios/main.mp3');
var callaudio = new Audio('audios/call.mp3');
var audaudio = new Audio('audios/aud.mp3');
var fiftyaudio = new Audio('audios/fifty.mp3');
var loseaudio = new Audio('audios/lose.mp3');
var winaudio = new Audio('audios/win.mp3');
var finalaudio = new Audio('audios/final.mp3');

let stageLen = 1,
    taken = [],
    c = 2,
    gameLength = $(".stages button").length,
    pLen = gameLength,
    amount = $(".stages button").eq(pLen - 1).html(),
    audience = true,
    call_a_friend = true,
    fifty_fifty = true,
    play = true,
    selected,
    answer

let millionaire = {
    random: function () {
        var rand = Math.floor(Math.random() * 7)
        try {
            while (taken.toString().match(rand)) {
                rand = Math.floor(Math.random() * 7);
            }
            taken.push(rand);
            return rand;
        }
        catch (e) { }
    },


    selectQuestion: function () {
        var span, rand
        rand = this.random()

        if (stageLen < 6) {
            $('.question').html(stages.stage1.data[rand]["question"])
            stages.stage1.data[rand]["options"].map((option, i) => {
                span = `<span class="${option.slice(0, 1)} opt" key="${i}">${option}</span>`
                $(".options").append(span)
            })

            $(".opt").click((e) => {
                selected = e.target.textContent.slice(0, 1)
                $(".modal").fadeIn(300);
                $(".warning").fadeIn(300)
            })

            answer = stages.stage1.data[rand]["ans"]
        }
        else if (stageLen < 12) {
            $('.question').html(stages.stage2.data[rand]["question"])
            stages.stage2.data[rand]["options"].map((option, i) => {
                span = `<span class="${option.slice(0, 1)} opt" key="${i}">${option}</span>`
                $(".options").append(span)
            })

            $(".opt").click((e) => {
                selected = e.target.textContent.slice(0, 1)
                $(".modal").fadeIn(300);
                $(".warning").fadeIn(300)
            })

            answer = stages.stage2.data[rand]["ans"]
        }
        else {
            $('.question').html(stages.stage3.data[rand]["question"])
            stages.stage3.data[rand]["options"].map((option, i) => {
                span = `<span class="${option.slice(0, 1)} opt" key="${i}">${option}</span>`
                $(".options").append(span)
            })

            $(".opt").click((e) => {
                selected = e.target.textContent.slice(0, 1)
                $(".modal").fadeIn(300);
                $(".warning").fadeIn(300)
            })

            answer = stages.stage3.data[rand]["ans"]
        }
    },


    start: function () {
        $('.welcome').fadeOut(500, function () {
            $('#game').fadeIn(500)
        });
        this.selectQuestion()
    },


    won: function () {
        if (stageLen < 15) {
            mainaudio.pause();
            winaudio.play();
            setTimeout(function () { mainaudio.play() }, 9000);

            stageLen++
            taken = (stageLen % 6 == 0) || (stageLen % 11 == 0) ? [] : taken;
            amount = $(".stages button").eq(pLen - 1).html();

            $('.right-wrapper').fadeIn(800);
            setTimeout(function () { $('#right').html("This is the correct answer!") }, 500)
            setTimeout(function () { $('#right').html("Congratulations, you won " + amount) }, 1800)
            setTimeout(function () { $('#right').html("Get ready for the next question!") }, 3800)
            setTimeout(function () {
                $('.right-wrapper').fadeOut(800, function () {
                    $('#right').html("")
                    $(".modal").fadeOut()
                })
            }, 4500)

            pLen--;
            $(".current").removeClass("current");
            $(".stages button").eq(pLen - 1).addClass("current");
            $(".score").html("Score: " + amount)
            gameLength++;

            setTimeout(() => {
                this.selectQuestion()
            }, 4500)
        }
        else {
            mainaudio.pause();
            finalaudio.play();

            $('.right-wrapper').fadeIn(800);
            setTimeout(function () { $('#right').html("This is the correct answer!") }, 500)
            setTimeout(function () { $('#right').html("Congratulations, you've become a millionaire! <br><br><img src='images/final.png' class='finalimage'>") }, 1800)
            setTimeout(() => {
                $('.right-wrapper').fadeOut(800, () => {
                    $('#right').html("")
                    this.reset()
                })
            }, 22300)
        }
    },


    loose: function () {
        mainaudio.pause();
        loseaudio.play();

        $('.wrong-wrapper').fadeIn(800);

        setTimeout(
            function () { $('#wrong').html(`The answer is incorrect.<br>Source: ${amount}`) }
            , 100)

        setTimeout(
            function () {
                $('.wrong-wrapper').fadeOut(function () {
                    $('#wrong').html("")
                    $(".modal").fadeOut(800)
                })
            }
            , 1500)

        setTimeout(() => { this.reset() }, 2500)
        setTimeout(function () { location.reload() }, 2500);
    },


    fifty: function () {
        fiftyaudio.play();

        var options = ["D", "A", "C", "B"]
        var removedOptions = []
        $(".fifty").attr({ "src": "images/fifty2.png" }).css("cursor", "default")
        $(".fifty:hover").css("background-color", "rgb(17, 17, 138)")
        fifty_fifty = false

        for (var i = 0; i < options.length; i++) {
            if (options[i] != answer) {
                if (removedOptions.length < 2) {
                    removedOptions.push(options[i])
                    for (var i = 0; i < removedOptions.length; i++) {
                        $(`span.${removedOptions[i]}`).html(`${removedOptions[i]}:`)
                    }
                }
            }
        }
    },


    call: function () {
        mainaudio.pause();
        callaudio.play();

        let randFriend = Math.floor(Math.random() * 7);
        let randResp = Math.floor(Math.random() * 4)
        let friend = ["James", "Robert", "John", "Michael", "William", "David", "Richard"]
        let sure = ["100%", "80%", "60%", "50%", "30%"]
        let resp = ["Maybe", "I think"]

        $(".call").attr({ "src": "images/call2.png" }).css("cursor", "default")
        $(".call:hover").css("background-color", "rgb(17, 17, 138)")
        $(".warning").hide()
        $(".modal").fadeIn()
        $('.chat-wrapper').fadeIn(500);

        setTimeout(() => {
            $('#chat').html("Call... ☎")
        }, 100)

        setTimeout(() => {
            $('#chat').html("Hello ✔")
        }, 2000)

        setTimeout(
            function () {
                $('#chat').html(`Hi ${friend[randFriend]} <br>Please listen to the question<br>${$('.question').html()}`)
            }
            , 3800)

        setTimeout(
            function () {
                $('#chat').html(`${friend[randFriend]}: Wait until I remember...`)
            }
            , 8000)

        setTimeout(
            function () {
                $('#chat').html(`${friend[randFriend]}: ${resp[randResp]} ${answer}.`)
            }
            , 10000)

        setTimeout(
            function () {
                $('#chat').html("Are you sure?")
            }
            , 13000)

        setTimeout(
            function () {
                $('#chat').html(`${friend[randFriend]}: ${sure[randResp]} I think yes`)
            }
            , 16000)

        setTimeout(
            function () {
                $('.chat-wrapper').fadeOut(800, function () {
                    $('#chat').html("")
                    $(".modal").fadeOut()
                    call_a_friend = false
                });

                callaudio.pause();
                mainaudio.play();
            }, 18000)
    },


    audience: function () {
        mainaudio.pause();
        audaudio.play();

        $(".aud").attr({ "src": "images/aud2.png" }).css("cursor", "default")
        $(".aud:hover").css("background-color", "rgb(17, 17, 138)")
        $(".warning").hide()
        $(".modal").fadeIn()
        $(".chat-wrapper").fadeIn(500)

        setTimeout(function () {
            $('#chat').html("Ask the audience...")
        }, 100)

        setTimeout(function () {
            $('#chat').html("Thinking...")
        }, 1200)

        setTimeout(function () {
            $(".chat-wrapper").fadeOut()
            $('#chat').html("")
            $('.audience-wrapper').fadeIn()
            audience = false
        }, 4000)

        var options = ["D", "A", "C", "B"]
        var audiencePercentage = ["15", "32", "48", "54", "60"]

        for (var i = 0; i < options.length; i++) {
            if (options[i] != answer) {
                $(`.bar-${options[i]}`).css("width", `${audiencePercentage[i]}%`)
            } else {
                var highestPercentage = Number(audiencePercentage[4]) +
                    Math.floor(Math.random() * (23 - 10)) + 10
                $(`.bar-${answer}`).css("width", `${highestPercentage}%`)
            }
        }

        $(".closeBtn").click(function () {
            $(".audience-wrapper").fadeOut()
            $(".modal").fadeOut()

            audaudio.pause();
            mainaudio.play();
        })
    },


    reset: function () {
        $(".modal").fadeOut()
        $("#game").fadeOut()

        setTimeout(
            function () { $(".welcome").fadeIn(600) }
            , 1000)

        call_a_friend = true, audience = true, fifty_fifty = true
        window.stageLen = 1;
        taken = [];
        c = 2

        gameLength = $(".stages button").length
        pLen = gameLength
        amount = $(".stages button").eq(pLen - 1).html();

        $("img:hover").css("background-color", "rgb(250, 121, 0) !important")
        $(".fifty").attr({ "src": "images/fifty.png", "onClick": "game.fifty()" }).css("cursor", "pointer")
        $(".call_a_friend").attr({ "src": "images/call.png", "onClick": "game.call_a_friend()" }).css("cursor", "pointer")
    }
}


$(".no").click(function () {
    $(".modal").fadeOut()
});

$(".yes").click(function () {
    $('.warning').fadeOut(500,
        function () {
            (selected == answer) ? millionaire.won() : millionaire.loose()
        }
    )
})

$(".about-btn").click(function () {
    $('.about').fadeIn(1000);
})

$(".fifty").click(function () {
    if (fifty_fifty)
        millionaire.fifty()
})

$(".call").click(function () {
    if (call_a_friend)
        millionaire.call()
})

$(".aud").click(function () {
    if (audience)
        millionaire.audience()
})

$("body").ready(function () {
    millionaire.start();
})

$("#game-panel").click(function () {
    mainaudio.play();
    mainaudio.loop = true;
})