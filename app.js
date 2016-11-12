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
// read data from firebase if it exists
// get values from inputs
// push data to firebase
$(document).on('ready', function() {
	$('#submit').on('click', function () {
		name = $('#inputName').val().trim();
		role = $('#inputRole').val().trim();
		startDate = $('#inputDate').val().trim();
		monthlyRate = $('#inputMonth').val().trim();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $('#inputName').val('');
    $('#inputRole').val('');
    $('#inputDate').val('');
    $('#inputMonth').val('');

    return false;
	});

  database.ref().on("child_added", function(childSnapshot) {
    var monthsWorked = moment().diff(moment(childSnapshot.val().startDate), "months");
    var monthlyRate = childSnapshot.val().monthlyRate;
    var totalBilled = monthsWorked * monthlyRate;

    var tableRow = $('<tr>');
    var nameCell = $('<td>').text(childSnapshot.val().name);
    var roleCell = $('<td>').text(childSnapshot.val().role);
    var startDateCell = $('<td>').text(childSnapshot.val().startDate);
    var monthsWorkedCell = $('<td>').text(monthsWorked + ' months');
    var monthlyRateCell = $('<td>').text('$' + monthlyRate);
    var totalBilledCell = $('<td>').text('$' + totalBilled);

    tableRow.append(nameCell).append(roleCell).append(startDateCell)
            .append(monthsWorkedCell).append(monthlyRateCell)
            .append(totalBilledCell);
    $('tbody').append(tableRow);
  });

  database.ref().orderByChild("startDate").limitToLast(1).on("child_added", function(snapshot) {
    $('#mostRecentName').text('Name: ' + snapshot.val().name);
    $('#mostRecentRole').text('Role: ' + snapshot.val().role);
    $('#mostRecentStartDate').text('Start date: ' + moment(snapshot.val().startDate).format("MMMM Do YYYY"));
    $('#mostRecentMonthlyRate').text('Montly rate: ' + snapshot.val().monthlyRate);
  });

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    $('#mostRecentInputName').text('Name: ' + snapshot.val().name);
    $('#mostRecentInputRole').text('Role: ' + snapshot.val().role);
    $('#mostRecentInputStartDate').text('Start date: ' + moment(snapshot.val().startDate).format("MMMM Do YYYY"));
    $('#mostRecentInputMonthlyRate').text('Montly rate: ' + snapshot.val().monthlyRate);
  });
});
// clear data from form fields
// update DOM with user data
