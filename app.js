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
	console.log("YO");
	$('#submit').on('click', function () {
		console.log('HELLO');
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
	    return false;
	});
});
// clear data from form fields
// update DOM with user data