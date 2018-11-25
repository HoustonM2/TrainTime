  
moment().format();

  var config = {
    apiKey: "AIzaSyAeBbBmp-IgqN6kGzwglETbURw9bcOLlgg",
    authDomain: "train-project-homework.firebaseapp.com",
    databaseURL: "https://train-project-homework.firebaseio.com",
    projectId: "train-project-homework",
    storageBucket: "train-project-homework.appspot.com",
    messagingSenderId: "278216688855"
  };

  firebase.initializeApp(config);

  var database =firebase.database();

  var name= "";
  var destination="";
  var firstTrain="";
  var min="";


  $("#submit").on("click", function(event) {
    
    event.preventDefault();

    
    name = $("#name").val().trim();
    destination= $("#destination").val().trim();
    firstTrain= $("#firstTrain").val().trim();
    min=$("#min").val().trim();

    
    database.ref().push({
     name:name,
     destination:destination,
     firstTrain:firstTrain,
     min:min,
      
    });


  });

    database.ref().on("child_added", function (snapshot){


  var trainName = snapshot.val().name;
  var trainDes = snapshot.val().destination;
  var tFirstTrain = snapshot.val().firstTrain;
  var trainMin = snapshot.val().min;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var highMoment = moment.max(moment(), trainTime);
  var trainMin;
  var arrival;

  if (highMoment === trainTime) {
    arrival = trainTime.format("hh:mm A");
    trainMin = trainTime.diff(moment(), "minutes");
  } else {

    var timediff = moment().diff(trainTime, "minutes");
    var trainRemainder = timediff % trainMin;
    trainMin = trainMin - trainRemainder;

    
    arrival = moment().add(trainMin, "m").format("hh:mm A");
  }
 
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" +
trainMin + "</td><td>" + arrival + "</td><td>" + trainMin + "</td></tr>");


  });

  
  
 