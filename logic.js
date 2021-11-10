const { isPlainObject, event } = require("jquery");

var globalObservations = [];
var row = 1;
function userLogsObservations() {
    var newObservation = {
        "date" : document.getElementById("dateInput").value,
        "mintemp" : document.getElementById("mintempInput").value,
        "maxtemp" : document.getElementById("conditionsInput").value
};
globalObservations.push(newObservation);
var displayLogTable = document.getElementById("displayLogTable");
var newRow = displayLogTable.insertRow(row);
var cellDate = newRow.insertCell(0);
var cellMinTemp = newRow.insertCell(1);
var cellMaxTemp = newRow.insertCell(2);
var cellConditions = newRow.insertCell(3);
cellDate.innerHTML = document.getElementById("dateInput").value;
cellMinTemp.innerHTML = document.getElementById("mintempInput").value;
cellMaxTemp.innerHTML = document.getElementById("maxtempInput").value;
cellConditions.innerHTML = document.getElementById("conditionsInput").value;
row ++;
}

function userDownloadsObservations() {
    download(
        "weather-observation-data.json",
        JSON.stringify({globalObservations}),
        null, '\t'
    );

}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('bref', 'data:text/plain;charset-utf-8,' + encodeURIComponent(text));
    element.setAttribute("download", filename)
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
// user uploading json file
window.onload = (event) => {
    console.log("page is fully loaded");
const realUploadFileButtom = document.getElementById("fileUploader");
const customUploadFileButton = document.getElementById("uploadFileButton");
customUploadFileButton.addEventListener("click", function() {
    realUploadFileButtom.click();
});
};
function bodyDidLoad() {
    console.log("hi0");
    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
        file0 = this.files[0];
        var myFileReader = new FileReader();
        myFileReader.onload = function(fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            fileDidFinishGettingRead(textFromFileLoaded);
        };
        myFileReader.readAsText(file0);
    }
}
function fileDidFinishGettingRead(textFromFileLoaded) {
    console.log("text" + textFromFileLoaded);
    newGlobalObservations = JSON.parse(textFromFileLoaded);
    console.log(newGlobalObservations);
    redrawTableFromList(newGlobalObservations);
}
function redrawTableFromList(newGlobalObservations) {
    $("bodyLogTable").html("");
    newGlobalObservations.globalObservations.forEach(element => fileLogsObservation(element));
}
row = 1;
function fileLogsObservation(element) {
    console.log(element);
    var date = element["date"];
    var mintemp = element["mintemp"];
    var maxtemp = element["maxtemp"];
    var conditions = element["conditions"];
    var displayLogTable = document.getElementById("displayLogTable");
    var newRow = displayLogTable.insertRow(row);
    var cellDate = newRow.insertCell(0);
    var cellMinTemp = newRow.insertCell(1);
    var cellMaxTemp = newRow.insertCell(2);
    var cellConditions = newRow.insertCell(3);
    cellDate.innerHTML = date;
    cellMinTemp.innerHTML = mintemp;
    cellMaxTemp.innerHTML = maxtemp;
    cellConditions.innerHTML = conditions;

    row++;
}
