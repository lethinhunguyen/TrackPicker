var endpointRepository = "http://eventmedia.eurecom.fr/sparql";
var endpointRepository1 = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";

//-----Variable to check the rule of Eurecom-----
var allCredits = 90;
var technicalCredits = 60;
var mandatoryCredits = 25;
var optionalCredits = 18;
var nonTechnicalCredits = 12;
var languageCredits = 6;
var projectCredits = 10;
var generalCourseTypeNumber = 3;


//-----Variable to store the amount of credits that user chose
var creditCount = languageCredits + projectCredits;//0;
var creditFall1Count = languageCredits/3;//0;
var creditSpringCount = languageCredits/3;//0;
var creditFall2Count = languageCredits/3 + projectCredits;//0;


//-----Variable to store information of each course (name, semester, description, teacher name, teacher department)-----
var courseInformationArray = new Array();
//-----Variable to store information about type of course (mandatory, optional or free) and the amount of credits of each course depend on each track-----
var courseTrackArray = new Array();
//-----Variable to store the list of course that the user choose-----
var courseChose = new Array();
//-----Variable to mark each course is chosen in which semester
var courseChoseSemester = new Array();

var courseTechnicalFallArray = new Array();

//-----Variable to check state of page load-----
var techniqueList = false;
var nonTechniqueList = false;
var courseInformationLoad = false;
var courseTrackArrayLoad = false;

//----Variable to mark which semester the user are choosing courses
var fall1Mark = false;
var springMark = false;
var fall2Mark = false;

//-----Variable to mark if the edit choice page is selected----
var editChoiceMark = false;

//-----Flag to check the choice satisfy the rule of Eurecom
var ruleFlag = false;

//-----Variable to count the credits that user choose-----
var technicalChoosing = 0;
var nonTechnicalChoosing = 0;
var totalChoosing = 0;

var technicalLack = 0;
var nonTechnicalLack = 0;
var totalLack = 0;

//-----Flag to check the choice satisfy the rule of Eurecom according to track
var ruleTrackFlag = 0;
 
//-----Variable to count credits that user choose according to track
var mandatoryChoosing = 0;
var optionalChoosing = 0;
var freeChoosing =0;

var mandatoryLack = 0;
var optionalLack = 0;
var freeLack = 0;

//-----Variable to store color of each department -----
var multimediaColor = "blue";//"#6699FF";
var networkColor = "red";//"#FF3300";
var mobileColor = "green";//"#33CC33";
var textColor = "white";
var defaultColor = "#FFFFFF";

//-----Variable to store schedule of all courses -----
var courseScheduleOverlapped = new Array();
var courseScheduleAllCourse = new Array();

var scheduleAllCourseArrayFlag = new Array();
var scheduleAllCourseFlag = false;
var courseScheduleOverlappedFlag = false;

//-----Connect to database-----
function sparqlQueryJson(queryStr, endpoint, callback, isDebug)
{
	var querypart = "query=" + escape(queryStr);

	// Get our HTTP request object.
	var xmlhttp = null;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject)
		{
			// Code for older versions of IE, like IE6 and before.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} else
			{
				alert('Perhaps your browser does not support XMLHttpRequests?');
			}

	// Set up a POST with JSON result format.
	xmlhttp.open('POST', endpoint, true); // GET can have caching probs, so POST
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
	
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			if(xmlhttp.status == 200)
			{
				// Do something with the results
				if(isDebug) //alert(xmlhttp.responseText);
				callback(xmlhttp.responseText);
			} else
				{
					// Some kind of error occurred.
					alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
				}
		}
	};
	// Send the query to the endpoint.
	xmlhttp.send(querypart);
};

//-----Connect to database------
function sparqlQueryJsonIndex(queryStr, endpoint, callback, index, isDebug)
{
	var querypart = "query=" + escape(queryStr);
	
	// Get our HTTP request object.
	var xmlhttp = null;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject)
		{
			// Code for older versions of IE, like IE6 and before.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} else
			{
				alert('Perhaps your browser does not support XMLHttpRequests?');
			}

	// Set up a POST with JSON result format.
	xmlhttp.open('POST', endpoint, true); // GET can have caching probs, so POST
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
	// Set up callback to get the response asynchronously.
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			if(xmlhttp.status == 200)
			{
				//alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
				// Do something with the results
				if(isDebug) //alert(xmlhttp.responseText);
				callback(xmlhttp.responseText, index);
			} else
				{
					// Some kind of error occurred.
					alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
				}
		}
	};
	// Send the query to the endpoint.
	xmlhttp.send(querypart);
};

//-----Connect to database - Use synchronous-----
function sparqlQueryJsonSynchronous(queryStr, endpoint, callback, isDebug)
{
	var querypart = "query=" + escape(queryStr);
	// Get our HTTP request object.
	var xmlhttp = null;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	} else if(window.ActiveXObject)
		{
			// Code for older versions of IE, like IE6 and before.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} else
			{
				alert('Perhaps your browser does not support XMLHttpRequests?');
			}

	// Set up a POST with JSON result format.
	xmlhttp.open('POST', endpoint, false); // GET can have caching probs, so POST
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
	// Set up callback to get the response asynchronously.
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			if(xmlhttp.status == 200)
			{
				// Do something with the results
				if(isDebug) //alert(xmlhttp.responseText);
				callback(xmlhttp.responseText);
			} else
				{
					// Some kind of error occurred.
					alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
				}
		}
	};
	// Send the query to the endpoint.
	xmlhttp.send(querypart);
};

//-----------The function to check the hours of two courses if they are overlapped---------
var timeIntervalOverlapped = false;
function checkTwoInterval(timeBegin1, timeEnd1, timeBegin2, timeEnd2)
{
	timeIntervalOverlapped = false;
	if((timeBegin2>timeBegin1&&timeBegin2<timeEnd1) || (timeEnd2 > timeBegin1 && timeEnd2 < timeEnd1) || (timeBegin1 > timeBegin2 && timeBegin1 < timeEnd2) || (timeBegin1 == timeBegin2 && timeEnd1 == timeEnd2))
		timeIntervalOverlapped = true;
}

//-----Query schedule of all of course to store to courseScheduleOverlapped array -----
function queryScheduleEachCourse(courseName, index)
{
	var endpoint = endpointRepository;
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX TIME:<http://www.w3.org/2006/time#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT ?code ?timeB ?timeE FROM <http://data.eurecom.fr/reve> WHERE {{ ?course AIISO:code '"+ courseName + "'. ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	
	// Make the query.
	sparqlQueryJsonIndex(query, endpoint, callbackScheduleEachCourse, index, true);
	
}

//-----Callback function to add all of courses' name to courseTrackArray-----
function callbackScheduleEachCourse(str, index)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	courseScheduleAllCourse[index] = new Array();
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var courseName = jsonObj.results.bindings[i].code.value;
		var timeB = jsonObj.results.bindings[i].timeB.value;
		var timeE = jsonObj.results.bindings[i].timeE.value;
		//courseScheduleAllCourse[index][0] = courseName;
		courseScheduleAllCourse[index][i*2+1] = timeB;
		courseScheduleAllCourse[index][i*2+2] = timeE;
	}
	scheduleAllCourseArrayFlag[index] = true;
	
	var flag = false;
	for(var j = 1; j<=courseInformationArray.length;j++)
		if(scheduleAllCourseArrayFlag[j] == true)
			flag = true;
		else
		{
			flag = false;
			break;
		}
	scheduleAllCourseFlag = flag;
}

//----------Function to read schedule for all of courses----------
function getScheduleAllCourses()
{
	for(var i = 0; i<courseInformationArray.length; i++)
	{
		queryScheduleEachCourse(courseInformationArray[i][0], i+1);
	}
	var flag = false;
	for(var j = 1; j<=courseInformationArray.length;j++)
		if(scheduleAllCourseArrayFlag[j] == true)
			flag = true;
		else
		{
			flag = false;
			break;
		}
	scheduleAllCourseFlag = flag;
}

//-----------Function init the array to store the overlapped schedule---------
function initCourseScheduleOverlapped()
{
	courseScheduleOverlapped[0] = new Array();
	for(var i = 0; i< courseInformationArray.length; i++)
	{
		courseScheduleOverlapped[i+1] = new Array();
		courseScheduleOverlapped[0][i+1] = courseInformationArray[i][0];
		courseScheduleOverlapped[i+1][0] = courseInformationArray[i][0];
		if(i>0)
		{
			for(var j = 1; j<=courseInformationArray.length; j++)
			{
				courseScheduleOverlapped[i][j] = 0;
			}
		}
	}
}

//----------Function to make the schedule overlapped for all of course that is store in courseScheduleOverlapped ----------
function makeScheduleOverlappedArray()
{
	initCourseScheduleOverlapped();
	for(var i = 1; i<courseScheduleAllCourse.length; i++)
	{
		for(var j = 1; j <courseScheduleAllCourse[i].length; j=j+2)
		{
			timeB1 = courseScheduleAllCourse[i][j];
			timeE1 = courseScheduleAllCourse[i][j+1];
			var temp = timeB1.split(" "); dateB1 = temp[0];
			var hourtempB1 = temp[1].split(":"); hourB1 = parseInt(hourtempB1[0] + hourtempB1[1] + hourtempB1[2]);
			temp = timeE1.split(" "); dateE1 = temp[0];
			var hourtempE1 = temp[1].split(":"); hourE1 = parseInt(hourtempE1[0] + hourtempE1[1] + hourtempE1[2]);
			for( var k = 1; k <courseScheduleAllCourse.length; k++)
			{
				if(k != j)
				{
					for(var m = 1; m <courseScheduleAllCourse[k].length; m=m+2)
					{
						timeB2 = courseScheduleAllCourse[k][m];
						timeE2 = courseScheduleAllCourse[k][m+1];
						var temp = timeB2.split(" "); dateB2 = temp[0];
						var hourtempB2 = temp[1].split(":"); hourB2 = parseInt(hourtempB2[0] + hourtempB2[1] + hourtempB2[2]);
						temp = timeE2.split(" "); dateE2 = temp[0];
						var hourtempE2 = temp[1].split(":"); hourE2 = parseInt(hourtempE2[0] + hourtempE2[1] + hourtempE2[2]);
						if(dateB1 == dateB2)
						{
							checkTwoInterval(hourB1, hourE1, hourB2, hourE2);
							if(timeIntervalOverlapped == true)
							{
								courseScheduleOverlapped[i][k] = 1;
								break;
							}								 
						}
					}
				}
			}
			
					
		}
	}
	courseScheduleOverlappedFlag = true;
}

//-----Variable to store the course overlapped-----
var makeScheduleOverlapped = false;
var scheduleOverlappedArrayTime;
function callMakeScheduleOverlappedArray()
{
	if(makeScheduleOverlapped == true)
	{
		clearInterval(scheduleOverlappedArrayTime);
	}
	else
	{
		if(courseInformationLoad == false && scheduleAllCourseFlag == false)
			scheduleOverlappedArrayTime = setInterval(callMakeScheduleOverlappedArray, 1000);//4000
		else
		{
			makeScheduleOverlappedArray();
			clearInterval(scheduleOverlappedArrayTime);
			makeScheduleOverlapped = true;
		}
	}
}

//-----Variable to store the overlapped state of the new chose course and the course's name that is overlapped with the new chose course------
var newCourseCheckSchedule = false;
var courseNameOverlapped = new Array();
//-----------The funtion to check schedule if it is overlapped when user choose course----------

function checkSchedule()
{
	clearInterval(myTime);
	newCourseCheckSchedule = false;
	courseNameOverlapped = new Array();
	var index = 0;
	var numberOverlapped = 0;
	for(var l = 1; l<courseChose.length; l++)
	{
		courseName = courseChose[l];
		var checked = true;
		for(var x= 0; x<courseNameOverlapped.length; x++)
		{
			if(courseName == courseNameOverlapped[x])
			{
				checked = false;
				break;
			}
		}
		if(checked == true)
		{
			//-----Define the index of the new chose course in the courseScheduleOverlapped array------
			for(var m = 1; m <courseScheduleOverlapped[0].length; m++)
			{
				if(courseScheduleOverlapped[m][0] == courseName)
				{
					index = m;
					break;
				}
			}
			//-----Define if it exists any course that is overlapped with the new chose course
			for(var i = 1; i<courseChose.length; i++)
			{
				if(courseChose[i] != courseName)
				{
					for(var j = 0; j<courseScheduleOverlapped[0].length; j++)
					{
						if(courseScheduleOverlapped[0][j] == courseChose[i])
						{
							if(courseScheduleOverlapped[index][j] == 1 && courseChoseSemester[i] == courseChoseSemester[l])
							{
								newCourseCheckSchedule = true;
								courseNameOverlapped[numberOverlapped++] = courseName;
								courseNameOverlapped[numberOverlapped++] = courseChose[i];		
							}
							break;
						}
					}
				}
			}
		}
	}
}

//-----------The function to check if user's choice satisfy with the rule of Eurecom (technical and general credits) ----------
function checkRuleEurecom()
{
	clearInterval(myTime);
	technicalChoosing = 0;
	nonTechnicalChoosing = 0;
	totalChoosing = 0;
	ruleFlag = false;
	
	var courseType;
	for(var i = 1; i<courseChose.length; i++)
	{
		var courseName = courseChose[i];
		if(courseName)
		{
			for(var j = 0; j < courseInformationArray.length; j++)
			{
				if(courseChose[i] == courseInformationArray[j][0])
				{
					courseType = courseInformationArray[j][7];
					break;
				}
			}
			for(var k = 0; k<courseTrackArray[0].length; k++)
			{
				if(courseTrackArray[0][k+1] == courseName)
				{
					var credit = courseTrackArray[2][k+1];
					if(credit == null)
						credit = 3;
					break;
				}
			}
			if(courseType == "http://data.eurecom.fr/ontology/reve#TechnicalCourse")
				technicalChoosing += parseInt(credit);
			else if(courseType == "http://data.eurecom.fr/ontology/reve#GeneralCourse")
				nonTechnicalChoosing += parseInt(credit);
				
			totalChoosing += parseInt(credit);
		}
	}	
	technicalLack = technicalCredits - technicalChoosing;
	nonTechnicalLack = nonTechnicalCredits - nonTechnicalChoosing;
	totalLack = allCredits - languageCredits - projectCredits - totalChoosing;
	
	if(technicalLack <= 0 && nonTechnicalLack <= 0)
		ruleFlag = true;	
}

//-----------The function to check if user's choice satisfy with the rule of Eurecom (mandatory, optional credits) ----------
function checkTrackRuleEurecom(trackName)
{
	mandatoryChoosing = 0;
	optionalChoosing = 0;
	freeChoosing = 0;
	
	var index = -1;
	for( var i =1; i<courseTrackArray.length; i++)
		if(courseTrackArray[i][0] == trackName)
		{
			index = i;
			break;
		}
	for(var i = 1; i<courseChose.length; i++)
	{
		var courseName = courseChose[i];
		if(courseName)
		{
			for(var j = 1; j<courseTrackArray[index].length; j++)
			{
				if(courseName == courseTrackArray[0][j])
				{
					if(courseTrackArray[index][j] == 1)
						mandatoryChoosing += parseInt(courseTrackArray[index+1][j]);
					else if(courseTrackArray[index][j] == 2)
						optionalChoosing += parseInt(courseTrackArray[index+1][j]);
					else if(courseTrackArray[index][j] == 3)
						freeChoosing += parseInt(courseTrackArray[index+1][j]);
					break;
				}
			}
		}
	}
	
	mandatoryLack = mandatoryCredits - mandatoryChoosing;
	optionalLack = optionalCredits - optionalChoosing;
	
	if(mandatoryLack <= 0 && optionalLack <= 0)
		ruleTrackFlag = true;
}

function callCheckRuleEurecom()
{
	var trackName = trackChoseStoreGetArray[0];
	checkTrackRuleEurecom(trackName);
	
	
}

//-----Read data and store in courseTrack Array include information about mandatory or option or free course of each course according to each track, and credits of each courses according to each track-----
function initCourseTrackArray()
{
		courseTrackArray[0] = new Array();
		courseTrackArray[1] = new Array();
		courseTrackArray[2] = new Array();
		courseTrackArray[3] = new Array();
		courseTrackArray[4] = new Array();
		courseTrackArray[5] = new Array();
		courseTrackArray[6] = new Array();
		courseTrackArray[7] = new Array();
		courseTrackArray[8] = new Array();
		courseTrackArray[9] = new Array();
		courseTrackArray[10] = new Array();
		courseTrackArray[11] = new Array();
		courseTrackArray[12] = new Array();
		courseTrackArray[13] = new Array();
		courseTrackArray[14] = new Array();
		courseTrackArray[15] = new Array();

		queryCourseName();
		queryCourseTrackAddArray("MULTIMEDIA",1);
		queryCourseTrackAddArray("COMMUNICATION SYSTEM SECURITY",3);
		queryCourseTrackAddArray("TRANSMISSION TECHNOLOGIES",5);
		queryCourseTrackAddArray("WEB ENGINEERING",7);
		queryCourseTrackAddArray("MOBILE COMMUNICATIONS",9);
		queryCourseTrackAddArray("NETWORKING",11);
		queryCourseTrackAddArray("REAL-TIME AND EMBEDDED SYSTEMS",13);
		
		courseTrackArray[1][0] = "MULTIMEDIA";
		courseTrackArray[2][0] = "MULTIMEDIA";
		courseTrackArray[3][0] = "COMMUNICATION SYSTEM SECURITY";
		courseTrackArray[4][0] = "COMMUNICATION SYSTEM SECURITY";
		courseTrackArray[5][0] = "TRANSMISSION TECHNOLOGIES";
		courseTrackArray[6][0] = "TRANSMISSION TECHNOLOGIES";
		courseTrackArray[7][0] = "WEB ENGINEERING";
		courseTrackArray[8][0] = "WEB ENGINEERING";
		courseTrackArray[9][0] = "MOBILE COMMUNICATIONS";
		courseTrackArray[10][0] = "MOBILE COMMUNICATIONS";
		courseTrackArray[11][0] = "NETWORKING";
		courseTrackArray[12][0] = "NETWORKING";
		courseTrackArray[13][0] = "REAL-TIME AND EMBEDDED SYSTEMS";
		courseTrackArray[14][0] = "REAL-TIME AND EMBEDDED SYSTEMS";
	
		for(var i = 0; i < courseTrackArray[0].length; i++)
		{
			courseTrackArray[15][i] = 0;
		}
		courseTrackArrayLoad = true;
}

//-----Query type of course and amount of credits of each course according to each track-----
function queryCourseTrackAddArray(trackName, index)
//function queryCourseTrackAddArray(trackName)
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT DISTINCT ?course ?typeCourse ?credit ?trackID FROM <http://data.eurecom.fr/reve> {{?code AIISO:code ?course. ?code rdf:type REVE:Course} OPTIONAL {?code ?typeCourse  ?trackID. ?trackID rdf:type REVE:Track. ?trackID rdfs:label \""+ trackName +"\"@en} OPTIONAL {?cCFT REVE:isCreditForCourse ?code. ?cCFT REVE:hasCredit ?credit. ?cCFT REVE:hasTrack ?trackID. ?trackID rdfs:label \"" + trackName+ "\"@en }} ORDER BY ?course";
	
	// Make the query.
	sparqlQueryJsonIndex(query, endpoint, callbackCourseTrackAddArray, index, true);
	//sparqlQueryJsonCourseTrackArray(query, endpoint, callbackCourseTrackAddArray, true);

}

//----- Callback function to add type of course and amount of credits to courseTrackArray ------
function callbackCourseTrackAddArray(str, index)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');

	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].course.value;
		if(jsonObj.results.bindings[i].typeCourse != null)
		{
			var type = jsonObj.results.bindings[i].typeCourse.value;			
			if(courseTrackArray[0][i+1] == co)
				if(type == 'http://data.eurecom.fr/ontology/reve#isMandatoryFor')
					courseTrackArray[index][i+1] = 1;
				else if(type == 'http://data.eurecom.fr/ontology/reve#isOptionalFor')
						courseTrackArray[index][i+1] =2;
					else if(type == 'http://data.eurecom.fr/ontology/reve#isFreeFor')
						courseTrackArray[index][i+1] = 3;
						else
							courseTrackArray[index][i+1]= 0;
			else
			{
				for(var j = 0; j<courseTrackArray.length; j++)
				{
					if(courseTrackArray[0][j] == co)
					{						
						if(type == 'REVE:isMandatoryFor')
							courseTrackArray[index][j+1] = 1;
						else if(type == 'REVE:isOptionalFor')
								courseTrackArray[index][j+1] =2;
							else if(type == 'REVE:isFreeFor')
									courseTrackArray[index][j+1] = 3;
								else
									courseTrackArray[index][j+1]= 0;
						break;
					}
				}
				courseTrackArray[0][j] = co;
				if(type == 'REVE:isMandatoryFor')
						courseTrackArray[index][j+1] = 1;
					else if(type == 'REVE:isOptionalFor')
							courseTrackArray[index][j+1] =2;
						else if(type == 'REVE:isFreeFor')
								courseTrackArray[index][j+1] = 3;
							else
								courseTrackArray[index][j+1]= 0;
			}
		}
		if(jsonObj.results.bindings[i].credit != null)
		{
			var credit = jsonObj.results.bindings[i].credit.value;
			if(courseTrackArray[0][i+1] == co)
				courseTrackArray[index+1][i+1] = credit;					
			else
			{
				for(var j = 0; j<courseTrackArray.length; j++)
				{
					if(courseTrackArray[0][j] == co)
					{						
						if(courseTrackArray[0][j] == co)
							courseTrackArray[index+1][j+1] = credit;
						break;
					}
				}
				courseTrackArray[0][j] = co;
				if(courseTrackArray[0][j] == co)
					courseTrackArray[index+1][j+1] = credit;
			}
		}	
	}
}

//-----Query all of course's name to add to courseTrackArray -----
function queryCourseName()
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT  ?code FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseName, true);
}

//-----Callback function to add all of courses' name to courseTrackArray-----
function callbackCourseName(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		courseTrackArray[0][i+1] = co;		
	}
}

//-----Query information of each course (course's name, semester, description, teacher's name, teacher's image, teacher's department) to add into the courseInformationArray-----
function queryCourseInformationAddArray()
{
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX PART:<http://purl.org/vocab/participation/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX DC:<http://purl.org/dc/terms/> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> SELECT ?code (sql:SAMPLE (?semester) AS ?semester) (sql:SAMPLE (?des) AS ?des) (sql:SAMPLE (?teacherFirstName) AS ?teacherFirstName) (sql:SAMPLE (?teacherLastName) AS ?teacherLastName) (sql:SAMPLE (?teacherImage) AS ?teacherImage) (sql:SAMPLE (?department) AS ?department) (sql:SAMPLE (?courseType) AS ?courseType) FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course} {{?course rdf:type ?courseType}{?courseType rdfs:subClassOf REVE:Course}} OPTIONAL {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}} {?course AIISO:responsibilityOf ?teacherID} {?teacherID FOAF:firstName ?teacherFirstName} {?teacherID FOAF:family_name ?teacherLastName} OPTIONAL {?teacherID FOAF:img ?teacherImage} OPTIONAL {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department} OPTIONAL {?course DC:description ?des}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseInformationAddArray, true);
}

//-----Callback function to add information of each course into the courseInformationArray-----
function callbackCourseInformationAddArray(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		courseInformationArray [i] = new Array();
	  	
		var co = jsonObj.results.bindings[i].code.value;
		courseInformationArray [i][0] = co;
		if(jsonObj.results.bindings[i].semester != null)
		{
			var semester = jsonObj.results.bindings[i].semester.value;
			courseInformationArray [i][1] = semester;
		}
		else
			courseInformationArray [i][1] = "";
		if(jsonObj.results.bindings[i].des != null)	
		{
			var des = jsonObj.results.bindings[i].des.value;
			courseInformationArray [i][2] = des;
		}
		else
			courseInformationArray [i][2] = "";
		if(jsonObj.results.bindings[i].teacherFirstName != null)
		{
			var teacherFirstName = jsonObj.results.bindings[i].teacherFirstName.value;
			courseInformationArray [i][3] = teacherFirstName;
		}
		else
			courseInformationArray [i][3] = "";
			
		if(jsonObj.results.bindings[i].teacherLastName != null)
		{
			var teacherLastName = jsonObj.results.bindings[i].teacherLastName .value;
			courseInformationArray [i][4] = teacherLastName;
		}
		else
			courseInformationArray [i][4] = "";
			
		if(jsonObj.results.bindings[i].teacherImage != null)
		{
			var teacherImage = jsonObj.results.bindings[i].teacherImage.value;
			courseInformationArray [i][5] = teacherImage;
		}
		else
			courseInformationArray [i][5] = "";

		if(jsonObj.results.bindings[i].department != null)
		{
			var department = jsonObj.results.bindings[i].department.value;
			courseInformationArray [i][6] = department;
		}
		else
			courseInformationArray [i][6] = "";
			
		if(jsonObj.results.bindings[i].courseType != null)
		{
			var courseType = jsonObj.results.bindings[i].courseType.value;
			courseInformationArray [i][7] = courseType;
		}
		else
			courseInformationArray [i][7] = "";
	}
	courseInformationLoad= true;
	getScheduleAllCourses();
}

//----------Query technical list for home page-----------
function queryTechnicalCourseTeacher()
{
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (sql:SAMPLE (?teacher) AS ?teacher) FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacher, true);
}
//----------Callback technical list for home page-----------
function callbackTechnicalCourseTeacher(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_homepage"+ ">Course</td> <td class="+ "border_row_header_homepage"+ ">Teacher</td> </tr>";

	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		courseTechnicalFallArray[i] = co;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_homepage"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event);  \"" + " onmouseout="+"\"closeWin(); \">" + jsonObj.results.bindings[i].code.value;

	  result += "</td><td class="+ "border_row_homepage"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  result += "</form>";
	  result += " </td></tr>"; 

	}
	result += "</table>";
	document.getElementById("technicalCourseTeacher").innerHTML = result;
	techniqueList= true;
}

//----------Query technical list for Fall page---------
function queryTechnicalCourseTeacherFall()
{
	techniqueList = false;
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (sql:SAMPLE (?teacher) AS ?teacher) (sql:SAMPLE (?semester) AS ?semester)  FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"fall\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacherFallSpring, true);

}
//----------Query technical list for Spring page---------
function queryTechnicalCourseTeacherSpring()
{
	techniqueList= false;
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (sql:SAMPLE (?teacher) AS ?teacher) (sql:SAMPLE (?semester) AS ?semester)  FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"spring\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacherFallSpring, true);

}

//----------Callback technical list for fall and Spring page----------
function callbackTechnicalCourseTeacherFallSpring(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_semester"+ ">Course</td> <td class="+ "border_row_header_semester"+ ">Teacher</td> <td class="+ "border_row_header_semester"+ ">Choose</td></tr>";
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		var checkBoxName = co + "-Checkbox";//+i;
		courseTechnicalFallArray[i] = co;
		result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_semester"+ "\"" + " draggable=\"true\" ondragstart=\"drag(event)\"  onmousemove="+"\"openWin(\'"+co+"\', event); queryCourseTimeMouseMove(\'"+co+ "\'); \"" + " onmouseout="+"\"closeWin(); queryCourseTimeDeselect(\'"+co+"\', \'"+ checkBoxName+"\'); \" style=\"cursor:move;\">" + jsonObj.results.bindings[i].code.value;
		result += "</td><td class="+ "border_row_semester"+ ">" + jsonObj.results.bindings[i].teacher.value;
		result += " </td><td class="+ "border_row_semester"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
		result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";
		result += "></form>";
		result += " </td></tr>"; 
	}
	result += "</table>";
	document.getElementById("technicalCourseTeacher").innerHTML = result;
	techniqueList= true;
}

//----------Query non technical list for home page-----------
function queryNonTechnicalCourseTeacher()
{
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (sql:SAMPLE (?teacher) AS ?teacher) FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacher, true);
}

//----------Callback non technical list for home page-----------
function callbackNonTechnicalCourseTeacher(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_homepage"+ ">Course</td> <td class="+ "border_row_header_homepage"+ ">Teacher</td></tr>";

	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_homepage"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event);\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  result += "</td><td class="+ "border_row_homepage"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  result += "</form>";
	  result += " </td></tr>"; 
	}
	
	result += "</table>";
	document.getElementById("nonTechnicalCourseTeacher").innerHTML = result;	
	nonTechniqueList = true;
}
//----------Query non technical list for Fall page-----------
function queryNonTechnicalCourseTeacherFall()
{
	nonTechniqueList = false;
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (sql:SAMPLE (?teacher) AS ?teacher) (sql:SAMPLE (?semester) AS ?semester)  FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"fall\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacherFallSpring, true);
}

//----------Query non technical list for Spring page-----------
function queryNonTechnicalCourseTeacherSpring()
{
	nonTechniqueList = false;
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (sql:SAMPLE (?teacher) AS ?teacher) (sql:SAMPLE (?semester) AS ?semester)  FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"spring\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacherFallSpring, true);
}

//----------Callback non technical list for Fall and Spring page-----------
function callbackNonTechnicalCourseTeacherFallSpring(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_semester"+ ">Course</td> <td class="+ "border_row_header_semester"+ ">Teacher</td> <td class="+ "border_row_header_semester"+ ">Choose</td></tr>";
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		var checkBoxName = co + "-Checkbox";//+i;
		result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_semester"+ "\"" + " draggable=\"true\" ondragstart=\"drag(event)\" onmousemove="+"\"openWin(\'"+co+"\', event); queryCourseTimeMouseMove(\'"+co+ "\'); \"" + " onmouseout="+"\"closeWin(); queryCourseTimeDeselect(\'"+co+"\', \'"+checkBoxName+"\'); \" style=\"cursor:move;\">" + jsonObj.results.bindings[i].code.value;
		result += "</td><td class="+ "border_row_semester"+ ">" + jsonObj.results.bindings[i].teacher.value;
		
		result += " </td><td class="+ "border_row_semester"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
		result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";
		result += "></form>";
		result += " </td></tr>"; 
	}
	
	result += "</table>";
	document.getElementById("nonTechnicalCourseTeacher").innerHTML = result;	
	nonTechniqueList = true;
}

function queryCourseCredits_queryCourseTime(co, checkBoxName)
{
	courseChoseCheck(checkBoxName);
	queryCourseTime(co,checkBoxName);
}

//-----------Query teacher's department of each course to colorize list of courses----- After, change this colorizing method to get data from courseInformationArray----------
function queryCourseDepartment()
{
	var endpoint = endpointRepository;
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX DC:<http://purl.org/dc/terms/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX PART:<http://purl.org/vocab/participation/schema#> SELECT ?code ?department FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course AIISO:responsibilityOf ?teacherID} {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department}}";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseDepartment, true);
	//checkSessionStorage();
}

var courseDepartmentFlag = false;
var callQueryCourseDepartmentTime;

function setFalseCourseDepartmentFlag()
{
	courseDepartmentFlag = false;
}

function callQueryCourseDepartment()
{
	if(courseDepartmentFlag  == true)
	{
		clearInterval(callQueryCourseDepartmentTime);
	}
	else
	{
		if(techniqueList == false || nonTechniqueList == false)
			callQueryCourseDepartmentTime = setInterval(callQueryCourseDepartment, 500);//5000
		else
		{
			clearInterval(callQueryCourseDepartmentTime );
			queryCourseDepartment();
			courseDepartmentFlag = true;
		}
	}

}

//-----------Colorize the list of course according to teacher department -----------
function callbackCourseDepartment(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		if(jsonObj.results.bindings[i].code.value != null && jsonObj.results.bindings[i].department.value != null)
		{
			var courseName = jsonObj.results.bindings[i].code.value;
			var dep = jsonObj.results.bindings[i].department.value;
			if(dep == "Networking and Security" && document.getElementById(courseName) != null)
			{
				document.getElementById(courseName).style.backgroundColor= networkColor;//"#FFCCFF";//"#FF9966";
				document.getElementById(courseName).style.color= textColor;
			}				
			if(dep == "Mobile Communications" && document.getElementById(courseName) != null)
			{
				document.getElementById(courseName).style.backgroundColor= mobileColor;//"#FFFF99";//"#FCD88B";//"#FF66FF";
				document.getElementById(courseName).style.color= textColor;
			}
			if(dep == "Multimedia Communications" && document.getElementById(courseName) != null)
			{
				document.getElementById(courseName).style.backgroundColor= multimediaColor;//"#99FF33";//"#CCFF33";
				document.getElementById(courseName).style.color= textColor;
			}
		}
	}
}

//-----------Query the schedule of course ----------
function queryCourseTimeMouseMove(courseName)
{
	var endpoint = endpointRepository;
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course} {?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseTime, true);
}

//-----------Query the schedule of course ----------
function queryCourseTime(courseName,checkBoxName)
{
	var endpoint = endpointRepository;
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course} {?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	if(document.getElementById(checkBoxName).checked==true)//can phai xem lai dieu kien nay khi re chuot vao thi no hien ra
		sparqlQueryJson(query, endpoint, callbackCourseTime,true);
	clearInterval(myTime);
}

//-----------Sign on the calendar by color according to the schedule of course that is chose or mouse over----------
function callbackCourseTime(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	var result = "<div>";
	
	var textFlag = 0;//-----Variable to check if this course's name is written-----
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		if(jsonObj.results.bindings[i].course.value != null && jsonObj.results.bindings[i].timeB.value != null && jsonObj.results.bindings[i].timeE.value != null)
		{
			var courseName = jsonObj.results.bindings[i].code.value;
			var timeB = jsonObj.results.bindings[i].timeB.value;
			var timeE = jsonObj.results.bindings[i].timeE.value;
			var dayTimeB= timeB.split(' ');
			var dayTimeE = timeE.split(' ');
			var detailDayTimeB = dayTimeB[0].split('-');
			var detailHourTimeB = dayTimeB[1].split(':');
			var detailDayTimeE = dayTimeE[0].split('-');
			var detailHourTimeE = dayTimeE[1].split(':');
			var dateB = new Date(detailDayTimeB[0],detailDayTimeB[1]-1,detailDayTimeB[2]);
			var dayB = dateB.getDay();

			var idTimeB = dayB + detailHourTimeB[0] + detailHourTimeB[1];			
			var color = document.getElementById(courseName).style.backgroundColor;
			if (color == "")
				color = "#CCCCFF";
			var flag =0;//-----Variable to mark if the course occurs in the courseChose list of not-----
			if(document.getElementById('fall1_'+idTimeB) != null && fall1Mark == true)
			{
				for(var j = 0; j<courseChose.length; j++)
				{
					if(courseName == courseChose[j])
					{					
						if(courseChoseSemester[j] == 'fall1')
						{
							document.getElementById('fall1_'+idTimeB).style.backgroundColor = color;
							if(document.getElementById('fall1_'+idTimeB).innerHTML == "")
							{
								document.getElementById('fall1_'+idTimeB).innerHTML = courseName;
								textFlag =1;	
							}
							else if(document.getElementById('fall1_'+idTimeB).innerHTML == courseName)
								textFlag =1;
						}						
						flag = 1;
					}
				}
			}
			if(document.getElementById('spring_'+idTimeB) != null && springMark == true)
			{
				for(var j = 0; j<courseChose.length; j++)
				{
					if(courseName == courseChose[j])
					{
						if(courseChoseSemester[j] == 'spring')
						{
							document.getElementById('spring_'+idTimeB).style.backgroundColor = color;
							if(document.getElementById('spring_'+idTimeB).innerHTML == "")
							{						
								document.getElementById('spring_'+idTimeB).innerHTML = courseName;
								textFlag =1;
							}
							else if(document.getElementById('spring_'+idTimeB).innerHTML == courseName)
								textFlag =1;
						}
						flag = 1;
					}
				}
			}
			if(document.getElementById('fall2_'+idTimeB) != null && fall2Mark == true)
			{
				for(var j = 0; j<courseChose.length; j++)
				{
					if(courseName == courseChose[j])
					{
						if(courseChoseSemester[j] == 'fall2')
						{
							document.getElementById('fall2_'+idTimeB).style.backgroundColor = color;
							if(document.getElementById('fall2_'+idTimeB).innerHTML == "")
							{					
								document.getElementById('fall2_'+idTimeB).innerHTML = courseName;
								textFlag = 1;
							}
							else if(document.getElementById('fall2_'+idTimeB).innerHTML == courseName)
								textFlag =1;
						}	
						flag = 1;
					}
				}
			}
			if(flag ==0)//-----In the case of the course is not in the courseChoose array, it means the user has just chosen ------
				if(document.getElementById('fall1_'+idTimeB) != null)
					document.getElementById('fall1_'+idTimeB).style.backgroundColor = color;
				else if(document.getElementById('spring_'+idTimeB) != null)
					document.getElementById('spring_'+idTimeB).style.backgroundColor = color;
				else if(document.getElementById('fall2_'+idTimeB) != null)
					document.getElementById('fall2_'+idTimeB).style.backgroundColor = color;
			
			
			var dateE = new Date(detailDayTimeE[0],detailDayTimeE[1]-1,detailDayTimeE[2]);
			var dayE = dateE.getDay();
			var idTimeE = dayE + detailHourTimeE[0] + detailHourTimeE[1];

			var minute = parseInt(detailHourTimeB[1]);
			var increaseTimeB = idTimeB;
			var hour = parseInt(detailHourTimeB[0]);
			
			while (parseInt(increaseTimeB) < parseInt(idTimeE)-15)
			{
				minute += 15;
				if(minute == 60)
				{
					minute = 0;
					hour += 1;					
				}
				var minuteString = String(minute);
				var hourString = String(hour);
				if(minute == 0)
					minuteString = "00";
				if(hour <10)
					hourString = "0" + hourString;
				increaseTimeB = dayB + hourString + minuteString;
				if(parseInt(increaseTimeB) < parseInt(idTimeE))
				{
					var flag =0;
					if(document.getElementById('fall1_'+increaseTimeB) != null && fall1Mark == true)
					{
						for(var j = 0; j<courseChose.length; j++)
						{
							if(courseName == courseChose[j])
							{							
								if(courseChoseSemester[j] == 'fall1')
								{
									document.getElementById('fall1_'+increaseTimeB).style.backgroundColor = color;
									if(document.getElementById('fall1_'+increaseTimeB).innerHTML == "" && textFlag ==0)
									{	
										document.getElementById('fall1_'+increaseTimeB).innerHTML = courseName;
										textFlag = 1;
									}
									else if(document.getElementById('fall1_'+increaseTimeB).innerHTML == courseName)
										textFlag =1;	
								}				
								flag =1;
							}
						}
					}
					if(document.getElementById('spring_'+increaseTimeB) != null && springMark == true)
					{
						for(var j = 0; j<courseChose.length; j++)
						{
							if(courseName == courseChose[j])
							{
								if(courseChoseSemester[j] == 'spring')
								{
									document.getElementById('spring_'+increaseTimeB).style.backgroundColor = color;	
									if(document.getElementById('spring_'+increaseTimeB).innerHTML == "" && textFlag ==0)
									{	
										document.getElementById('spring_'+increaseTimeB).innerHTML = courseName;
										textFlag = 1;
									}
									else if(document.getElementById('spring_'+increaseTimeB).innerHTML == courseName)
										textFlag =1;
								}							
								flag = 1;
							}
						}
					}
					if(document.getElementById('fall2_'+increaseTimeB) != null && fall2Mark == true)
					{
						for(var j = 0; j<courseChose.length; j++)
						{
							if(courseName == courseChose[j])
							{
								if(courseChoseSemester[j] == 'fall2')
								{
									document.getElementById('fall2_'+increaseTimeB).style.backgroundColor = color;
									if(document.getElementById('fall2_'+increaseTimeB).innerHTML == "" && textFlag ==0)
									{	
										document.getElementById('fall2_'+increaseTimeB).innerHTML = courseName;
										textFlag = 1;
									}
									else if(document.getElementById('fall2_'+increaseTimeB).innerHTML == courseName)
										textFlag =1;							
								}
								flag = 1;
							}
						}
					}
					if(flag ==0)//-----In the case of the course is not in the courseChoose array, it means the user has just chosen ------
						if(document.getElementById('fall1_'+increaseTimeB) != null)
							document.getElementById('fall1_'+increaseTimeB).style.backgroundColor = color;
						else if(document.getElementById('spring_'+increaseTimeB) != null)
							document.getElementById('spring_'+increaseTimeB).style.backgroundColor = color;
						else if(document.getElementById('fall2_'+increaseTimeB) != null)
							document.getElementById('fall2_'+increaseTimeB).style.backgroundColor = color;
				}
			}
			result += "<div style= \"float:left\">"+timeB+" &nbsp &nbsp &nbsp &nbsp </div> ";
			result += "<div style= \"float:left\">"+timeE+"</div></br>";
		}
	}
	result += "</div>";
	clearInterval(myTime);
}

//-----------Query the schedule of course ----------
function queryCourseTimeDeselect(courseName, checkBoxName)
{
	var endpoint = endpointRepository;
	//var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?timeB ?timeE FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code '"+ courseName+ "'. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session}OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE FROM <http://data.eurecom.fr/reve> {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course} {?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";

	// Make the query.
	if(document.getElementById(checkBoxName).checked==false)
		sparqlQueryJson(query, endpoint, callbackCourseTimeDeselect, true);
	clearInterval(myTime);
}

//------------Give up the color sign on the calendar when the course is deselected-----------
function callbackCourseTimeDeselect(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	var result = "<div>";
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		if(jsonObj.results.bindings[i].course.value != null && jsonObj.results.bindings[i].timeB.value != null && jsonObj.results.bindings[i].timeE.value != null)
		{
			var courseName = jsonObj.results.bindings[i].code.value;

			var timeB = jsonObj.results.bindings[i].timeB.value;
			var timeE = jsonObj.results.bindings[i].timeE.value;
			var dayTimeB= timeB.split(' ');
			var dayTimeE = timeE.split(' ');
			var detailDayTimeB = dayTimeB[0].split('-');
			var detailHourTimeB = dayTimeB[1].split(':');
			var detailDayTimeE = dayTimeE[0].split('-');
			var detailHourTimeE = dayTimeE[1].split(':');
			var dateB = new Date(detailDayTimeB[0],detailDayTimeB[1]-1,detailDayTimeB[2]);
			var dayB = dateB.getDay();

			var idTimeB = dayB + detailHourTimeB[0] + detailHourTimeB[1];			
			if(document.getElementById('fall1_'+idTimeB) != null)
			{
				document.getElementById('fall1_'+idTimeB).style.backgroundColor = defaultColor;
				document.getElementById('fall1_'+idTimeB).innerHTML = "";
			}
			if(document.getElementById('spring_'+idTimeB) != null)
			{
				document.getElementById('spring_'+idTimeB).style.backgroundColor = defaultColor;
				document.getElementById('spring_'+idTimeB).innerHTML = "";							
			}
			if(document.getElementById('fall2_'+idTimeB) != null)
			{
				document.getElementById('fall2_'+idTimeB).style.backgroundColor = defaultColor;		
				document.getElementById('fall2_'+idTimeB).innerHTML = "";					
	
			}

			var dateE = new Date(detailDayTimeE[0],detailDayTimeE[1]-1,detailDayTimeE[2]);
			var dayE = dateE.getDay();
			var idTimeE = dayE + detailHourTimeE[0] + detailHourTimeE[1];

			var minute = parseInt(detailHourTimeB[1]);
			var increaseTimeB = idTimeB;
			var hour = parseInt(detailHourTimeB[0]);
			while (parseInt(increaseTimeB) < parseInt(idTimeE)-15)
			{
				minute += 15;
				if(minute == 60)
				{
					minute = 0;
					hour += 1;					
				}
				var minuteString = String(minute);
				var hourString = String(hour);
				if(minute == 0)
					minuteString = "00";
				if(hour <10)
					hourString = "0" + hourString;
				increaseTimeB = dayB + hourString + minuteString;
				if(parseInt(increaseTimeB) < parseInt(idTimeE))
					if(document.getElementById('fall1_'+increaseTimeB) != null)
					{
						document.getElementById('fall1_'+increaseTimeB).style.backgroundColor = defaultColor;
						if(document.getElementById('fall1_'+increaseTimeB).innerHTML == courseName)
							document.getElementById('fall1_'+increaseTimeB).innerHTML = "";

					}
					if(document.getElementById('spring_'+increaseTimeB) != null)
					{
						document.getElementById('spring_'+increaseTimeB).style.backgroundColor = defaultColor;
						if(document.getElementById('spring_'+increaseTimeB).innerHTML == courseName)
							document.getElementById('spring_'+increaseTimeB).innerHTML = "";
					}
					if(document.getElementById('fall2_'+increaseTimeB) != null)
					{
						document.getElementById('fall2_'+increaseTimeB).style.backgroundColor = defaultColor;
						if(document.getElementById('fall2_'+increaseTimeB).innerHTML == courseName)
							document.getElementById('fall2_'+increaseTimeB).innerHTML = "";
					}
			}
			result += "<div style= \"float:left\">"+timeB+" &nbsp &nbsp &nbsp &nbsp </div> ";
			result += "<div style= \"float:left\">"+timeE+"</div></br>";
		}
	}
	result += "</div>";
	checkTheCalendar();
	clearInterval(myTime);
}

//----------Check again after mouse move out of one course on the list, in order to guarantee the schedule on the calendar is exact----------
function checkTheCalendar()
{
	for(var i = 1; i < courseChose.length; i++)
	{
		var courseName = courseChose[i];
		var checkBoxName = courseName + "-Checkbox";
		if(document.getElementById(checkBoxName) != null)
			queryCourseTime(courseName,checkBoxName);
	}
}

//----------Variable to store the chose track and the number of credits lacked------------
var trackInformationStorage= "";
//----------Set session storage for the edit choices page--------
function setTrackInformationSessionStorage()
{
	sessionStorage.setItem("trackInformation", trackInformationStorage);
}

var getSessionStorageEditChoiceFlag = false;
var myTimeEditChoice;
//---------- After page of edit choices is loaded, call checkSessionStorage function to get list of course chose and display----------
function getSessionStorageEditChoice()
{
	if(getSessionStorageEditChoiceFlag == true)
	{
		clearInterval(getSessionStorageEditChoiceFlag);
	}
	else
	{
		if(courseInformationLoad == false || courseTrackArrayLoad == false)
			myTimeEditChoice = setInterval(getSessionStorageEditChoice, 500);//5000
		else
		{
			//clearTimeout(myTime);
			clearInterval(myTimeEditChoice);
			listTechnicalCourseFall();
			listTechnicalCourseSpring();
			listNonTechnicalCourseFall();
			listNonTechnicalCourseSpring();
			checkSessionStorage();
			checkTrackInformationSessionStorage();
			addCreditCourseList();
			colorizeChoseListEditChoice(trackChoseStoreGetArray[0]);
			//clearTimeout(myTime);
			getSessionStorageEditChoiceFlag = true;
		}
	}
}
var trackChoseStoreGet;
var trackChoseStoreGetArray;
//----------Get information of chose track to show for user on the edit choice page ----------
function checkTrackInformationSessionStorage()
{
	trackChoseStoreGet = sessionStorage.getItem("trackInformation");
	trackChoseStoreGetArray = trackChoseStoreGet.split(",");

	var lackOpt = trackChoseStoreGetArray[2];
	var comment = "";
	comment += "<Span class=\"italicRedText\"> You are choosing "+ trackChoseStoreGetArray[0] + " track, you lack of "+ trackChoseStoreGetArray[1] + " credits of mandatory courses and ";
	if(lackOpt > 0)
		comment += lackOpt + " credits of optional courses!";
	else if(lackOpt == 0)
		comment += " enough credits of optional courses!";
	else
		comment += " enough credits (with " + Math.abs(lackOpt) +" credits of surplus) of optional courses!</Span>";

	document.getElementById("comment").innerHTML = comment;
	
	//-----Colorize the list of chose course (on the right hand side)------
	colorizeChoseList(trackChoseStoreGetArray[0]);
	
}
var myTime;
var getSessionFlag = false;
//---------- After page is loaded, call checkSessionStorage function to get list of course chose and display----------
function getSessionStorage()
{
	if(getSessionFlag == true)
	{
		clearInterval(myTime);
	}
	else
	{
		if((techniqueList == false || nonTechniqueList == false || courseInformationLoad == false || courseTrackArrayLoad == false || courseScheduleOverlappedFlag == false) && checkSessionStorageRunning != true)
		{
			myTime = setInterval(getSessionStorage, 500);
		}
		else
		{
			if(checkSessionStorageRunning != true)
			{
				checkSessionStorage();
				clearInterval(myTime);
				getSessionFlag = true;
			}
		}
		
	}
}

var myTimeRecommend;
//---------- After page is loaded, call checkSessionStorage function to get list of course chose and display for Recommended Page----------
function getSessionStorageRecommendedPage()
{
	if(getSessionFlag == true)
	{
		clearInterval(myTimeRecommend);
	}
	else
	{
		if(techniqueList == false || nonTechniqueList == false || courseInformationLoad == false || courseTrackArrayLoad == false || courseScheduleOverlappedFlag == false)
			myTimeRecommend = setInterval(getSessionStorageRecommendedPage, 500);//4000
		else
		{
			clearInterval(myTimeRecommend);
			checkSessionStorage();
			getSessionFlag = true;
		}
	}
}

//----------Variable to store the list of course that the user choose----------
var courseChoseStore = "";
var courseChoseSemesterStore = "";

//----------Browse in courseChose array to store into courseChoseStore to use in webstorage----------
function setSessionStorage()
{
	for(var i = 1; i < courseChose.length; i++)
	{
		courseChoseStore += courseChose[i] + ",";
		courseChoseSemesterStore += courseChoseSemester[i] + ",";
	}
	sessionStorage.setItem("courseChoseKey", courseChoseStore);
	sessionStorage.setItem("courseChoseSemesterKey", courseChoseSemesterStore);
}

//----------Variable to get list of course chose form web storage----------
var courseChoseStoreGet = "";
var courseChoseStoreGetArray = new Array();
//----------Variable to mark which semester the course is chosen--------
var courseChoseSemesterStoreGet = "";
var courseChoseSemesterStoreGetArray = new Array();
//----------Variable to mark the course is chosen in the last page or just chose----
var fallSemesterMark = false;
//----------Function to get list of course chose from web storage and display on list of course chose----------
var checkSessionStorageRunning = false;
function checkSessionStorage()
{
	checkSessionStorageRunning = true;
	clearInterval(myTime);
	//setSessionStorage();//phai gan lai cho nay ben cho unload moi page
	courseChoseStoreGet = sessionStorage.getItem("courseChoseKey");
	courseChoseSemesterStoreGet = sessionStorage.getItem("courseChoseSemesterKey");
	//initCourseTrackArray();
	if(courseChoseStoreGet != null)
	{
		courseChoseStoreGetArray = courseChoseStoreGet.split(",");
		courseChoseSemesterStoreGetArray = courseChoseSemesterStoreGet.split(",");
		for(var i =0; i<courseChoseStoreGetArray.length; i++)
		{
			if(courseChoseStoreGetArray[i] != "")
				{
					var checkboxName = 	courseChoseStoreGetArray[i] + "-Checkbox";	
					if(document.getElementById(checkboxName)!= null)
					{
						document.getElementById(checkboxName).checked = true;						
						//-----Recheck the courses which are chosen in the last page-----
						fallSemesterMark = true;	
						courseChoseCheck(checkboxName);
						fallSemesterMark = false;
						
						//-----Calculate the amount of credit for each semester------Add semester mark into courseChose array-----
						var courseName = courseChoseStoreGetArray[i];
						for(var j = 0; j<courseTrackArray[0].length; j++)
						{
							if(courseTrackArray[0][j+1] == courseName)
							{
								var credit = courseTrackArray[2][j+1];
								if(credit == null)
									credit = 3;
								
								if(courseChoseSemesterStoreGetArray[i] == 'fall1')
								{
									creditFall1Count += parseInt(credit);
									courseChoseSemester[courseChoseCount] = 'fall1';
								}
								else if(courseChoseSemesterStoreGetArray[i] == 'fall2')
								{
									creditFall2Count += parseInt(credit);
									courseChoseSemester[courseChoseCount] = 'fall2';
								}
								else if(courseChoseSemesterStoreGetArray[i] == 'spring')
								{			
									creditSpringCount += parseInt(credit);
									courseChoseSemester[courseChoseCount] = 'spring';
								}
								if(document.getElementById("creditFall1CountProgress")!=null && document.getElementById("creditCountAnnouncement")!=null)
								{
									document.getElementById("creditFall1CountProgress").style.width = creditFall1Count + "%";
									document.getElementById("creditSpringCountProgress").style.width = creditSpringCount + "%";
									document.getElementById("creditFall2CountProgress").style.width = creditFall2Count + "%";
									document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
									if(creditFall1Count != 0)
										document.getElementById("creditFall1CountProgress").innerHTML = creditFall1Count;
									if(creditSpringCount != 0)
										document.getElementById("creditSpringCountProgress").innerHTML = creditSpringCount;
									if(creditFall2Count != 0)
										document.getElementById("creditFall2CountProgress").innerHTML = creditFall2Count;
									//-----Check if user's choice satisfy the Eurecom rule-----
									checkRuleEurecom();
									var string = "";
									string += "You had "+ languageCredits +" language credits, "+ projectCredits  +" project credits, "+ technicalChoosing + " technique and "+ nonTechnicalChoosing + " general credits.";
									if(technicalLack >0 && nonTechnicalLack>0)
										string += " You have to choose " + technicalLack + " technical credits and " + nonTechnicalLack + " general credits more."
									else
									{
										if(technicalLack > 0)
											string += " You have to choose " + technicalLack + " technical credits more.";
										else if(technicalLack == 0)
											string += " You chose enough technical credits.";
										else
											string += " You chose enough technical credits (with " + Math.abs(technicalLack ) +" credits of surplus).";
										
										if(nonTechnicalLack > 0)
											string += " You have to choose " + nonTechnicalLack + " general credits more.";
										else if(nonTechnicalLack == 0)
											string += " You chose enough general credits.";
										else
											string += " You chose enough general credits (with " + Math.abs(nonTechnicalLack) +" credits of surplus).";
									}
									document.getElementById("commentRuleEurecom").innerHTML = string;
									if(ruleFlag)
										document.getElementById("commentRuleEurecom").style.color = "blue";
									else
										document.getElementById("commentRuleEurecom").style.color = "red";
								}
							}
						}

					}
					else
					{
						var courseName = courseChoseStoreGetArray[i];
						for(var j = 0; j<courseTrackArray[0].length; j++)
						{
							if(courseTrackArray[0][j+1] == courseName && document.getElementById("no" +courseName)==null)
							{
								var credit = courseTrackArray[2][j+1];
								if(credit == null)
									credit = 3;
								courseTrackArray[15][j+1] =1;
								courseChoseCount = courseChoseCount +1;
								courseChose[courseChoseCount] = courseName;
								courseChoseSemester[courseChoseCount] = courseChoseSemesterStoreGetArray[i];
												
								var result ="				<div id=\"no" +courseName +"\" class=\""+"div-column-ChosedCourse-No"+"\">"+courseChoseCount+"</div>";
								result +="				<div id=\"course"+courseName+"\" class=\""+"div-column-ChosedCourse-Course"+"\">"+courseName+"</div>";
								result +="				<div id=\"credit"+courseName+"\" class=\""+"div-column-ChosedCourse-Credits"+"\">"+credit+"</div>";									
								result +="				</div>";
								
								document.getElementById("CourseCredit").innerHTML = document.getElementById("CourseCredit").innerHTML + result;
								creditCount += parseInt(credit);
								//-----Calculate the amount of credit for each semester-----
								if(courseChoseSemesterStoreGetArray[i] == 'fall1')
									creditFall1Count += parseInt(credit);
								else if(courseChoseSemesterStoreGetArray[i] == 'fall2')
									creditFall2Count += parseInt(credit);
								else if(courseChoseSemesterStoreGetArray[i] == 'spring')
									creditSpringCount += parseInt(credit);

								if(document.getElementById("creditFall1CountProgress")!=null && document.getElementById("creditCountAnnouncement")!=null)
								{
									document.getElementById("creditFall1CountProgress").style.width = creditFall1Count + "%";
									document.getElementById("creditSpringCountProgress").style.width = creditSpringCount + "%";
									document.getElementById("creditFall2CountProgress").style.width = creditFall2Count + "%";

									//var amountCredits= creditCount+ languageCredits + projectCredits;
									document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
									if(creditFall1Count != 0)
										document.getElementById("creditFall1CountProgress").innerHTML = creditFall1Count;
									if(creditSpringCount != 0)
										document.getElementById("creditSpringCountProgress").innerHTML = creditSpringCount;
									if(creditFall2Count != 0)
										document.getElementById("creditFall2CountProgress").innerHTML = creditFall2Count;
									//-----Check if user's choice satisfy the Eurecom rule-----
									checkRuleEurecom();
									var string = "";
									string += "You had "+ languageCredits +" language credits, "+ projectCredits  +" project credits, "+ technicalChoosing + " technique and "+ nonTechnicalChoosing + " general credits.";
									if(technicalLack >0 && nonTechnicalLack>0)
										string += " You have to choose " + technicalLack + " technical credits and " + nonTechnicalLack + " general credits more."
									else
									{
										if(technicalLack > 0)
											string += " You have to choose " + technicalLack + " technical credits more.";
										else if(technicalLack == 0)
											string += " You chose enough technical credits.";
										else
											string += " You chose enough technical credits (with " + Math.abs(technicalLack ) +" credits of surplus).";
										
										if(nonTechnicalLack > 0)
											string += " You have to choose " + nonTechnicalLack + " general credits more.";
										else if(nonTechnicalLack == 0)
											string += " You chose enough general credits.";
										else
											string += " You chose enough general credits (with " + Math.abs(nonTechnicalLack) +" credits of surplus).";
									}
									document.getElementById("commentRuleEurecom").innerHTML = string;
									if(ruleFlag)
										document.getElementById("commentRuleEurecom").style.color = "blue";
									else
										document.getElementById("commentRuleEurecom").style.color = "red";
								}
								break;
							}
						}

					}
				}
		}
		checkRuleGeneralCourse();
		if(ruleGeneralCourseFlag == false)
		{
			var commentGeneralCourse = "The number of general type in your choice is not enough. You have to choose " + generalCourseTypeNumber + " different types of general course (such as Business, Economic, Law).";		
			document.getElementById("commentGeneralCourseRule").innerHTML = commentGeneralCourse;
		}
		else
		{
			document.getElementById("commentGeneralCourseRule").innerHTML = "";		
		}


	}
	
	//-----Check again if the schedule is overlapped or not -----
	checkSchedule();
	if(newCourseCheckSchedule == true)
	{
		var courseNameOverlappedString = "";
		for(var x = 0; x<courseNameOverlapped.length; x= x+2)
		{
			courseNameOverlappedString += courseNameOverlapped[x] + " and "+ courseNameOverlapped[x+1];
			if(courseNameOverlapped.length>2 && x<courseNameOverlapped.length-2)
				courseNameOverlappedString += ", ";
		}
		
		if(document.getElementById("commentScheduleOverlappedCheck") != null)
		{
			document.getElementById("commentScheduleOverlappedCheck").style.color = "red";
			document.getElementById("commentScheduleOverlappedCheck").innerHTML = "Your schedule is overlapped, in courses " + courseNameOverlappedString + ". You can only choose one of these two courses. ";
		}
	}
	else
	{
		if(document.getElementById("commentScheduleOverlappedCheck") != null)
		{
			document.getElementById("commentScheduleOverlappedCheck").innerHTML = "";
		}
	}
	
	checkSessionStorageRunning = false;
}

//-----------Variable to store the amount of credits that the users chose----------
var courseChoseCount = 0;
//-----------Every time the checkbox of each course in the list is checked, the course will be add to the list of chose course (at the right hand of the web page) and count the amount of credits. On the contrary, the checkbox is deselected, the course will be moved out of the list of chose course and minus from the amount of credits----------
function courseChoseCheck(checkBoxName)
{
	clearInterval(myTime);
	var checkBoxNameSplit = checkBoxName.split("-");
	var courseName = checkBoxNameSplit[0];
	if(document.getElementById(checkBoxName) != null && document.getElementById(checkBoxName).checked==true)
	{
		for(var i = 0; i<courseTrackArray[0].length; i++)
		{
			if(courseTrackArray[0][i+1] == courseName&&document.getElementById("no" +courseName)==null)
			{
				var credit = courseTrackArray[2][i+1];
				if(credit == null)
					credit = 3;
				//courseTrackArray[15][i+1] =1;
				courseChoseCount = courseChoseCount +1;
				courseChose[courseChoseCount] = courseName;
				
				//-----Add semester mark into courseChose array-----
				if(fallSemesterMark == false)
				{
					if(fall1Mark == true)
						courseChoseSemester[courseChoseCount] = 'fall1';
					else if (fall2Mark == true)
						courseChoseSemester[courseChoseCount] = 'fall2';
					else if (springMark == true)
						courseChoseSemester[courseChoseCount] = 'spring';
				}

				//-----Add this course into the list of course chose in the right hand side-----
				var result ="				<div id=\"no" +courseName +"\" class=\""+"div-column-ChosedCourse-No"+"\">"+courseChoseCount+"</div>";
				result +="				<div id=\"course"+courseName+"\" class=\""+"div-column-ChosedCourse-Course"+"\">"+courseName+"</div>";
				result +="				<div id=\"credit"+courseName+"\" class=\""+"div-column-ChosedCourse-Credits"+"\">"+credit+"</div>";									
				result +="				</div>";
				
				document.getElementById("CourseCredit").innerHTML = document.getElementById("CourseCredit").innerHTML + result;
				//-----Count totalcredit chose-----
				creditCount += parseInt(credit);
				//-----Calculate the amount of credit for each semester-----
				if(fallSemesterMark == false)
				{
					if(fall1Mark == true)
						creditFall1Count += parseInt(credit);
					else if(fall2Mark == true)
						creditFall2Count += parseInt(credit);
					else if(springMark == true)
						creditSpringCount += parseInt(credit);
				}
				
				if(document.getElementById("creditFall1CountProgress")!=null && document.getElementById("creditCountAnnouncement")!=null)
				{
					document.getElementById("creditFall1CountProgress").style.width = creditFall1Count + "%";
					document.getElementById("creditSpringCountProgress").style.width = creditSpringCount + "%";
					document.getElementById("creditFall2CountProgress").style.width = creditFall2Count + "%";
	
					document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
					if(creditFall1Count != 0)
					document.getElementById("creditFall1CountProgress").innerHTML = creditFall1Count;
					if(creditSpringCount != 0)
					document.getElementById("creditSpringCountProgress").innerHTML = creditSpringCount;
					if(creditFall2Count != 0)
					document.getElementById("creditFall2CountProgress").innerHTML = creditFall2Count;
					//-----Check if user's choice satisfy the Eurecom rule-----
					checkRuleEurecom();
					var string = "";
					string += "You had "+ languageCredits +" language credits, "+ projectCredits  +" project credits, "+ technicalChoosing + " technique and "+ nonTechnicalChoosing + " general credits.";
					if(technicalLack >0 && nonTechnicalLack>0)
						string += " You have to choose " + technicalLack + " technical credits and " + nonTechnicalLack + " general credits more."
					else
					{
						if(technicalLack > 0)
							string += " You have to choose " + technicalLack + " technical credits more.";
						else if(technicalLack == 0)
							string += " You chose enough technical credits.";
						else
							string += " You chose enough technical credits (with " + Math.abs(technicalLack ) +" credits of surplus).";
						
						if(nonTechnicalLack > 0)
							string += " You have to choose " + nonTechnicalLack + " general credits more.";
						else if(nonTechnicalLack == 0)
							string += " You chose enough general credits.";
						else
							string += " You chose enough general credits (with " + Math.abs(nonTechnicalLack) +" credits of surplus).";
					}
					document.getElementById("commentRuleEurecom").innerHTML = string;
					if(ruleFlag)
						document.getElementById("commentRuleEurecom").style.color = "blue";
					else
						document.getElementById("commentRuleEurecom").style.color = "red";
				}

			}
		}
		//------Sign the color on the calendar with the chose courses-----
		queryCourseTime(courseName,checkBoxName);

	}
	if(document.getElementById(checkBoxName) != null && document.getElementById(checkBoxName).checked==false)
	{
		queryCourseTimeDeselect(courseName, checkBoxName);
		if(document.getElementById("course"+courseName)!= null)
		{
			var creditEliminated = document.getElementById("credit"+courseName).innerHTML;
			var no = document.getElementById("no"+courseName);
			no.parentNode.removeChild(no);
			var course = document.getElementById("course"+courseName);
			course.parentNode.removeChild(course);
			var credit = document.getElementById("credit"+courseName);
			credit.parentNode.removeChild(credit);
			
			var courseRemoveIndex;
			for(var i = 1; i<courseChose.length; i++)
			{
				if(courseChose[i] == courseName)
					courseRemoveIndex = i;
			}
			for (var j = courseRemoveIndex; j<courseChoseCount; j++)
			{
				courseChose[j] = courseChose[j+1];
				courseChoseSemester[j] = courseChoseSemester[j+1];
				var cN = courseChose[j+1];
				document.getElementById("no"+cN).innerHTML = j;
			}
			if(courseRemoveIndex == courseChoseCount)
			{
				delete courseChose[courseRemoveIndex];
				delete courseChoseSemester[courseRemoveIndex];
			}
			courseChoseCount--;
			courseChose.length= courseChose.length-1;
			
			creditCount -= parseInt(creditEliminated);
			
			if(fall1Mark == true)
				creditFall1Count -= parseInt(creditEliminated);
			else if(fall2Mark == true)
				creditFall2Count -= parseInt(creditEliminated);
			else if(springMark == true)
				creditSpringCount -= parseInt(creditEliminated);

			document.getElementById("creditFall1CountProgress").style.width = creditFall1Count + "%";
			document.getElementById("creditSpringCountProgress").style.width = creditSpringCount + "%";
			document.getElementById("creditFall2CountProgress").style.width = creditFall2Count + "%";

			document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
			if(creditFall1Count != 0)
				document.getElementById("creditFall1CountProgress").innerHTML = creditFall1Count;
			if(creditSpringCount!= 0)
				document.getElementById("creditSpringCountProgress").innerHTML = creditSpringCount;
			if(creditFall2Count != 0)
				document.getElementById("creditFall2CountProgress").innerHTML = creditFall2Count;
			//-----Check if user's choice satisfy the Eurecom rule-----
			checkRuleEurecom();
			var string = "";
			string += "You had "+ languageCredits +" language credits, "+ projectCredits  +" project credits, "+ technicalChoosing + " technique and "+ nonTechnicalChoosing + " general credits.";
			if(technicalLack >0 && nonTechnicalLack>0)
				string += " You have to choose " + technicalLack + " technical credits and " + nonTechnicalLack + " general credits more."
			else
			{
				if(technicalLack > 0)
					string += " You have to choose " + technicalLack + " technical credits more.";
				else if(technicalLack == 0)
					string += " You chose enough technical credits.";
				else
					string += " You chose enough technical credits (with " + Math.abs(technicalLack ) +" credits of surplus).";
				
				if(nonTechnicalLack > 0)
					string += " You have to choose " + nonTechnicalLack + " general credits more.";
				else if(nonTechnicalLack == 0)
					string += " You chose enough general credits.";
				else
					string += " You chose enough general credits (with " + Math.abs(nonTechnicalLack) +" credits of surplus).";
			}
			document.getElementById("commentRuleEurecom").innerHTML = string;
			if(ruleFlag)
				document.getElementById("commentRuleEurecom").style.color = "blue";
			else
				document.getElementById("commentRuleEurecom").style.color = "red";
		}
	}
	
	//-----Check if the schedule is overlapped or not eveytime the user choose one course or give up one course-----
	checkSchedule();
	if(newCourseCheckSchedule == true)
	{
		var courseNameOverlappedString = "";
		for(var x = 0; x<courseNameOverlapped.length; x= x+2)
		{
			courseNameOverlappedString += courseNameOverlapped[x] + " and "+ courseNameOverlapped[x+1];
			if(courseNameOverlapped.length>2 && x<courseNameOverlapped.length-2)
				courseNameOverlappedString += ", ";
		}
		if(document.getElementById("commentScheduleOverlappedCheck") != null)
		{	
			document.getElementById("commentScheduleOverlappedCheck").style.color = "red";
			document.getElementById("commentScheduleOverlappedCheck").innerHTML = "Your schedule is overlapped, in courses " + courseNameOverlappedString + ". You can only choose one of these two courses. ";
		}
	}
	else
	{
		if(document.getElementById("commentScheduleOverlappedCheck") != null)
		{
			document.getElementById("commentScheduleOverlappedCheck").innerHTML = "";
		}
	}
	checkRuleGeneralCourse();
	if(ruleGeneralCourseFlag == false)
	{
		var commentGeneralCourse = "The number of general type in your choice is not enough. You have to choose " + generalCourseTypeNumber + " different types of general course (such as Business, Economic, Law).";		
		document.getElementById("commentGeneralCourseRule").innerHTML = commentGeneralCourse;
	}
	else
	{
		document.getElementById("commentGeneralCourseRule").innerHTML = "";		
	}
	
	//-----Check if the choice of users is satisfied all rule of Eurecom, the button Check Track will be displayed-----
	if(ruleFlag==true && newCourseCheckSchedule == false && ruleGeneralCourseFlag == true)
	{
		document.getElementById("checkTrackButton").disabled=false;
	}
	else
		document.getElementById("checkTrackButton").disabled=true;
		
	//-----check again every time the user choose course on edit choice page-----
	if(editChoiceMark && trackChoseStoreGetArray)
	{
		callCheckRuleEurecom();
		var comment = "";
		comment += "<Span class=\"italicRedText\"> You are choosing "+ trackChoseStoreGetArray[0] + " track, "
		if(mandatoryLack > 0)
			comment += "you lack of "+ mandatoryLack + " credits of mandatory courses and ";
		else if( mandatoryLack == 0)
			comment += "you chose enough mandatory courses and ";
		else
			comment += " enough credits (with " + Math.abs(mandatoryLack) +" credits of surplus) of optional courses and ";
		if(optionalLack > 0)
			comment += "you lack "+ optionalLack + " credits of optional courses!";
		else if(optionalLack == 0)
			comment += " enough credits of optional courses!";
		else
			comment += " enough credits (with " + Math.abs(optionalLack) +" credits of surplus) of optional courses!</Span>";
	
		document.getElementById("comment").innerHTML = comment;
		
	}
}

//----------Array variable to store the result of calculating about mandatory credits, optional credits, the amount of mandatory courses, optional courses that the user chose---------
var trackResultArray = new Array();
function initTrackResultArray()
{
	for(var i = 0; i<=7; i++)
		trackResultArray[i]= new Array();
	trackResultArray[1][0] = "MULTIMEDIA";
	trackResultArray[2][0] = "COMMUNICATION SYSTEM SECURITY";
	trackResultArray[3][0] = "TRANSMISSION TECHNOLOGIES";
	trackResultArray[4][0] = "WEB ENGINEERING";
	trackResultArray[5][0] = "MOBILE COMMUNICATIONS";
	trackResultArray[6][0] = "NETWORKING";
	trackResultArray[7][0] = "REAL-TIME AND EMBEDDED SYSTEMS";
	trackResultArray[0][1] = "Mandatory credits";
	trackResultArray[0][2] = "Optional credits";
	trackResultArray[0][3] = "Free credits";
	trackResultArray[0][4] = "Mandatory courses";
	trackResultArray[0][5] = "Optional courses";
	trackResultArray[0][6] = "Free courses";
	trackResultArray[0][7] = "Summary of amount of mandatory and optional courses";
	trackResultArray[0][8] = "The lack amount of mandatory credits";
	trackResultArray[0][9] = "The lack amount of optional credits";
}

//-----------This function is called to calculate the recommended track for user. Calculate all of values of the trackResultArray, display these information on the webpage and call the chooseTrack function to calculate the recommended track. ------------
function checkTrack(cTrack)
{
	//clearTimeout(myTime1);
	initTrackResultArray();
	for(var i = 0; i < courseTrackArray[0].length; i++)
		{
			courseTrackArray[15][i] = 0;
		}

	for(var i = 0; i < courseChoseStoreGetArray.length-1; i++)
	{
		for(var j = 0; j<courseTrackArray[0].length; j++)
		{
			if(courseTrackArray[0][j+1] == courseChoseStoreGetArray[i])
			{				
				courseTrackArray[15][j+1] =1;				
			}
		}
	}
	for(var k = 1; k<courseTrackArray.length-1; k=k+2)
	{
		var MCredits = 0;
		var OCredits = 0;
		var FCredits = 0;
		var MCourses = 0;
		var OCourses = 0;
		var FCourses = 0;
		for(var l = 1; l<courseTrackArray[k].length; l++)
		{
			if(courseTrackArray[15][l]==1)
			{
				if(courseTrackArray[k][l] == 1)
					MCourses ++;
				else if(courseTrackArray[k][l] == 2)
					OCourses ++;
				else if(courseTrackArray[k][l] == 3)
					FCourses ++;
				if(courseTrackArray[k][l] ==1)
				{
					var no = k +1;
					MCredits += parseInt(courseTrackArray[no][l]);
				}
				else if(courseTrackArray[k][l] ==2)
				{
					var no = k +1;
					OCredits += parseInt(courseTrackArray[no][l]);
				}
				else if(courseTrackArray[k][l] ==3)
				{
					var no = k +1;
					FCredits += parseInt(courseTrackArray[no][l]);
				}
			}
		}
		//trackResultArray[(k+1)/2]= new Array();
		trackResultArray [(k+1)/2][1] = MCredits;
		trackResultArray [(k+1)/2][2] = OCredits;
		trackResultArray [(k+1)/2][3] = FCredits;
		trackResultArray [(k+1)/2][4] = MCourses;
		trackResultArray [(k+1)/2][5] = OCourses;
		trackResultArray [(k+1)/2][6] = FCourses;
	}

	displayTableTrackResult("MUL", 1);
	displayTableTrackResult("COM", 2);
	displayTableTrackResult("TRAN", 3);
	displayTableTrackResult("WEB", 4);
	displayTableTrackResult("MOB", 5);
	displayTableTrackResult("NET", 6);
	displayTableTrackResult("REAL", 7);
	cTrack();
	colorizeResultTrack();
}

var myTime1;
var callCheckTrackFlag = false;
//---------- After page of recommended track page is loaded, call checkSessionStorage function to get list of course chose and display----------
function callCheckTrack()
{
	if(callCheckTrackFlag == true)
	{
		clearInterval(myTime1);
	}
	else
	{
		if(/*techniqueList == false || nonTechniqueList == false ||*/ courseInformationLoad == false || courseTrackArrayLoad == false || getSessionFlag == false)
			myTime1 = setInterval(callCheckTrack, 500);//5000
		else
		{	
			//clearTimeout(myTime1);
			clearInterval(myTime1);
			checkTrack(chooseTrack_CreditLack);
			displayRecommendedTrackText();
			//clearTimeout(myTime1);
			callCheckTrackFlag = true;
		}
	}	
}


//-----------Display the calculate results for users according to each track ------------
function displayTableTrackResult(trackName, trackOrder)
{
		document.getElementById(trackName + "_MCredits").innerHTML=trackResultArray[trackOrder][1];
		document.getElementById(trackName + "_OCredits").innerHTML=trackResultArray[trackOrder][2];
		document.getElementById(trackName + "_FCredits").innerHTML=trackResultArray[trackOrder][3];
		document.getElementById(trackName + "_MCourses").innerHTML=trackResultArray[trackOrder][4];
		document.getElementById(trackName + "_OCourses").innerHTML=trackResultArray[trackOrder][5];
		document.getElementById(trackName + "_FCourses").innerHTML=trackResultArray[trackOrder][6];
		document.getElementById(trackName + "_MCredits").style.color = "maroon";
		document.getElementById(trackName + "_MCredits").style.fontWeight = "bold";
		document.getElementById(trackName + "_OCredits").style.color = "maroon";
		document.getElementById(trackName + "_OCredits").style.fontWeight = "bold";

		document.getElementById(trackName + "_MCourses").style.color = "maroon";
		document.getElementById(trackName + "_MCourses").style.fontWeight = "bold";
		document.getElementById(trackName + "_OCourses").style.color = "maroon";
		document.getElementById(trackName + "_OCourses").style.fontWeight = "bold";

}

//-----------Array variable to store the recommended tracks after calculate, store the index of track according to the index of trackResultArray----------
var trackChoseArray = new Array();
function chooseTrack()
{
	trackChoseArray = new Array();

	var largestSumCourse = 0;
	for (var i = 1; i<=7; i++)
	{
		trackResultArray[i][7] = trackResultArray[i][4] + trackResultArray[i][5];		
	}
	largestSumCourse = 1;
	var count = 0;
	trackChoseArray[count] = largestSumCourse;
	for (var j = 2; j<=7; j++)
	{
		if(trackResultArray[j][7] > trackResultArray[largestSumCourse][7])
		{
			largestSumCourse = j;
			trackChoseArray[count] = largestSumCourse;
		}
		else if(trackResultArray[j][7] == trackResultArray[largestSumCourse ][7])
		{
			if(trackResultArray[j][1]>trackResultArray[largestSumCourse][1])
			{
				largestSumCourse = j;
				trackChoseArray[count] = largestSumCourse;
			}
			else if(trackResultArray[j][1]==trackResultArray[largestSumCourse][1])
			{
				count++;
				largestSumCourse = trackResultArray[j][0];
				trackChoseArray[count] = largestSumCourse;
			}
		}
	}
	//-----Check and add all of track that has more the number of mandatory credits------
	for(var l=1; l<=7; l++)
	{
		if(trackResultArray[l][1] > trackResultArray[trackChoseArray[0]][1])
		{
			count++;
			trackChoseArray[count] = l;
		}
	}
	//-----Colorize the list of course the user chose (on the right hand of the web page) according to the recommended track-------
	colorizeChoseList(trackResultArray[trackChoseArray[0]][0]);
	//***-----Add comments-----
	addComments(trackResultArray[trackChoseArray[0]][0]);
	
}

//-----Chose track by calculate the lack number of mandatory and optional credits------
function chooseTrack_CreditLack()
{
	trackChoseArray = new Array();

	var largestSumCourse = 0;
	for (var i = 1; i<=7; i++)
	{
		trackResultArray[i][7] = trackResultArray[i][4] +trackResultArray[i][5];
		//Storing mandatory credits is lacked and optional credits is lacked
		trackResultArray[i][8] = mandatoryCredits - trackResultArray[i][1];
		trackResultArray[i][9] = optionalCredits - trackResultArray[i][2];
	}
	largestSumCourse = 1;
	var count = 0;
	trackChoseArray[count] = largestSumCourse;
	for (var j = 2; j<=7; j++)
	{
		var lackCredits = trackResultArray[j][8] + trackResultArray[j][9];
		if( trackResultArray[j][9] <0)
			lackCredits = trackResultArray[j][8] + 0;
		var oplastlackC = trackResultArray[largestSumCourse][9];
		if(trackResultArray[largestSumCourse][9]<0)
			oplastlackC = 0;
		if(lackCredits <= trackResultArray[largestSumCourse][8] + oplastlackC)
		{
			largestSumCourse = j;
			trackChoseArray[count] = largestSumCourse;
		}
	}
	//------Add the other track with the result is equal with the track has just chosen-------
	for (var j = 1; j<=7; j++)
	{
		var existFlag = false;
		for(var m = 0; m<trackChoseArray.length; m++)
		{
			if(j == trackChoseArray[m])
			{
				existFlag = true;
				break;
			}
		}
		if(existFlag == false)
		{
			var lackCredits = trackResultArray[j][8] + trackResultArray[j][9];
			if( trackResultArray[j][9] <0)
				lackCredits = trackResultArray[j][8] + 0;
			var oplastlackC = trackResultArray[largestSumCourse][9];
			if(trackResultArray[largestSumCourse][9]<0)
				oplastlackC = 0;
			if(lackCredits == trackResultArray[largestSumCourse][8] + oplastlackC)
			{
				count++;
				largestSumCourse = j;
				trackChoseArray[count] = largestSumCourse;
			}
		}
	
	}

	//-----Colorize the list of course the user chose (on the right hand of the web page) according to the recommended track-------
	colorizeChoseList(trackResultArray[trackChoseArray[0]][0]);
	addComments(trackResultArray[trackChoseArray[0]][0]);
}

var commentR = "";
//----------Display recommended track in the text to announce--------
function displayRecommendedTrackText()
{
	var text = "";
	for(var i = 0; i<trackChoseArray.length; i++)
	{
		text += " or " + trackResultArray[trackChoseArray[i]][0];
		document.getElementById("recommendedTrackText").innerHTML = text;
		//------Add the needed thing that user have to do
		addAdvices(trackResultArray[trackChoseArray[i]][0]);
	}
	document.getElementById("advice").innerHTML = commentR;

}

//----------Show the comments under the information table of each track in order for the user know which is needed to change from their choice.------------
function addAdvices(trackName)
{
	var index = 0;
	for(var i = 1; i<=7; i++)
		if(trackResultArray[i][0] == trackName)
		{
			index = i;
			break;
		}
	var lackMan = mandatoryCredits - trackResultArray[i][1];
	var lackOpt = optionalCredits - trackResultArray[i][2];
	
	if(lackMan >0)
	{
		commentR += "<Span class=\"italicRedText\">With "+ trackName +" track, you have to choose "+ lackMan + " credits of mandatory courses more";
		if(lackOpt > 0)
			commentR += " and "+ lackOpt + " credits of optional courses more!</span>";
			else
			commentR += ".</span>";
	}
	else if(lackMan < 0 && lackOpt >0)
	{
		commentR += "<Span class=\"italicRedText\">With "+ trackName +" track, you have to choose "+ lackOpt + " credits of optional courses more";		
	}
	else if(lackMan <0 && lackOpt <0)
	{
		commentR += "<Span class=\"italicRedText\">With "+ trackName +" track, you choose enough credits for both mandatory and optional courses!";
		document.getElementById("advice").style.color = "#0000CC";
	}
}

//----------Show the comments under the information table of each track in order for the user know which is needed to change from their choice.------------
function addComments(trackName)
{
	var index = 0;
	for(var i = 1; i<=7; i++)
		if(trackResultArray[i][0] == trackName)
		{
			index = i;
			break;
		}
	var lackMan = mandatoryCredits - trackResultArray[i][1];
	var lackOpt = optionalCredits - trackResultArray[i][2];
	var comment = "<br/><Span class=\"italicRedText\">Comments: </Span>";
	comment += "You are choosing "+ trackName + " track. With this track, you lack of "+ lackMan + " credits of mandatory courses and ";
	if(lackOpt > 0)
		comment += lackOpt + " credits of optional courses!";
	else if(lackOpt == 0)
		comment += " enough credits of optional courses!";
	else
		comment += " enough credits (with " + Math.abs(lackOpt) +" credits of surplus) of optional courses!";
	document.getElementById("comment").innerHTML = comment;
	//-----Set the variable for webstorage for the edit choice page-----
	trackInformationStorage ="";
	trackInformationStorage += trackName + "," + lackMan + "," + lackOpt;
}


//-----------Browse all recommended tracks on the trackChoseArray to colorize in order to the user can see----------
function colorizeResultTrack()
{
	for(var i = 0; i < trackChoseArray.length; i++)
	{
		var trackName = trackResultArray[trackChoseArray[i]][0];
		if(document.getElementById(trackName) != null)
			document.getElementById(trackName).style.backgroundColor = "#CC99FF";
	}
}

//------------Pop-up window contains information of each course (name, teacher name, teacher department, teacher image), is called when mouve over on the name of course in the list------------
function openWin(courseName, event)
{  
	var des;
	var teacherFirstName;
	var teacherLastName;
	var teacherDepartment;
	var teacherImage;
	for(var i = 0; i<courseInformationArray.length;i++)
	{
		if(courseInformationArray[i][0] == courseName)
		{
			des = courseInformationArray[i][2];
			teacherFirstName = courseInformationArray[i][3];
			teacherLastName = courseInformationArray[i][4];
			teacherDepartment = courseInformationArray[i][6];
			teacherImage = courseInformationArray[i][5];
			continue;
		}
	}
	result = "<div class=\"italictext\">Name of course: </div><div class=\"boldtext\">" + courseName + "</div><div class=\"italictext\">Teacher: </div>" + teacherFirstName + " " + teacherLastName + "<br/> <div class=\"italictext\">Department of teacher: </div>" + teacherDepartment;
	document.getElementById("teacherInformation").innerHTML = result;
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.id = "imid";

	if(teacherImage != "")
	{
		
		imageObj.onload = function()
		{
    	    context.drawImage(imageObj, 2, 2, 78, 100);
    	};
      	imageObj.src = "../TrackPicker/images/teacher_files/" + teacherImage;
      	//imageObj.src = "http://intranet.eurecom.fr:9090/resources/common/public/people/pictures/" + teacherImage;
     }
     else
    {   	
		 context.clearRect(2, 2, canvas.width, canvas.height);
    }
    
	document.getElementById("courseDetails").style.visibility="visible";
  
	var x=event.clientX;
	var y=event.clientY;
	var clientHeight = document.documentElement.clientHeight;
	document.getElementById("courseDetails").style.left = x+"px";
	document.getElementById("courseDetails").style.top = y+"px";
	if(clientHeight - y < 100)
		document.getElementById("courseDetails").style.top = y -100+"px";
	//-----Course's description-----
	document.getElementById("courseDes").innerHTML = "Course: <div class=\"boldtext\">"+ courseName +"</div>"+ des;
	if(des !="")	
		document.getElementById("courseDes").style.visibility="visible";
} 

//----------The pop-up window about information of each course will be hidden when mouse out of the course name------------
function closeWin()
{
	document.getElementById("courseDetails").style.visibility="hidden";
	document.getElementById("courseDes").innerHTML="";
	document.getElementById("courseDes").style.visibility="hidden";
}

var courseChoseScroll;
//------------This function is called in order to update the position for the list of course on the right hand of the webpage ----------
function callCourseChoseScroll(event)
{
	courseChoseScroll=setInterval(courseChoseScroll, 10);
}

//------------This function is called when mouse over on the web page in order to update the position for the list of course on the right hand of the webpage ----------
//------Need to edit to call this function automatically according to time-------
function courseChoseScroll(event)
{
	var scrollPosition = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	if( scrollPosition == 0)
	{
		document.getElementById("courseChosedBorder").style.top = "150px";
	}
	else if(scrollPosition <=100)
		document.getElementById("courseChosedBorder").style.top = scrollPosition/2 +"px";// chua ro tai sao chia 2
	else
		document.getElementById("courseChosedBorder").style.top = "0px";

}

//------Colorize the track that user chose to see the comment on the track result table -----
function colorizeClickTrackTable(trackName)
{
	
		//-----Make all of track on the table return with default color-----
		var trackNameArray = new Array("MULTIMEDIA", "COMMUNICATION SYSTEM SECURITY", "TRANSMISSION TECHNOLOGIES", "WEB ENGINEERING", "MOBILE COMMUNICATIONS", "NETWORKING", "REAL-TIME AND EMBEDDED SYSTEMS");
		for(var i = 0; i<trackNameArray.length; i++)
			if(document.getElementById(trackNameArray[i]) != null)
			{
				document.getElementById(trackNameArray[i]).style.backgroundColor ="";
			}
		//------Color the track that the user have just click----	
		if(document.getElementById(trackName) != null)
			document.getElementById(trackName).style.backgroundColor ="#ECC6FF";
		//-----Color the recommended track again------
		//colorizeResultTrack();
	
}

//-----Colorize the list of course the user chose (on the right hand of the web page) according to the recommended track-------
function colorizeChoseList(trackName)
{
	//------Colorize the track that user chose to see the comment on the track result table -----
	colorizeClickTrackTable(trackName);

	document.getElementById("trackNameCourseChose").innerHTML = trackName;
	//-----Set all of course background to the default color (background)-----
	for( var k = 0; k<courseChoseStoreGetArray.length-1; k++)
	{	
		if(	document.getElementById("no"+courseChoseStoreGetArray[k]) != null)
		{
			document.getElementById("no"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
			document.getElementById("course"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
			document.getElementById("credit"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
			
			document.getElementById("no"+courseChoseStoreGetArray[k]).style.color ="black";
			document.getElementById("course"+courseChoseStoreGetArray[k]).style.color ="black";
			document.getElementById("credit"+courseChoseStoreGetArray[k]).style.color ="black";
		}

	}
	//------Get the index of track in the courseTrackArray ------
	var n;
	for (var m = 0; m < courseTrackArray.length; m++)
	{
		if (courseTrackArray[m][0] == trackName)
		{
			n = m;
			break;
		}
	}
	for(var i = 0; i<courseTrackArray[0].length; i++)
	{
		var courseName = courseTrackArray[0][i];
		if(document.getElementById("course"+courseName) != null)
		{			
			if(courseTrackArray[n][i] == 1)
			{
				if(document.getElementById("no"+courseName) != null)
				{
					document.getElementById("no"+courseName).style.backgroundColor ="#FF3300";
					document.getElementById("course"+courseName).style.backgroundColor ="#FF3300";
					document.getElementById("credit"+courseName).style.backgroundColor ="#FF3300";
				}

			}
			else if(courseTrackArray[n][i] == 2)
			{
				if(document.getElementById("no"+courseName) != null)
				{
					document.getElementById("no"+courseName).style.backgroundColor ="#CC9900";
					document.getElementById("course"+courseName).style.backgroundColor ="#CC9900";
					document.getElementById("credit"+courseName).style.backgroundColor ="#CC9900";
				}
			}
			else if(courseTrackArray[n][i] == 3)
			{
				if(document.getElementById("no"+courseName) != null)
				{
					document.getElementById("no"+courseName).style.backgroundColor ="#E7FD9B";
					document.getElementById("course"+courseName).style.backgroundColor ="#E7FD9B";
					document.getElementById("credit"+courseName).style.backgroundColor ="#E7FD9B";
				}
			}
		}
	}
}

//----------Edit choice page---------
//----------Make the list of technical course of Fall semester (on the left hand) of edit choice page----------
function listTechnicalCourseFall()
{

	techniqueList= true;

	var result = " <table class="+ "border_table" + ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_editChoice"+ ">Course</td> <td class="+ "border_row_header_editChoice"+ ">Credits</td> <td class="+ "border_row_header_editChoice"+ ">Choose</td></tr>";

	for(var i =0; i<courseInformationArray.length; i++)
	{
		var courseName = courseInformationArray[i][0];
		var semester = courseInformationArray[i][1];
		var semesterDisplay = semester;
		var courseType = courseInformationArray[i][7];
		var courseCredits = 0;
		var checkBoxName = courseName + "-Checkbox";

		//-----Check if it is a technical course or not --------
		if(courseType == "http://data.eurecom.fr/ontology/reve#TechnicalCourse" && semester.indexOf("Fall") != -1)
		{
			if(semester.search("Fall") != -1)
				semesterDisplay = "Fall";
			else if(semester.search("Spring") != -1)
				semesterDisplay = "Spring";
			 result += " <tr id =\""+courseName+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_editChoice"+ "\"" + " draggable=\"true\" ondragstart=\"drag(event)\" onmousemove="+"\"openWin(\'"+courseName+"\', event);  \"" + " onmouseout="+"\"closeWin(); \" style=\"cursor:move;\">" + courseName;
		  result += "</td><td id=\""+ courseName + "Credits\" class="+ "border_row_editChoice"+ ">" + courseCredits;
		  result += " </td><td class="+ "border_row_editChoice"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
		  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+courseName +"\', \'"+checkBoxName+"\'); \"";
		  result += "></form>";
	
		  result += " </td></tr>"; 
	  }
	}
	document.getElementById("technicalCourseSemesterFall").innerHTML = result;
}

//----------Make the list of course (on the left hand) of edit choice page - Spring tab----------
function listTechnicalCourseSpring()
{

	techniqueList= true;

	var result = " <table class="+ "border_table" + ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_editChoice"+ ">Course</td> <td class="+ "border_row_header_editChoice"+ ">Credits</td> <td class="+ "border_row_header_editChoice"+ ">Choose</td></tr>";

	for(var i =0; i<courseInformationArray.length; i++)
	{
		var courseName = courseInformationArray[i][0];
		var semester = courseInformationArray[i][1];
		var semesterDisplay = semester;
		var courseType = courseInformationArray[i][7];

		var courseCredits = 0;
		var checkBoxName = courseName + "-Checkbox";

		//-----Check if it is a technical course or not --------
		if(courseType == "http://data.eurecom.fr/ontology/reve#TechnicalCourse" && semester.indexOf("Spring") != -1)
		{
			if(semester.search("Fall") != -1)
				semesterDisplay = "Fall";
			else if(semester.search("Spring") != -1)
				semesterDisplay = "Spring";
			 result += " <tr id =\""+courseName+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_editChoice"+ "\"" + " draggable=\"true\" ondragstart=\"drag(event)\" onmousemove="+"\"openWin(\'"+courseName+"\', event);  \"" + " onmouseout="+"\"closeWin(); \" style=\"cursor:move;\" >" + courseName;
		  result += "</td><td id=\""+ courseName + "Credits\" class="+ "border_row_editChoice"+ ">" + courseCredits;
		  result += " </td><td class="+ "border_row_editChoice"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
		  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+courseName +"\', \'"+checkBoxName+"\'); \"";
		  result += "></form>";
	
		  result += " </td></tr>"; 
	  }
	}
	document.getElementById("technicalCourseSemesterSpring").innerHTML = result;
}

//----------Edit choice page---------
//----------Make the list of non-technical course of Fall semester (on the left hand) of edit choice page----------
function listNonTechnicalCourseFall()
{

	techniqueList= true;

	var result = " <table class="+ "border_table" + ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_editChoice"+ ">Course</td> <td class="+ "border_row_header_editChoice"+ ">Credits</td> <td class="+ "border_row_header_editChoice"+ ">Choose</td></tr>";

	for(var i =0; i<courseInformationArray.length; i++)
	{
		var courseName = courseInformationArray[i][0];
		var semester = courseInformationArray[i][1];
		var semesterDisplay = semester;
		var courseType = courseInformationArray[i][7];
		var courseCredits = 0;
		var checkBoxName = courseName + "-Checkbox";

		//-----Check if it is a technical course or not --------
		if(courseType == "http://data.eurecom.fr/ontology/reve#GeneralCourse" && semester.indexOf("Fall") != -1)
		{
			if(semester.search("Fall") != -1)
				semesterDisplay = "Fall";
			else if(semester.search("Spring") != -1)
				semesterDisplay = "Spring";
			 result += " <tr id =\""+courseName+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_editChoice"+ "\"" + " draggable=\"true\" ondragstart=\"drag(event)\" onmousemove="+"\"openWin(\'"+courseName+"\', event);  \"" + " onmouseout="+"\"closeWin(); \" style=\"cursor:move;\">" + courseName;
			result += "</td><td id=\""+ courseName + "Credits\" class="+ "border_row_editChoice"+ ">" + courseCredits;
			result += " </td><td class="+ "border_row_editChoice"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
			result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+courseName +"\', \'"+checkBoxName+"\'); \"";
			result += "></form>";
			
			result += " </td></tr>"; 
	  }
	}
	document.getElementById("nonTechnicalCourseSemesterFall").innerHTML = result;
}

//----------Edit choice page---------
//----------Make the list of non-technical course of spring semester (on the left hand) of edit choice page----------
function listNonTechnicalCourseSpring()
{

	techniqueList= true;

	var result = " <table class="+ "border_table" + ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header_editChoice"+ ">Course</td> <td class="+ "border_row_header_editChoice"+ ">Credits</td> <td class="+ "border_row_header_editChoice"+ ">Choose</td></tr>";

	for(var i =0; i<courseInformationArray.length; i++)
	{
		var courseName = courseInformationArray[i][0];
		var semester = courseInformationArray[i][1];
		var semesterDisplay = semester;
		var courseType = courseInformationArray[i][7];
		var courseCredits = 0;
		var checkBoxName = courseName + "-Checkbox";

		//-----Check if it is a technical course or not --------
		if(courseType == "http://data.eurecom.fr/ontology/reve#GeneralCourse" && semester.indexOf("Spring") != -1)
		{
			if(semester.search("Fall") != -1)
				semesterDisplay = "Fall";
			else if(semester.search("Spring") != -1)
				semesterDisplay = "Spring";
			 result += " <tr id =\""+courseName+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row_editChoice"+ "\"" + " draggable=\"true\" ondragstart=\"drag(event)\" onmousemove="+"\"openWin(\'"+courseName+"\', event);  \"" + " onmouseout="+"\"closeWin(); \" style=\"cursor:move;\">" + courseName;
		  result += "</td><td id=\""+ courseName + "Credits\" class="+ "border_row_editChoice"+ ">" + courseCredits;
		  result += " </td><td class="+ "border_row_editChoice"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
		  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+courseName +"\', \'"+checkBoxName+"\'); \"";
		  result += "></form>";
	
		  result += " </td></tr>"; 
	  }
	}
	document.getElementById("nonTechnicalCourseSemesterSpring").innerHTML = result;
}

//-----Edit choice page-----
function addCreditCourseList()
{
	for(var i =0; i<courseInformationArray.length; i++)
	{
		var courseName = courseInformationArray[i][0];
				
		var courseCredits = 0;
		var checkBoxName = courseName + "-Checkbox";
		for(var k =0; k<courseTrackArray[0].length; k++)
		{
			if(courseTrackArray[0][k+1] == courseName)
				for(var l = 1; l<15; l=l+2)
				{
					if(trackChoseStoreGetArray[0] == courseTrackArray[l][0])
						courseCredits = courseTrackArray[l+1][k+1];
				}
		}
		if(document.getElementById(courseName + "Credits") != null)
			document.getElementById(courseName + "Credits").innerHTML = courseCredits;

		
	}
}

//-----Edit choice page-----
//-----Colorize the list of course (on the  left hand of the web page) according to the recommended track-------
function colorizeChoseListEditChoice(trackName)
{
	//------Get the index of track in the courseTrackArray ------
	var n;
	for (var m = 0; m < courseTrackArray.length; m++)
	{
		if (courseTrackArray[m][0] == trackName)
		{
			n = m;
			break;
		}
	}
	for(var i = 0; i<courseTrackArray[0].length; i++)
	{
		var courseName = courseTrackArray[0][i];
		if(document.getElementById(courseName) != null)
		{			
			if(courseTrackArray[n][i] == 1)
			{
				document.getElementById(courseName).style.backgroundColor ="#FF3300";
				document.getElementById(courseName).style.color ="white";
			}
			else if(courseTrackArray[n][i] == 2)
			{
				document.getElementById(courseName).style.backgroundColor ="#CC9900";
			
			}
			else if(courseTrackArray[n][i] == 3)
			{
				document.getElementById(courseName).style.backgroundColor ="#E7FD9B";
			}
		}
	}
}

//----------Display the content of rule of Eurecom or not----------
function changeDisplayRuleOfEurecom()
{
	if(document.getElementById('ruleOfEurecom').style.display=='block')
	document.getElementById('ruleOfEurecom').style.display='none';
	else
	document.getElementById('ruleOfEurecom').style.display='block';
}

//----------Dislay the table of statistical result of track or not----------
function changeDisplayTrackTable()
{
	if(document.getElementById('trackTable').style.display=='inline')
	{
		document.getElementById('trackTable').style.display='none';
		document.getElementById('showDetailsClick').innerHTML='Show details of the result';
		//----When user hide the details, we will return the recommended track to user edit their choice-----
		
		
		addComments(trackResultArray[trackChoseArray[0]][0]);
		colorizeChoseList(trackResultArray[trackChoseArray[0]][0]);
	}
	else
	{
		document.getElementById('trackTable').style.display='inline';
		document.getElementById('showDetailsClick').innerHTML='Hide details of the result';
	}
}

//----------Edit choice page----- Change tab of each semester of the schedule----------
function changeTabSchedule(idTabName, idScheduleName)
{
	document.getElementById('scheduleFall1').style.display='none';
	document.getElementById('scheduleFall2').style.display='none';
	document.getElementById('scheduleSpring').style.display='none';
	document.getElementById(idScheduleName).style.display='block';
	
	document.getElementById('semesterTabFall1').style.fontWeight='normal';
	document.getElementById('semesterTabSpring').style.fontWeight='normal';
	document.getElementById('semesterTabFall2').style.fontWeight='normal';
	document.getElementById(idTabName).style.fontWeight='bold';
	
	if(idTabName == 'fall1PageMark' || idTabName == 'semesterTabFall1')
	{
		fall1PageMark();
		recheckSchedule();
	}
	else if(idTabName == 'fall2PageMark' || idTabName == 'semesterTabFall2')
	{	
		fall2PageMark();
		recheckSchedule();
	}
	else if(idTabName == 'springPageMark' || idTabName == 'semesterTabSpring')
	{
		springPageMark();
		recheckSchedule();
	}
	if(idTabName == 'semesterTabFall1' || idTabName == 'semesterTabFall2')
		changeTabListCourse('listCourseSemesterTabFall','listFall');
	else
		changeTabListCourse('listCourseSemesterTabSpring','listSpring');

}

//----------Semester page----- Change schedule according to each semester----------
function changeSemester(idSemester, idbutton)
{
	document.getElementById('fall1Semester').style.display='none';
	document.getElementById('springSemester').style.display='none';
	document.getElementById('fall2Semester').style.display='none';
	document.getElementById(idSemester).style.display='block';
	
	document.getElementById('fall1Button').style.fontWeight='normal';
	document.getElementById('springButton').style.fontWeight='normal';
	document.getElementById('fall2Button').style.fontWeight='normal';
	document.getElementById(idbutton).style.fontWeight='bold';
	
	if(idSemester == 'fall1Semester')
	{
		fall1PageMark();
	}
	else if(idSemester == 'springSemester')
	{	
		springPageMark();
	}
	else if(idSemester == 'fall2Semester')
	{
		fall2PageMark();
	}
}
var callRecheckScheduleSemesterPageTime;
var callRecheckScheduleSemesterPageFlag = false;

function setFalseRecheckScheduleSemesterPageFlag()
{
	callRecheckScheduleSemesterPageFlag = false;
}

function callRecheckScheduleSemesterPage()
{
	if(callRecheckScheduleSemesterPageFlag == true)
	{
		clearInterval(callRecheckScheduleSemesterPageTime);
	}
	else
	{
		if(techniqueList == false || nonTechniqueList == false ||courseDepartmentFlag == false)
			callRecheckScheduleSemesterPageTime= setInterval(callRecheckScheduleSemesterPage, 500);//5000
		else
		{
			clearInterval(callRecheckScheduleSemesterPageTime);
			recheckScheduleSemesterPage();
			checkTheCalendar();
			checkCheckTrackButton();
			callRecheckScheduleSemesterPageFlag = true;
		}
	}

}
//-------Semester page--- check whether the check track button display or not-----
function checkCheckTrackButton()
{
	if(ruleFlag==true && newCourseCheckSchedule == false)
	{
		document.getElementById("checkTrackButton").disabled=false;
	}
	else
		document.getElementById("checkTrackButton").disabled=true;
}

//----------Function to check schedule again for the semester page when change semester ----------
function recheckScheduleSemesterPage()
{
	for(var i = 0; i<courseChose.length; i++)
	{
		var checkboxName = 	courseChose[i] + "-Checkbox";	
		if(document.getElementById(checkboxName)!=null)
			document.getElementById(checkboxName).checked = true;

	}
}


//-----Edit choice page-----
function checkCourseChoseEditChoicePage()
{
	for(var m = 0; m< courseChose.length; m ++)
	{
		for(var i =0; i<courseInformationArray.length; i++)
		{
			var courseName = courseInformationArray[i][0];
			var checkBoxName = courseName + "-Checkbox";
			if(courseName == courseChose[m])
			{
				document.getElementById(checkBoxName).checked = true;
			}	
		}
	}
}

//----------Edit choice page----- Change tab of each semester of list of courses (the left hand side)----------
function changeTabListCourse(idTabName, idScheduleName)
{
	document.getElementById('listFall').style.display='none';
	document.getElementById('listSpring').style.display='none';
	document.getElementById('listSpring1').style.display='none';
	document.getElementById('listFall1').style.display='none';

	
	document.getElementById('listCourseSemesterTabFall').style.fontWeight='normal';
	document.getElementById('listCourseSemesterTabSpring').style.fontWeight='normal';
	document.getElementById(idTabName).style.fontWeight='bold';
	
	document.getElementById(idScheduleName).style.display='block';
	if(idScheduleName == "listSpring" || idScheduleName == "listSpring1")
	{
		document.getElementById(idScheduleName+"1").style.display='block';
		document.getElementById('listFall1').style.display='none';
	}
	if(idScheduleName == "listFall" || idScheduleName == "listFall1")
	{
		document.getElementById(idScheduleName+"1").style.display='block';
		document.getElementById('listSpring').style.display='none';
	}


	listTechnicalCourseSpring();
	listTechnicalCourseFall();
	listNonTechnicalCourseFall();
	listNonTechnicalCourseSpring();
	colorizeChoseListEditChoice(trackChoseStoreGetArray[0]);
	addCreditCourseList();
	checkCourseChoseEditChoicePage();
	if(idTabName == 'listCourseSemesterTabSpring' && springMark == false)
		changeTabSchedule('semesterTabSpring', 'scheduleSpring');
	else if(fall1Mark != true  && fall2Mark != true && idTabName == 'listCourseSemesterTabFall')
		changeTabSchedule('semesterTabFall1', 'scheduleFall1');

}

//----------Function to check schedule again for the edit choice page when change tab of schedule ----------
function recheckSchedule()
{
	for(var i = 0; i<courseChose.length; i++)
	{
		var checkboxName = 	courseChose[i] + "-Checkbox";	
			courseChoseCheck(checkboxName);

	}
}

//---------Set the variable for marking which semester the user are working----------
function defaultSemesterMark()
{
	fall1Mark = false;
	fall2Mark = false;
	springMark = false;	
}

function fall1PageMark()
{
	fall1Mark = true;
	fall2Mark = false;
	springMark = false;
}

function fall2PageMark()
{
	fall1Mark = false;
	fall2Mark = true;
	springMark = false;
}

function springPageMark()
{
	fall1Mark = false;
	fall2Mark = false;
	springMark = true;
}

//----------Set the variable for marking the edit choice page are working----------
function editChoiceMarkTrue()
{
	editChoiceMark = true;
}

function editChoiceMarkFalse()
{
	editChoiceMark = false;
}

//----------Drag and drop-----
function allowDrop(ev)
{
	ev.preventDefault();
}

function drag(ev)
{
	ev.dataTransfer.setData("Text", ev.target.innerHTML);
}

function drop(ev)
{
	ev.preventDefault();
	var data = ev.dataTransfer.getData("Text") + "-Checkbox";
	document.getElementById(data).checked = true;
	courseChoseCheck(data);
}

//---------Set the percentage for the credit count bar---------
function setPercentageCreditCountBar()
{
	document.getElementById("creditFall1CountProgress").style.width= creditFall1Count;
	document.getElementById("creditSpringCountProgress").style.width= creditSpringCount;
	document.getElementById("creditFall2CountProgress").style.width= creditFall2Count;
}

//----------Internship page---------
var statisticInternshipCompanyPercentage = new Array();

var yearInternship = new Array();
var yearInternshipFlag = false;

var companyInternshipList = new Array();
var companyInternshipFlag = false;

var internshipInformationTime;
function callInternshipInformation()
{
	if(yearInternshipFlag == false)
		internshipInformationTime = setInterval(callInternshipInformation, 500);
	else
	{
		queryInternshipInformation();
		window.clearInterval(internshipInformationTime);
	}
}

var internshipInformationLoad = false;
var myTimeInternship; 
var internshipDepartmentAmount = new Array();
function initInternshipDepartment()
{
	internshipDepartmentAmount[0] = new Array();
	internshipDepartmentAmount[0][0] = 'Year';
	internshipDepartmentAmount[0][1] = 'Multimedia';
	internshipDepartmentAmount[0][2] = 'Mobile Communications';
	internshipDepartmentAmount[0][3] ='Networking and Security';
	for(var i = 0; i<yearInternship.length; i++)
	{
		internshipDepartmentAmount[i+1] = new Array();
		internshipDepartmentAmount[i+1][0] = yearInternship[i];
		internshipDepartmentAmount[i+1][1] = 0;
		internshipDepartmentAmount[i+1][2] = 0;
		internshipDepartmentAmount[i+1][3] = 0;
	}
}

function drawChart()
{
        var data = google.visualization.arrayToDataTable(internshipDepartmentAmount);
        var options = {title: 'The number of internship offers according to department', hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}};
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
}


//----------Query list of year that has internship offer to store in array variable-----------
function queryYearInternship()
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT DISTINCT ?semester FROM <http://data.eurecom.fr/reve> WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester}} ORDER BY ?semester"; 
	//var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT DISTINCT ?semester WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester}} ORDER BY ?semester"; 
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackYearInternship, true);
	yearInternshipFlag = true;
}

//----------Callback list  of year that has internship offer to store in array variable-----------
function callbackYearInternship(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	var year = "";
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var semester = jsonObj.results.bindings[i].semester.value;;
		var flag = -1;
		var temp = semester.split("",4);
		year = temp[0]+temp[1] +temp[2] +temp[3];
		if(yearInternship.length == 0)
			yearInternship[0] = year;
		else
		{	
			for( var j = 0; j <yearInternship.length; j++)
			{
				if(semester.indexOf(yearInternship[j]) != -1)
				{
					flag = j;
					break;
				}
			}
			if(flag != -1)
				yearInternship[flag] = year;
			else
				yearInternship[yearInternship.length] = year;
		}
	}
}

//----------Query list of company that has internship offer to store in array variable-----------
function queryCompanyInternship()
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX SKOS:<http://www.w3.org/2004/02/skos/core.html#> SELECT ?companyName (COUNT(?companyName) as ?count) FROM <http://data.eurecom.fr/reve> WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isEmploymentOf ?company. ?company SKOS:prefLabel ?companyName}} GROUP BY ?companyName ORDER BY ?companyName"; 
	
	//var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX SKOS:<http://www.w3.org/2004/02/skos/core.html#> SELECT ?companyName (COUNT(?companyName) as ?count) WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isEmploymentOf ?company. ?company SKOS:prefLabel ?companyName}} GROUP BY ?companyName ORDER BY ?companyName"; 
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCompanyInternship, true);
	companyInternshipFlag = true;
}

//----------Callback list  of company that has internship offer to store in array variable-----------
function callbackCompanyInternship(str)
{
	companyInternshipList = new Array();
	companyInternshipList[0]= new Array();
	companyInternshipList[0][0]= "Company";
	companyInternshipList[0][1]= "Offer amount";

		// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		companyInternshipList[i+1]= new Array();
		var company = jsonObj.results.bindings[i].companyName.value;
		var count = jsonObj.results.bindings[i].count.value;

		companyInternshipList[i+1][0] = company;
		companyInternshipList[i+1][1] = parseInt(count);		
	}
	
	drawCompanyInternshipChart();
}

var companyInternshipTime;
function callDrawCompanyInternshipChart()
{
	if(companyInternshipFlag == false || yearInternshipFlag ==false)
		companyInternshipTime= setInterval(callDrawCompanyInternshipChart, 500);
	else
	{
		drawCompanyInternshipChart();
		window.clearInterval(companyInternshipTime);
	}
}


function drawCompanyInternshipChart()
{
    var data = google.visualization.arrayToDataTable(companyInternshipList);
    var options = {
      title: 'The number of internship offers according to company'
    };

    var chart = new google.visualization.PieChart(document.getElementById('companyChart_div'));
    chart.draw(data, options);
}

//----------Query list of year that has internship offer to store in array variable-----------
function queryYearInternshipCombobox()
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT DISTINCT ?semester FROM <http://data.eurecom.fr/reve> WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester}} ORDER BY ?semester"; 
	//var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT DISTINCT ?semester WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester}} ORDER BY ?semester"; 
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackYearInternshipCombobox, true);
}

//----------Callback list  of year that has internship offer to store in array variable-----------
function callbackYearInternshipCombobox(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	var year = "";
	var result = "";
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var semester = jsonObj.results.bindings[i].semester.value;;
		var flag = -1;
		var temp = semester.split("",4);
		year = temp[0]+temp[1] +temp[2] +temp[3];
		result += "<option>"+ year +"</option>";
	}
	document.getElementById("yearSelectForCompanyInternshipChart").innerHTML = result;
}
var yearInternshipComboboxTime;
function callsetDataYearInternshipCombobox()
{
	if(yearInternshipFlag == false)
		yearInternshipComboboxTime = setInterval(callsetDataYearInternshipCombobox, 500);
	else
	{
		setDataYearInternshipCombobox();
		window.clearInterval(yearInternshipComboboxTime);
	}
}

function callCompanyInternshipInYear()
{
	var e =document.getElementById('yearSelectForCompanyInternshipChart');
	var string = e.options[e.selectedIndex].value;
	if(string == 'All years')
		queryCompanyInternship();
	else
		queryCompanyInternshipInYear(string);
	
}
//----------Query list of company that has internship offer to store in array variable-----------
function queryCompanyInternshipInYear(year)
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX SKOS:<http://www.w3.org/2004/02/skos/core.html#> SELECT ?companyName ?semester (COUNT(?companyName) as ?count) FROM <http://data.eurecom.fr/reve> WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isEmploymentOf ?company. ?company SKOS:prefLabel ?companyName} {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester} FILTER regex(?semester, \"^"+year+"\")} GROUP BY ?companyName ?semester ORDER BY ?companyName";
	
	//var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX SKOS:<http://www.w3.org/2004/02/skos/core.html#> SELECT ?companyName ?semester (COUNT(?companyName) as ?count) WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isEmploymentOf ?company. ?company SKOS:prefLabel ?companyName} {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester} FILTER regex(?semester, \"^"+year+"\")} GROUP BY ?companyName ?semester ORDER BY ?companyName";
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCompanyInternshipInYear, true);
}

//----------Callback list  of company that has internship offer to store in array variable-----------
function callbackCompanyInternshipInYear(str)
{
	companyInternshipList = new Array();
	companyInternshipList[0]= new Array();
	companyInternshipList[0][0]= "Company";
	companyInternshipList[0][1]= "Offer amount";

		// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);

	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		companyInternshipList[i+1]= new Array();
		var company = jsonObj.results.bindings[i].companyName.value;
		var count = jsonObj.results.bindings[i].count.value;

		companyInternshipList[i+1][0] = company;
		companyInternshipList[i+1][1] = parseInt(count);		
	}
	
	drawCompanyInternshipChart();
}

function setDataYearInternshipCombobox()
{
	var result = "<option>All years</option>";
	for( var i =0; i<yearInternship.length; i++)
	{
		result += "<option>"+ yearInternship[i] +"</option>";
	}
	document.getElementById("yearSelectForCompanyInternshipChart").innerHTML = result;

}

//----------Query internship information-----------
function queryInternshipInformation()
{
	var endpoint = endpointRepository;
	var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX reve:<http://data.eurecom.fr/ontology/reve#> PREFIX TIME:<http://www.w3.org/2006/time#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX SKOS:<http://www.w3.org/2004/02/skos/core.html#> PREFIX PART:<http://purl.org/vocab/participation/schema#> SELECT ?internshipTitle ?companyName ?firstName ?lastName ?image ?department ?semester ?begindate ?enddate FROM <http://data.eurecom.fr/reve> WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isEmploymentOf ?company. ?company SKOS:prefLabel ?companyName} OPTIONAL{?internship LODE:atTime ?interval. ?interval TIME:hasBeginning ?begindateNode. ?begindateNode TIME:inXSDDateTime ?begindate. ?interval TIME:hasEnd ?enddateNode. ?enddateNode TIME:inXSDDateTime ?enddate} OPTIONAL {?internship REVE:hasSupervisor ?supervisor. ?supervisor FOAF:firstName ?firstName. ?supervisor FOAF:family_name ?lastName. ?supervisor FOAF:img ?image. ?supervisor PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department} {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester}}"; 
	//var query = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX reve:<http://data.eurecom.fr/ontology/reve#> PREFIX TIME:<http://www.w3.org/2006/time#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX SKOS:<http://www.w3.org/2004/02/skos/core.html#> PREFIX PART:<http://purl.org/vocab/participation/schema#> SELECT ?internshipTitle ?companyName ?firstName ?lastName ?image ?department ?semester ?begindate ?enddate WHERE {{ ?internship rdf:type REVE:InternshipOffer. ?internship rdfs:label ?internshipTitle } {?internship REVE:isEmploymentOf ?company. ?company SKOS:prefLabel ?companyName} OPTIONAL{?internship LODE:atTime ?interval. ?interval TIME:hasBeginning ?begindateNode. ?begindateNode TIME:inXSDDateTime ?begindate. ?interval TIME:hasEnd ?enddateNode. ?enddateNode TIME:inXSDDateTime ?enddate} OPTIONAL {?internship REVE:hasSupervisor ?supervisor. ?supervisor FOAF:firstName ?firstName. ?supervisor FOAF:family_name ?lastName. ?supervisor FOAF:img ?image. ?supervisor PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department} {?internship REVE:isAvailableAt ?semesterID. ?semesterID rdfs:label ?semester}}"; 
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackInternshipInformation, true);	
}

//----------Callback list internship page-----------
function callbackInternshipInformation(str)
{
	initInternshipDepartment();
	
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	// Build up a table of results.
	var result = "";
	var resultArray = new Array();
	for(var k = yearInternship.length -1; k>=0; k--)
	{
		resultArray[k] = "<div class=\"paragraph_titleInternship\">These are internship offers in " + yearInternship[k] +"</div>";	
	}
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var internshipName = "";
		var companyName = "";
		var beginDate = "";
		var endDate ="";
		var teacherName = "";
		var semester = "";
		var image ="";
		var department = "";
		if(jsonObj.results.bindings[i].internshipTitle != null)
			internshipName = jsonObj.results.bindings[i].internshipTitle.value;
		if(jsonObj.results.bindings[i].companyName != null)
			companyName = jsonObj.results.bindings[i].companyName.value;
		if(jsonObj.results.bindings[i].begindate != null)
			beginDate = jsonObj.results.bindings[i].begindate.value;
		if(jsonObj.results.bindings[i].enddate !=null)
			endDate = jsonObj.results.bindings[i].enddate.value;
		if(jsonObj.results.bindings[i].firstName !=null && jsonObj.results.bindings[i].lastName !=null)
			teacherName = jsonObj.results.bindings[i].firstName.value + " "+ jsonObj.results.bindings[i].lastName.value;
		if(jsonObj.results.bindings[i].semester !=null)
			semester = jsonObj.results.bindings[i].semester.value;
		if(jsonObj.results.bindings[i].image !=null)
		{
			image = jsonObj.results.bindings[i].image.value;
			var imageObj =  "../TrackPicker/images/teacher_files/" + image;
		}
		if(jsonObj.results.bindings[i].department !=null)
			department = jsonObj.results.bindings[i].department.value;
	
		//-----Count the internship offer according to the department to draw the fisrt chart-----
	
		var temp = semester.split("",4);
		var year = temp[0]+temp[1] +temp[2] +temp[3];
		var test = internshipDepartmentAmount.length;
	
		for(var j = 1; j< internshipDepartmentAmount.length; j++)
		{
			if(semester.indexOf(internshipDepartmentAmount[j][0])!= -1)
			{
				if(department.indexOf('Multimedia')!= -1)
					internshipDepartmentAmount[j][1]++;
				if(department.indexOf('Mobile Communications')!= -1)
					internshipDepartmentAmount[j][2]++;
				if(department.indexOf('Networking and Security')!= -1)
					internshipDepartmentAmount[j][3]++;
				break;
			}
		}
	
		var indexYear = -1;
		for(var l = 0; l<yearInternship.length; l++)
		{
			if(semester.indexOf(yearInternship[l]) != -1)
			{	
				resultArray[l] += " <div id=\""+companyName+ i +"\" class=\"internshipNamePlus\" onclick=\"changeDisplayDetailsInternship(\'"+companyName + i +"\');\">" + internshipName + "</li></div>";
				resultArray[l] += "<div id=\""+companyName + i +"Details\" class=\"internshipBlock\">";
				resultArray[l] += "<div class=\"detailsInternshipOffer\"> Company: " + companyName + "</div>";
				resultArray[l]+= "<div class=\"detailsInternshipOffer\"> Beginning date: " + beginDate + "</div>";
				resultArray[l] += "<div class=\"detailsInternshipOffer\"> Ending date: " + endDate + "</div>";
				resultArray[l] += "<div class=\"detailsInternshipOffer\"> Semester: " + semester + "</div>";
				resultArray[l] += "<div class=\"detailsInternshipOffer\"> Supervisor: " + teacherName + "</div>";
				resultArray[l] += "</div>";
			}
		}		
	}
	for(var m = yearInternship.length -1 ; m>=0; m--)
	{
		result += resultArray[m];
	}
	
	document.getElementById("internshipInformation").innerHTML = result;
	internshipInformationLoad = true;
	drawChart();
}


function changeDisplayDetailsInternship(id)
{
	var c = document.getElementById(id+"Details").style.display;
	if(document.getElementById(id+"Details").style.display=='none' || document.getElementById(id+"Details").style.display=="")
	{
		document.getElementById(id+"Details").style.display='block';
		document.getElementById(id).className = 'internshipNameMinus';
	}
	else
	{
		document.getElementById(id+"Details").style.display='none';
		document.getElementById(id).className = 'internshipNamePlus';
	}

}

//----------Function to get list of course chose form web storage for the internship page----------
function checkSessionStorageInternship()
{
	courseChoseStoreGet = sessionStorage.getItem("courseChoseKey");
	courseChoseSemesterStoreGet = sessionStorage.getItem("courseChoseSemesterKey");
	courseChoseStore = courseChoseStoreGet;
	courseChoseSemesterStore = courseChoseSemesterStoreGet;
}

//----------Query type of General course-----------
function queryGeneralCourseType()
{
	var endpoint = endpointRepository;
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT ?code (SAMPLE(?teacher) AS ?teacher) (SAMPLE(?type) AS ?type) WHERE{{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {?course rdf:type ?type} {?type rdf:type REVE:GeneralCourse}} GROUP BY ?code ORDER BY ?code"; 
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackGeneralCourseType, true);	
}

var generalCourseTypeArray = new Array();
function callbackGeneralCourseType(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	// Build up a table of results.
	var co = jsonObj.results.bindings[i].code.value;
	var type = jsonObj.results.bindings[i].code.value;
	generalCourseTypeArray[0] = new Array();
	generalCourseTypeArray[1] = new Array();
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		generalCourseTypeArray[0][i] = co;
		generalCourseTypeArray[1][i] = type;
	}
}

var ruleGeneralCourseFlag = false;
var generalCourseTypeChose = new Array();
var courseTypeOneCourse = "";
//-----------Query type of General course according to one course ----------
function queryGeneralCourseTypeOneCourse(courseName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.0";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT ?code ?type ?teacher WHERE{{ ?course AIISO:code ?code. ?course AIISO:code \'"+courseName+"\'. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {?course rdf:type ?type} {?type rdf:type REVE:GeneralCourse}}"; 
	
	// Make the query.
	sparqlQueryJsonSynchronous(query, endpoint, callbackGeneralCourseTypeOneCourse, true);	
}

function callbackGeneralCourseTypeOneCourse(str)
{
	courseTypeOneCourse = "";
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
	var co = "";
	var type ="";
	// Build up a table of results.
	if(jsonObj.results.bindings.length >0)
	{
		co = jsonObj.results.bindings[0].code.value;
		type = jsonObj.results.bindings[0].type.value;
	}
	courseTypeOneCourse = type;
}

function checkRuleGeneralCourse()
{
	var indexGeneralCourseArray = 0;
	var numberOfGeneralCourseType = 0;
	generalCourseTypeChose = new Array();
	for(var i = 1; i<courseChose.length; i++)
	{
		queryGeneralCourseTypeOneCourse(courseChose[i]);
		if(courseTypeOneCourse != "")
		{
			var typeFlag = false;
			for(var k = 0; k<generalCourseTypeChose.length; k++)
			{
				if(generalCourseTypeChose[k] == courseTypeOneCourse)
				{
					typeFlag = true;
					break;
				}
					
			}
			if(typeFlag == false)
			{
				generalCourseTypeChose[indexGeneralCourseArray] = courseTypeOneCourse;
				indexGeneralCourseArray++;
			}
		}
	}
	if(generalCourseTypeChose.length >= generalCourseTypeNumber)
		ruleGeneralCourseFlag = true;
	else
		ruleGeneralCourseFlag = false;
}

