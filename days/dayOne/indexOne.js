
function timeline() {
    let goFirst = async function () {
        let doneDay1 = await trainingFirstDay();
        if (doneDay1 == "done") {
            studySessionData.isDayDone = "done";
            studySessionData.expDaysDate = updatedDates.fullDate;
            console.log(studySessionData);
            platform.saveSession(studySessionData, true);
            platform.getAllSessions().then((data) => {
                console.log(data);
                document.getElementById("endDayMsg").style.display = "inline";
                document.getElementById("endDayMsg").addEventListener("click", function () {
                    showWinnings()
                    let timeTillNextDay = moveToDay();
                    setTimeout(() => {
                        document.getElementById("fiveAM").style.display = "inline";
                    }, 10000)
                    setTimeout(() => {
                        platform.goToUrl("index.html");
                    }, timeTillNextDay)
                })

            })
        }

    }
    goFirst();
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

