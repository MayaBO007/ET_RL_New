
function timeline() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            studySessionData = data[i];
            deleteFromSessionData();
            let updatedDates = updateDates();
            let todayDate = getTodayDate().slice(0, 2);
            if (Number(todayDate) === Number(dayDate()) && (studySessionData.isDayDone == "")) {
                updatedDates.yesterday = updatedDates.yesterdayMinusOne;
                updatedDates.yesterdayPlusOne = updatedDates.fullDate;
            }
            if (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {
                // document.addEventListener("DOMContentLoaded", function () {
                if (window.matchMedia("(orientation: landscape)").matches) {
                    document.getElementById("fiveAM").style.display = "inline";
                } else {
                    document.getElementById("fiveAM_hor").style.display = "inline";
                }

                // window.addEventListener("orientationchange", function () {
                //     if (window.matchMedia("(orientation: landscape)").matches) {
                //         document.getElementById("fiveAM").style.display = "inline";
                //     } else {
                //         document.getElementById("fiveAM_hor").style.display = "inline";
                //     }
                // });
                // });

                setTimeout(() => {
                    moveToDay();
                }, timeToFive());

            }

            else if (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) {
                if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                    document.getElementById("fiveAM").style.display = "inline";
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFiveSameDay());
                } else {
                    deleteFromSessionData();
                    let goTraining = async function () {
                        let isDayDone = await trainingDay();
                        if (isDayDone == "done") {
                            let updatedDates = updateDates();
                            studySessionData.isDayDone = "done";
                            studySessionData.expDaysDate = updatedDates.fullDate;
                            console.log(studySessionData);
                            platform.saveSession(studySessionData, true);
                            platform.getAllSessions().then((data) => {
                                console.log(data);
                                document.getElementById("endDayMsg").style.display = "inline";
                                document.getElementById("endDayMsg").addEventListener("click", function () {
                                    showWinnings()
                                    setTimeout(() => {
                                        if (window.matchMedia("(orientation: landscape)").matches) {
                                            hideWinnings();
                                            document.getElementById("fiveAM").style.display = "inline";
                                        } else {
                                            hideWinnings();
                                            document.getElementById("fiveAM_hor").style.display = "inline";
                                        }
                                    }, 10000)
                                    setTimeout(() => {
                                        moveToDay();
                                    }, timeToFive())
                                })

                            })
                        }

                    }
                    goTraining();
                }
            }
        })
    })
}


    // startDayOne function () {
    //  return new Promise(resolve => {

    //     let savedData = [];
    //     savedData = platform.getAllSessions();
    // let getlastData = await getData();
    // if (getlastData == "gotData") {
    // studySessionData = savedData[0][savedData[0].length - 1];
        // resolve("gotData");

//     startDayOne();

//     let updatedDates = updateDates();
//     let goFirst = async function () {
//         let doneDay1 = await trainingFirstDay();
//         if (doneDay1 == "doneDayOne") {
//             studySessionData.doneDay1 = "doneDayOne";
//             studySessionData.expDaysDate = updatedDates.fullDate;
//             platform.saveSession(responsesFirstData, false);
//             platform.saveSession(studySessionData, true);
//             document.getElementById("endDayMsg").style.display = "inline";
//             document.getElementById("endDayMsg").addEventListener("click", function () {
//                 showWinnings()
//                 setTimeout(() => {
//                     platform.goToUrl("days/dayTwo/dayTwo.html");
//                 }, 10000)
//             })
//         }
//     }
//     goFirst();
// };

