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
	var database = firebase.database()

database.ref().on("value", function(snapshot) {

	console.log(snapshot.val());
	console.log(snapshot.val().trainName);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().time);
	console.log(snapshot.val().frequency);

	var tableRow = $("<tr>")
	

	tableRow.attr("data-train", "train-" + trainNumber)
	tableRow.attr("id", "row-" + rowNumber)
	tableRow.addClass("trainRows")
	$("#main").append(tableRow)

	input = [snapshot.val().trainName, snapshot.val().destination, snapshot.val().time, snapshot.val().frequency, "blank"]


	for (var i = 0; i < 5; i++) {

	var tableData = $("<td>")

	tableData.text(input[i])
	$("#row-" + rowNumber).append(tableData)

}

trainNumber++
rowNumber++

$(document).on("click", ".trainRows", function(){

	var remove = confirm("Do you want to remove?")

	if(remove === true) {
	$(this).remove()
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

	database.ref().set({
		trainName: input[0],
		destination: input[1],
		time: input[2],
		frequency: input[3]
	});


if ($("#name").val() === "" || $("#destination").val() === "" || $("#time").val() === "" || $("#frequency").val() === ""){

	alert("Please fill out all required fields")
}

$("#name").val("")
$("#destination").val("")
$("#time").val("")
$("#frequency").val("")

	trainNumber++
	rowNumber++
		 
	});

});