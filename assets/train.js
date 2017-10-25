$(document).ready(function() {

	var trainNumber = 0;
	var rowNumber = 0;
	var tableNumber = 0;


$("#submit").on("click", function() {

	var input = [$("#name").val().trim(), $("#destination").val().trim(), $("#time").val().trim(), $("#frequency").val().trim(), "blank"]
	var tableRow = $("<tr>")
	

	tableRow.attr("data-train", "train-" + trainNumber)
	tableRow.attr("id", "row-" + rowNumber)
	tableRow.addClass("trainRows")
	$("#main").append(tableRow)


if ($("#name").val() === "" || $("#destination").val() === "" || $("#time").val() === "" || $("#frequency").val() === ""){

	alert("Please fill out all required fields")
}

else {

	for (var i = 0; i < 5; i++) {

	var tableData = $("<td>")

	tableData.addClass("table-" + tableNumber)
	tableData.text(input[i])

	$("#row-" + rowNumber).append(tableData)

}

	trainNumber++
	rowNumber++


$("#name").val("")
$("#destination").val("")
$("#time").val("")
$("#frequency").val("")
		}
	});


$(document).on("click", ".trainRows", function(){

	var remove = confirm("Do you want to remove?")

	if(remove === true) {
	$(this).remove()
}

else {
	return false;
}

});


});