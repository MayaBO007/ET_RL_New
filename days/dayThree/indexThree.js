

// move to main function
function timeline() {
    let startDayThree = async function () {
        let goThree = async function () {
            deleteFromSessionData();
            let doneTest1 = await start2tests(); // add promise and resolve
            if (doneTest1 == "done") {
                studySessionData.doneTest1 = 1;
                studySessionData.expDaysDate = updatedDates.fullDate;
                platform.saveSession(studySessionData, true)
                document.getElementById("endDayMsg").style.display = "inline";
                document.getElementById("endDayMsg").addEventListener("click", function () {
                    showWinnings()
                    setTimeout(() => {
                        moveToDay();
                    }, 7000)
                })
            }
        }
        goThree()
    }
    startDayThree()
}


// let getlastData = await getData();
// if (getlastData == "gotData") {
//     studySessionData = savedData[0][savedData[0].length - 1];
//     let updatedDates = updateDates();
