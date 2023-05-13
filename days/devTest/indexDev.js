
const totalWins = {
    totalBlues: totalBlues,
    totalReds: totalReds
}

function timeline() {
    let startDayFour = async function () {
        platform.getAllSessions().then((data) => {
            getIndexSessionData(data).then((i) => {
                studySessionData = data[17];
                let updatedDates = updateDates();
                if (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("fiveAM").style.display = "inline";
                    } else {
                        document.getElementById("fiveAM_hor").style.display = "inline";
                    }
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFive());
                }
                else if (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {)
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        let goFour = async function () {
                            deleteFromSessionData();
                            document.getElementById("startButton").style.display = "inline";
                            document.getElementById("redButton").style.display = "inline";
                            document.getElementById("blueButton").style.display = "inline";
                            document.getElementById("gameScreen").style.display = "inline";
                            document.getElementById("startButton").onclick = function () {
                                let my_awesome_script = document.createElement('script');
                                my_awesome_script.setAttribute('src', '../../functions/orientation.js');
                                // my_awesome_script.src = "../functions/orientation.js";
                                document.body.appendChild(my_awesome_script);
                                document.getElementById("startButton").style.display = "none";
                                studySessionData.doneTest2 = "stratTest2";
                                platform.saveSession(studySessionData, true);
                                getMillisec();
                                let startIntervalTest = async function () {
                                    let startTrainning = await startInterval2Tests2();
                                    // button = randDevButton();
                                    if (startTrainning == "done3") {
                                        document.getElementById('startDevtestButtonBlue').style.display = "inline";
                                        document.getElementById("iframe-element").style.top = "1%"
                                        document.getElementById("iframe-element").src = "../../timer/timer.html";
                                        document.getElementById('iframe-element').classList.remove('hidden');
                                        document.getElementById("iframe-element").style.display = "inline";
                                        setTimeout(() => {
                                            document.getElementById('startDevtestButtonBlue').style.display = "none";
                                            document.getElementById("iframe-element").style.display = "none";
                                            let startDevaluation = async function () {
                                                let doneTest2 = await startDevTest(); // add promise and resolve
                                                if (doneTest2 == "doneTest2") {
                                                    studySessionData.doneTest2 = "doneTest2";
                                                    studySessionData.expDaysDate = updatedDates.fullDate;
                                                    platform.saveSession(studySessionData, true);
                                                    sumCorrectFirstPress().then(() => {
                                                        platform.saveSession(totalWins, true);
                                                        showWinnings();
                                                        setTimeout(() => {
                                                            hideWinnings();
                                                            document.getElementById("endOfGame").style.display = "inline";
                                                        }, 10000);
                                                    })
                                                }
                                            }
                                            startDevaluation();
                                        }, 16000);
                                    }
                                }
                                startIntervalTest();
                            }
                        }
                        goFour()
                    }
                } else {
                    document.getElementById("endOfGame").style.display = "inline";
                }
            });
        });
    }
    startDayFour();
}
