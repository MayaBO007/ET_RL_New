
const responsesStar = {
    correctRedPressStar: correctRedPressStar,
    correctBluePressStar: correctBluePressStar,
    correctFirstRedPressStar: correctFirstRedPressStar,
    correctFirstBluePressStar: correctFirstBluePressStar,
    incorrectRedPressStar: incorrectRedPressStar,
    incorrectBluePressStar: incorrectBluePressStar,
    redChoiceStar: redChoiceStar,
    blueChoiceStar: blueChoiceStar,
    allRedPressesStar: allRedPressesStar,
    allBluePressesStar: allBluePressesStar,
    // allCorrectFirstPressStar: allCorrectFirstPressStar,
    allChoicesStar: allChoicesStar,
    allStars: allStars
};

platform.saveSession(responsesStar, true);


saveResponsesStar = {};
timeoutcountStar = 0;

document.getElementById("redButton").addEventListener("click", function () {
    allRedPressesStar.push(new Date().getTime() - milliseconds);
});
document.getElementById("blueButton").addEventListener("click", function () {
    allBluePressesStar.push(new Date().getTime() - milliseconds);
});

let starsRandT = randTimeStars();
//let sessionIntervalStar = null;
let countStar = 0;
// async function startIntervalStar() {
function startIntervalStar() {
    document.getElementById("startButton").style.display = "inline";
    document.getElementById("redButton").style.display = "inline";
    document.getElementById("blueButton").style.display = "inline";
    document.getElementById("gameScreen").style.display = "inline";
    document.getElementById("startButton").onclick = function () {
        document.getElementById("startButton").style.display = "none";
        let randCount = randCountAirplane();
        // return new Promise(resolve => {
        sessionIntervalStart = setInterval(
            function carMove() {
                let choseCar = randColorStar();
                let carSpeed = randSpeedCar();
                reset_airplane();
                buttonChoice = 0;
                if (countStar >= randCount) {
                    clearInterval(sessionIntervalStart);
                    setTimeout(sessionIntervalStart, 2000);
                    document.getElementById("airplane").style.display = "inline";
                    document.getElementById("airplane").style.animationPlayState = "running";
                    // platform.saveSession(responsesStar, false);
                    countStar = 0;
                } else {
                    countStar++;
                    if (choseCar >= 0.5) {
                        document.getElementById("redCar").style.display = "inline";
                        document.getElementById("redCar").style.animationPlayState = "running";
                        document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstRedPressStar.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPressStar.push(new Date().getTime() - milliseconds);
                            } else {
                                correctRedPressStar.push(new Date().getTime() - milliseconds);
                            }
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectBluePressStar.push(new Date().getTime() - milliseconds);
                            }
                        };

                        setTimeout(() => {
                            reset_redCar();
                        }, carSpeed * 1000);
                    } else {
                        document.getElementById("blueCar").style.display = "inline";
                        document.getElementById("blueCar").style.animationPlayState = "running";
                        document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectRedPressStar.push(new Date().getTime() - milliseconds);
                            };
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstBluePressStar.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPressStar.push(new Date().getTime() - milliseconds);
                            } else {
                                correctBluePressStar.push(new Date().getTime() - milliseconds);
                            }

                        };

                        setTimeout(() => {
                            reset_blueCar();
                        }, carSpeed * 1000);
                    };

                };
            }, 1000);// (Maximal carSpeed)*1000

        let sessionTimerStar = setTimeout(function timecountStar() {
            // document.getElementById("blueButton").style.display = "none";
            // document.getElementById("redButton").style.display = "none";
            clearInterval(sessionIntervalStar);
            clearTimeout(sessionTimerStar);
            // platform.saveSession(responsesStar, false);
            reset_airplane();
            reset_blueCar();
            reset_redCar();
            timeoutcountStar++
            if (timeoutcountStar == 1) {
                resolve("done2");
            } else {
                clearInterval(sessionIntervalStar);
                clearTimeout(sessionTimerStar);
                reset_airplane();
            }
        }, 90000);
        // }, 3000);

        function showStars() {
            starsRandT = randTimeStars();
            document.getElementById('star').style.top = randTopStars() + "%";
            document.getElementById('star').style.left = randLeftStars() + "%";
            document.getElementById('star').style.display = "inline";
            document.getElementById('star').style.animationPlayState = "running";

            setTimeout(() => {
                document.getElementById('star').style.display = "none";
                document.getElementById('star').style.animationPlayState = "paused";
            }, 1000);

            let repeat = setTimeout(() => {
                showStars()
            }, randTimeStars());
            setTimeout(() => {
                clearTimeout(repeat);
            }, 90000);
        };
        // });
        showStars();
    };

};
