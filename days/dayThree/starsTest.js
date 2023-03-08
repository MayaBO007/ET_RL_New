
// const responsesSwitch = {
//     correctRedPressSwitch: correctRedPressSwitch,
//     correctBluePressSwitch: correctBluePressSwitch,
//     correctFirstRedPressSwitch: correctFirstRedPressSwitch,
//     correctFirstBluePressSwitch: correctFirstBluePressSwitch,
//     incorrectRedPressSwitch: incorrectRedPressSwitch,
//     incorrectBluePressSwitch: incorrectBluePressSwitch,
//     redChoiceSwitch: redChoiceSwitch,
//     blueChoiceSwitch: blueChoiceSwitch,
//     allRedPressesSwitch: allRedPressesSwitch,
//     allBluePressesSwitch: allBluePressesSwitch,
//     // allCorrectFirstPressSwitch: allCorrectFirstPressSwitch,
//     allChoicesSwitch: allChoicesSwitch
// };

// platform.saveSession(responsesSwitch, true);


saveResponsesSwitch = {};
timeoutCountSwitch = 0;

document.getElementById("redButton").addEventListener("click", function () {
    allRedPressesSwitch.push(new Date().getTime() - milliseconds);
});
document.getElementById("blueButton").addEventListener("click", function () {
    allBluePressesSwitch.push(new Date().getTime() - milliseconds);
});

let starsRandT = randTimeStars();
//let sessionIntervalSwitch = null;
let countSwitch = 0;
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
                let choseCar = randColorSwitch();
                let carSpeed = randSpeedCar();
                reset_airplane();
                buttonChoice = 0;
                if (countSwitch >= randCount) {
                    clearInterval(sessionIntervalStart);
                    setTimeout(sessionIntervalStart, 2000);
                    document.getElementById("airplane").style.display = "inline";
                    document.getElementById("airplane").style.animationPlayState = "running";
                    // platform.saveSession(responsesSwitch, false);
                    countSwitch = 0;
                } else {
                    countSwitch++;
                    if (choseCar >= 0.5) {
                        document.getElementById("redCar").style.display = "inline";
                        document.getElementById("redCar").style.animationPlayState = "running";
                        document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                        document.getElementById("redButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstRedPressSwitch.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPressSwitch.push(new Date().getTime() - milliseconds);
                            } else {
                                correctRedPressSwitch.push(new Date().getTime() - milliseconds);
                            }
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice - 1;
                            if (buttonChoice <= -1) {
                                incorrectBluePressSwitch.push(new Date().getTime() - milliseconds);
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
                                incorrectRedPressSwitch.push(new Date().getTime() - milliseconds);
                            };
                        };
                        document.getElementById("blueButton").onclick = function () {
                            buttonChoice = buttonChoice + 1;
                            if (buttonChoice == 1) {
                                correctFirstBluePressSwitch.push(new Date().getTime() - milliseconds);
                                // allCorrectFirstPressSwitch.push(new Date().getTime() - milliseconds);
                            } else {
                                correctBluePressSwitch.push(new Date().getTime() - milliseconds);
                            }

                        };

                        setTimeout(() => {
                            reset_blueCar();
                        }, carSpeed * 1000);
                    };

                };
            }, 1000);// (Maximal carSpeed)*1000

        let sessionTimerSwitch = setTimeout(function timeCountSwitch() {
            // document.getElementById("blueButton").style.display = "none";
            // document.getElementById("redButton").style.display = "none";
            clearInterval(sessionIntervalSwitch);
            clearTimeout(sessionTimerSwitch);
            // platform.saveSession(responsesSwitch, false);
            reset_airplane();
            reset_blueCar();
            reset_redCar();
            timeoutCountSwitch++
            if (timeoutCountSwitch == 1) {
                resolve("done2");
            } else {
                clearInterval(sessionIntervalSwitch);
                clearTimeout(sessionTimerSwitch);
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
