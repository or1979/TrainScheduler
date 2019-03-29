var config = {
    apiKey: "AIzaSyCmA0c2IaFWhLFeaqexJt7QKYEAjSKMhH0",
    authDomain: "train-2d536.firebaseapp.com",
    databaseURL: "https://train-2d536.firebaseio.com",
    projectId: "train-2d536",
    storageBucket: "train-2d536.appspot.com",
    messagingSenderId: "497002567555"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#trainSubmit").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var destination = $("#location-input").val().trim();
    var firstTrain = $("#start-input").val().trim();
    var frequency = $("#arrival-input").val().trim();


    var newTrain = {
        train: trainName,
        destination: destination,
        fTrain: firstTrain,
        frequency: frequency,

    };

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.fTrain);
    console.log(newTrain.frequency);

    $("#train-name-input").val().trim();
    $("#location-input").val().trim();
    $("#start-input").val().trim();
    $("#arrival-input").val().trim();
});

database.ref().on("child_added", function (childSnapShot) {

    var trainName = childSnapShot.val().train;
    var destination = childSnapShot.val().destination;
    var firstTrain = childSnapShot.val().fTrain;
    var frequency = childSnapShot.val().frequency;

    var startTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log(diffTime);

    var timeRemainder = diffTime % frequency;

    var minutesTilTrain = frequency - timeRemainder;

    var nextTrain = moment().add(minutesTilTrain, "minutes");
    console.log(nextTrain);

    var arrivalTrain = moment(nextTrain).format("HH:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arrivalTrain),
        $("<td>").text(minutesTilTrain),
    );

    $("#train-table > tbody").append(newRow);

});