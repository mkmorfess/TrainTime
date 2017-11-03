$(document).ready(function() {

	 var config = {

	    apiKey: "AIzaSyB0rlK8J_ln0Vj3iv7ZcUY6O10D2l4ui-E",
	    authDomain: "traintime-a4768.firebaseapp.com",
	    databaseURL: "https://traintime-a4768.firebaseio.com",
	    projectId: "traintime-a4768",
	    storageBucket: "",
	    messagingSenderId: "925338888606"
  };

  firebase.initializeApp(config);

	var trainNumber = 0;
	var rowNumber = 0;
	var database = firebase.database();
	var dataFre = 0;
	var dataTime = 0;


database.ref().on("child_added", function(snapshot) {

	// console.log(snapshot.val());
	// console.log(snapshot.val().trainName);
	// console.log(snapshot.val().destination);
	// console.log(snapshot.val().time);
	// console.log(snapshot.val().frequency);

	var tableRow = $("<tr>")
	

	tableRow.attr("data-train", "train-" + trainNumber)
	tableRow.attr("id", "row-" + rowNumber)
	tableRow.addClass("trainRows")
	$("#main").append(tableRow)

	input = [snapshot.val().trainName, snapshot.val().destination, snapshot.val().time, snapshot.val().frequency, "blank"]


	for (var i = 0; i < 5; i++) {

	if (i === 2) {

		var tableData = $("<td>")

	tableData.attr("data-time-" + dataTime, input[i])
	tableData.text(input[i])
	$("#row-" + rowNumber).append(tableData)
	tableData.addClass("time-" + dataTime)


	}

	else if (i === 3) {

		var tableData = $("<td>")

	tableData.attr("data-frequency-" + dataFre, input[i])
	tableData.text(input[i])
	$("#row-" + rowNumber).append(tableData)
	tableData.addClass("frequent-" + dataFre)

	}

	else if (i === 4) {

		var tableData = $("<td>")

	tableData.text(input[i])
	$("#row-" + rowNumber).append(tableData)
	tableData.addClass("minutes-" + dataFre)

	}

	else {

	var tableData = $("<td>")

	tableData.text(input[i])
	$("#row-" + rowNumber).append(tableData)
}

}

	var tFrequency = $("td.frequent-" + dataFre).attr("data-frequency-" + dataFre)
	// console.log(tFrequency);
	var startTime = $("td.time-" + dataTime).attr("data-time-" + dataTime)
	// console.log(startTime);

	var firstTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("td.minutes-" + dataFre).html(tMinutesTillTrain)
    $("td.time-" + dataTime).html(moment(nextTrain).format("hh:mm"))


dataFre++
dataTime++
trainNumber++
rowNumber++

$(".trainRows").off().on("click", function(){

	var remove = confirm("Do you want to remove?")

	if(remove === true) {

		$(this).remove()

	database.ref().on("child_removed", function(key){

		ref().remove(key)


	});	
	
}

else {
	return false;
}

});
	

}, function(errorObject) {

      console.log("The read failed: " + errorObject.code);

    });




$("#submit").on("click", function() {

	var input = [$("#name").val().trim(), $("#destination").val().trim(), $("#time").val().trim(), $("#frequency").val().trim(), "blank"]

	

if ($("#name").val() === "" || $("#destination").val() === "" || $("#time").val() === "" || $("#frequency").val() === ""){

	alert("Please fill out all required fields")
}

else {

	database.ref().push({
		trainName: input[0],
		destination: input[1],
		time: input[2],
		frequency: input[3]
	});

	trainNumber++
	rowNumber++
}

$("#name").val("Train-")
$("#destination").val("")
$("#time").val("")
$("#frequency").val("")

	
		 
	});




});