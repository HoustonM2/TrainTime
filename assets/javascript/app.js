  
//moment().format();

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

      console.log(snapshot.val)
      firstTrainTime = snapshot.val().firstTrain
      frequency = snapshot.val().min
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(moment(firstTrainTime))
      //console.log(snapshot.val().firstTrain);
      //console.log(snapshot.val().min);
  


  });

  console.log("this should say the time " +moment().add(7, 'hours'));

var timestring1 = "2013-05-09T00:00:00Z";
var timestring2 = "2013-05-09T02:00:00Z";
var startdate = moment(timestring1);
var expected_enddate = moment(timestring2);
var returned_endate = moment(startdate).add(2, 'hours'); 

console.log(expected_enddate)// see the cloning?
returned_endate.isSame(expected_enddate)  // true
