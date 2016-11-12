// Initialize Firebase
var config = {
    apiKey: "AIzaSyCntfMzucYsODh3wgxLryNZ_zArQAG1WUM",
    authDomain: "employeedata-36e36.firebaseapp.com",
    databaseURL: "https://employeedata-36e36.firebaseio.com",
    storageBucket: "employeedata-36e36.appspot.com",
    messagingSenderId: "406481332206"
};
firebase.initializeApp(config);
// get reference to database
var database = firebase.database();
// initialize variables
var name = "";
var role = "";
var startDate = "";
var monthlyRate = 0;
// wait for document ready
$(document).on('ready', function() {
  // listen for click of submit button
	$('#submit').on('click', function () {
    // get name value from input
		name = $('#inputName').val().trim();
    // get role value from input
		role = $('#inputRole').val().trim();
    // get start date from input
		startDate = $('#inputDate').val().trim();
    // get month rate from input
		monthlyRate = $('#inputMonth').val().trim();

    // push data to firebase
    // push "appends" this data in the database instead of overwriting
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // clear all inputs
    $('#inputName').val('');
    $('#inputRole').val('');
    $('#inputDate').val('');
    $('#inputMonth').val('');

    // return false so the page does not refresh
    return false;
	});

  // listen for child to be added to the firebase database
  database.ref().on("child_added", function(childSnapshot) {
    // get difference of start date form today
    var monthsWorked = moment().diff(moment(childSnapshot.val().startDate), "months");
    // set monthly rate value to variable
    var monthlyRate = childSnapshot.val().monthlyRate;
    // calculate total billed
    var totalBilled = monthsWorked * monthlyRate;

    // add table row to put data in
    var tableRow = $('<tr>');
    // add cell for name
    var nameCell = $('<td>').text(childSnapshot.val().name);
    // add cell for role
    var roleCell = $('<td>').text(childSnapshot.val().role);
    // add cell for start date
    var startDateCell = $('<td>').text(childSnapshot.val().startDate);
    // add cell for months worked
    var monthsWorkedCell = $('<td>').text(monthsWorked + ' months');
    // add cell for monthly rate
    var monthlyRateCell = $('<td>').text('$' + monthlyRate);
    // add cell for total billed
    var totalBilledCell = $('<td>').text('$' + totalBilled);

    // append cells to table row
    tableRow.append(nameCell).append(roleCell).append(startDateCell)
            .append(monthsWorkedCell).append(monthlyRateCell)
            .append(totalBilledCell);
    // append table row to table body
    $('tbody').append(tableRow);
  });

  // order data by start date and get the last one
  database.ref().orderByChild("startDate").limitToLast(1).on("child_added", function(snapshot) {
    // set text of most recent name element
    $('#mostRecentName').text('Name: ' + snapshot.val().name);
    // set text of most recent role element
    $('#mostRecentRole').text('Role: ' + snapshot.val().role);
    // set text of most recent start date element
    $('#mostRecentStartDate').text('Start date: ' + moment(snapshot.val().startDate).format("MMMM Do YYYY"));
    // set text of most recent monthly element
    $('#mostRecentMonthlyRate').text('Montly rate: ' + snapshot.val().monthlyRate);
  });

  // order data by date added and get the last one
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // set text of most recent input name element
    $('#mostRecentInputName').text('Name: ' + snapshot.val().name);
    // set text of most recent input role element
    $('#mostRecentInputRole').text('Role: ' + snapshot.val().role);
    // set text of most recent input start date element
    $('#mostRecentInputStartDate').text('Start date: ' + moment(snapshot.val().startDate).format("MMMM Do YYYY"));
    // set text of most recent input monthly rate element
    $('#mostRecentInputMonthlyRate').text('Montly rate: ' + snapshot.val().monthlyRate);
  });
});
