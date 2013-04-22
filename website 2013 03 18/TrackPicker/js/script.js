var allCredits = 90;
var technicalCredits = 60;
var mandatoryCredits = 25;
var optionalCredits = 18;
var nonTechnicalCredits = 12;
var languageCredits = 6;
var creditCount =0;
var defaultColor = "#FFFFFF";

//-----Variable to store information of each course (name, semester, description, teacher name, teacher department)-----
var courseInformationArray = new Array();
//-----Variable to store information about type of course (mandatory, optional or free) and the amount of credits of each course depend on each track-----
var courseTrackArray = new Array();
//-----Variable to store the list of course that the user choose-----
var courseChose = new Array();
var courseTechnicalFallArray = new Array();

//-----Variable to check state of page load-----
var techniqueList = false;
var nonTechniqueList = false;
var courseInformationLoad = false;
var courseTrackArrayLoad = false;

//var courseChoseStringCookie = "";

/*function init()
{
	initCourseTrackArray();
	queryCourseInformationAddArray();
	queryCourseDepartment();
	checkSessionStorage();
}*/
/*window.onload = function()
{
	checkSessionStorage();
}*/
/*document.onreadystatechange = function() {
   if (this.readyState === "complete"){
      checkSessionStorage();
   }
};*/
function sparqlQueryJson(queryStr, endpoint, callback, isDebug)
{
	var querypart = "query=" + escape(queryStr);
	//alert(querypart);
	//var endpoint = endpoint + "?query=" +escape(queryStr);
	/*var params = { queryLn: "SPARQL",limit: "none", infer: "true"}; 
	for(var k in params) {
		querypart+=k+"="+encodeURIComponent(params[k])+"&";
	}*/
	
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
	//xmlhttp.setRequestHeader("queryLn", "SPARQL");
	//xmlhttp.send(params);

	// Set up callback to get the response asynchronously.
	//xmlhttp.send(querypart);
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			if(xmlhttp.status == 200)
			{
				//alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
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
	//alert(querypart);
	xmlhttp.send(querypart);
	
	// Done; now just wait for the callback to be called.
};

//-----read data and store in courseTrack Array include information about mandatory or option or free course of each course according to each track, and credits of each courses according to each track-----
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

function sparqlQueryJsonCourseTrackArray(queryStr, endpoint, callback, index, isDebug)
//function sparqlQueryJsonCourseTrackArray(queryStr, endpoint, callback, isDebug)
{
	var querypart = "query=" + escape(queryStr);
	//alert(querypart);
	
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
	//xmlhttp.setRequestHeader("queryLn", "SPARQL");
	//xmlhttp.send(params);

	// Set up callback to get the response asynchronously.
	//xmlhttp.send(querypart);
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
				//callback(xmlhttp.responseText);
			} else
				{
					// Some kind of error occurred.
					alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
				}
		}
	};
	// Send the query to the endpoint.
	//alert(querypart);
	xmlhttp.send(querypart);
	
	// Done; now just wait for the callback to be called.
};

//-----Query type of course and amount of credits of each course according to each track-----
function queryCourseTrackAddArray(trackName, index)
//function queryCourseTrackAddArray(trackName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?course ?typeCourse ?credit ?trackID WHERE {{?code AIISO:code ?course. ?code rdf:type REVE:Course} OPTIONAL {?code ?typeCourse  ?trackID. ?trackID rdf:type REVE:Track. ?trackID rdfs:label \""+ trackName +"\"@en} OPTIONAL {?cCFT REVE:isCreditForCourse ?code. ?cCFT REVE:hasCredit ?credit. ?cCFT REVE:hasTrack ?trackID. ?trackID rdfs:label \"" + trackName+ "\"@en }} ORDER BY ?course";
	
	// Make the query.
	sparqlQueryJsonCourseTrackArray(query, endpoint, callbackCourseTrackAddArray, index, true);
	//sparqlQueryJsonCourseTrackArray(query, endpoint, callbackCourseTrackAddArray, true);

}

//----- Callback function to add type of course and amount of credits to courseTrackArray ------
function callbackCourseTrackAddArray(str, index)
//function callbackCourseTrackAddArray(str)
{
	//var index = 0;
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);
	
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
	//checkSessionStorage();
}

//-----Query all of course's name to add to courseTrackArray -----
function queryCourseName()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT  ?code WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseName, true);
}

//-----Callback function to add all of courses' name to courseTrackArray-----
function callbackCourseName(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		courseTrackArray[0][i+1] = co;		
	}
}

//-----Query information of each course (course's name, semester, description, teacher's name, teacher's image, teacher's department) to add into the courseInformationArray-----
function queryCourseInformationAddArray()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX PART:<http://purl.org/vocab/participation/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX DC:<http://purl.org/dc/terms/> SELECT ?code (SAMPLE (?semester) AS ?semester) (SAMPLE (?des) AS ?des) (SAMPLE (?teacherFirstName) AS ?teacherFirstName) (SAMPLE (?teacherLastName) AS ?teacherLastName) (SAMPLE (?teacherImage) AS ?teacherImage) (SAMPLE (?department) AS ?department) WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course} OPTIONAL {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}} {?course AIISO:responsibilityOf ?teacherID} {?teacherID FOAF:firstName ?teacherFirstName} {?teacherID FOAF:family_name ?teacherLastName} OPTIONAL {?teacherID FOAF:img ?teacherImage} OPTIONAL {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department} OPTIONAL {?course DC:description ?des}} GROUP BY ?code ORDER BY ?code";
	
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
	}
	courseInformationLoad= true;
}

//----------Query technical list for home page-----------
function queryTechnicalCourseTeacher()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacher, true);
}
//----------Callback technical list for home page-----------
function callbackTechnicalCourseTeacher(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Teacher</td> </tr>";
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);

	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		courseTechnicalFallArray[i] = co;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event);  \"" + " onmouseout="+"\"closeWin(); \">" + jsonObj.results.bindings[i].code.value;

	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  result += "</form>";
	  result += " </td></tr>"; 

	}
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("technicalCourseTeacher").innerHTML = result;
	//initCourseTrackArray();
	techniqueList= true;
}

//----------Query technical list for Fall page---------
function queryTechnicalCourseTeacherFall()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) (SAMPLE (?semester) AS ?semester)  WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"fall\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacherFallSpring, true);

}
//----------Query technical list for Spring page---------
function queryTechnicalCourseTeacherSpring()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) (SAMPLE (?semester) AS ?semester)  WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"spring\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacherFallSpring, true);

}

//----------Callback technical list for fall and Spring page----------
function callbackTechnicalCourseTeacherFallSpring(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Teacher</td> <td class="+ "border_row_header"+ ">Choose</td></tr>";
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);

	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		var checkBoxName = co + "-Checkbox";//+i;
		courseTechnicalFallArray[i] = co;
		//result += " <tr> <td>" + jsonObj.results.bindings[i].course.value;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event); queryCourseTimeMouseMove(\'"+co+ "\'); \"" + " onmouseout="+"\"closeWin(); queryCourseTimeDeselect(\'"+co+"\', \'"+ checkBoxName+"\'); \">" + jsonObj.results.bindings[i].code.value;
	 
	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	  //result +=" onclick= \"queryCourseCredits(\'"+co+"\', \'"+checkBoxName+"\');" + " \"";
	  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";
	  result += "></form>";
	  result += " </td></tr>"; 
//colorizeCourse(co);
	}
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("technicalCourseTeacher").innerHTML = result;
	//initCourseTrackArray();	
	//useCookie();
	//checkSessionStorage();
	techniqueList= true;
}

//----------Query non technical list for home page-----------
function queryNonTechnicalCourseTeacher()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacher, true);
}

//----------Callback non technical list for home page-----------
function callbackNonTechnicalCourseTeacher(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Teacher</td></tr>";
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event);\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	 /* var checkBoxName = co + "-Checkbox"+i;
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	   result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";*/

	  result += "</form>";
	  result += " </td></tr>"; 
	}
	
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("nonTechnicalCourseTeacher").innerHTML = result;	
	//initCourseTrackArray();
	nonTechniqueList = true;
}
//----------Query non technical list for Fall page-----------
function queryNonTechnicalCourseTeacherFall()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) (SAMPLE (?semester) AS ?semester)  WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"fall\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacherFallSpring, true);
}

//----------Query non technical list for Spring page-----------
function queryNonTechnicalCourseTeacherSpring()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) (SAMPLE (?semester) AS ?semester)  WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"spring\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacherFallSpring, true);
}

//----------Callback non technical list for Fall and Spring page-----------
function callbackNonTechnicalCourseTeacherFallSpring(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Teacher</td> <td class="+ "border_row_header"+ ">Choose</td></tr>";
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		var checkBoxName = co + "-Checkbox";//+i;
		//result += " <tr> <td>" + jsonObj.results.bindings[i].course.value;
	  //result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event);\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event); queryCourseTimeMouseMove(\'"+co+ "\'); \"" + " onmouseout="+"\"closeWin(); queryCourseTimeDeselect(\'"+co+"\', \'"+checkBoxName+"\'); \">" + jsonObj.results.bindings[i].code.value;

	  //result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"> <div" + " onmouseover="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[i].code.value; + "</div>";
	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	  //result +=" onclick= \"queryCourseCredits(\'"+co+"\', \'"+checkBoxName+"\');" + " \"";
	   result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";
	  result += "></form>";
	  result += " </td></tr>"; 
	}
	
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("nonTechnicalCourseTeacher").innerHTML = result;	
	//initCourseTrackArray();
	nonTechniqueList = true;
}

//----------Query language course list-----------
function queryLanguageCourseTeacher()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:LanguageCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackLanguageCourseTeacher, true);
}

//----------Callback function to to display language course list----------
function callbackLanguageCourseTeacher(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	var result = " <table class="+ "border_table" /*border='2' cellpadding='9'*/+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Teacher</td> <td class="+ "border_row_header"+ ">Choose</td></tr>";
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);
	
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		var co = jsonObj.results.bindings[i].code.value;
		//result += " <tr> <td>" + jsonObj.results.bindings[i].course.value;
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\', event);\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  //result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"> <div" + " onmouseover="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[i].code.value; + "</div>";
	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  var checkBoxName = co + "-Checkbox"+i;
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	  //result +=" onclick= \"queryCourseCredits(\'"+co+"\', \'"+checkBoxName+"\'); queryCourseTime(\'"+ co + "\');\"";
	  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";
	  result += "></form>";
	  result += " </td></tr>"; 
	}
	
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("languageCourseTeacher").innerHTML = result;	
	//initCourseTrackArray();
}

function queryCourseCredits_queryCourseTime(co, checkBoxName)
{
	//queryCourseCredits(co, checkBoxName);
	courseChoseCheck(checkBoxName);
	queryCourseTime(co,checkBoxName);
}

//-----------Query teacher's department of each course to colorize list of courses----- After, change this colorizing method to get data from courseInformationArray----------
function queryCourseDepartment()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX DC:<http://purl.org/dc/terms/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX PART:<http://purl.org/vocab/participation/schema#> SELECT ?code ?department WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course AIISO:responsibilityOf ?teacherID} {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department}}";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseDepartment, true);
	//checkSessionStorage();
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
				document.getElementById(courseName).style.backgroundColor= "#FFCCFF";//"#FF9966";
			if(dep == "Mobile Communications" && document.getElementById(courseName) != null)
				document.getElementById(courseName).style.backgroundColor= "#FFFF99";//"#FCD88B";//"#FF66FF";
			if(dep == "Multimedia Communications" && document.getElementById(courseName) != null)
				document.getElementById(courseName).style.backgroundColor= "#99FF33";//"#CCFF33";
		}
	}
}

//-----------Query the schedule of course ----------
function queryCourseTimeMouseMove(courseName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE WHERE {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseTime, true);
}

//-----------Query the schedule of course ----------
function queryCourseTime(courseName,checkBoxName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE WHERE {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	if(document.getElementById(checkBoxName).checked==true)//can phai xem lai dieu kien nay khi re chuot vao thi no hien ra
		sparqlQueryJson(query, endpoint, callbackCourseTime,true);
}

//-----------Sign on the calendar by color according to the schedule of course that is chose or mouse over----------
function callbackCourseTime(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
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
			//document.getElementById(idTimeB).style.backgroundColor = "#FFFF66";
			var color = document.getElementById(courseName).style.backgroundColor;
			if (color == "")
				color = "#CCCCFF";
			document.getElementById(idTimeB).style.backgroundColor = color;
			
			var dateE = new Date(detailDayTimeE[0],detailDayTimeE[1]-1,detailDayTimeE[2]);
			var dayE = dateE.getDay();
			var idTimeE = dayE + detailHourTimeE[0] + detailHourTimeE[1];

			var minute = parseInt(detailHourTimeB[1]);
			var increaseTimeB = idTimeB;
			var hour = parseInt(detailHourTimeB[0]);
			
			//var increaseTimeBInt = parseInt(increaseTimeB);
			//var idTimeEInt = parseInt(idTimeE);
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
					//document.getElementById(increaseTimeB).style.backgroundColor = "#FFFF66";
					document.getElementById(increaseTimeB).style.backgroundColor = color;
			}
			result += "<div style= \"float:left\">"+timeB+" &nbsp &nbsp &nbsp &nbsp </div> ";
			result += "<div style= \"float:left\">"+timeE+"</div></br>";
		}
	}
	result += "</div>";
	//document.getElementById("timeCourse").innerHTML = result;

	//var d = new Date('2013','02','28');
	//var n = d.getDay();
	//document.getElementById("test").innerHTML = n;
}

//-----------Query the schedule of course ----------
function queryCourseTimeDeselect(courseName, checkBoxName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?timeB ?timeE WHERE {{ ?course AIISO:code '"+ courseName+ "'. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session}OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	if(document.getElementById(checkBoxName).checked==false)
		sparqlQueryJson(query, endpoint, callbackCourseTimeDeselect, true);
}

//------------Give up the color sign on the calendar when the course is deselected-----------
function callbackCourseTimeDeselect(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
	var result = "<div>";
	for(var i = 0; i<  jsonObj.results.bindings.length; i++)
	{
		if(jsonObj.results.bindings[i].course.value != null && jsonObj.results.bindings[i].timeB.value != null && jsonObj.results.bindings[i].timeE.value != null)
		{
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
			document.getElementById(idTimeB).style.backgroundColor = defaultColor;
			
			var dateE = new Date(detailDayTimeE[0],detailDayTimeE[1]-1,detailDayTimeE[2]);
			var dayE = dateE.getDay();
			var idTimeE = dayE + detailHourTimeE[0] + detailHourTimeE[1];

			var minute = parseInt(detailHourTimeB[1]);
			var increaseTimeB = idTimeB;
			var hour = parseInt(detailHourTimeB[0]);
			
			//var increaseTimeBInt = parseInt(increaseTimeB);
			//var idTimeEInt = parseInt(idTimeE);
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
					document.getElementById(increaseTimeB).style.backgroundColor = defaultColor;
			}
			result += "<div style= \"float:left\">"+timeB+" &nbsp &nbsp &nbsp &nbsp </div> ";
			result += "<div style= \"float:left\">"+timeE+"</div></br>";
		}
	}
	result += "</div>";
	//document.getElementById("timeCourse").innerHTML = result;
	checkTheCalendar();
	//var d = new Date('2013','02','28');
	//var n = d.getDay();
	//document.getElementById("test").innerHTML = n;

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

//---------- After page of edit choices is loaded, call checkSessionStorage function to get list of course chose and display----------
function getSessionStorageEditChoice()
{
	if(/*techniqueList == false || */nonTechniqueList == false || courseInformationLoad == false || courseTrackArrayLoad == false)
		myTime = setInterval(getSessionStorageEditChoice, 1000);
	else
	{
	listTechnicalCourse();
		checkSessionStorage();
		checkTrackInformationSessionStorage();
		colorizeChoseListEditChoice(trackChoseStoreGetArray[0]);
		clearTimeout(myTime);
	}
}
var trackChoseStoreGet;
var trackChoseStoreGetArray;
//----------Get information of chose track to show for user on the edit choice page ----------
function checkTrackInformationSessionStorage()
{
	trackChoseStoreGet = sessionStorage.getItem("trackInformation");
	trackChoseStoreGetArray = trackChoseStoreGet.split(",");

	//var lackMan = mandatoryCredits - trackResultArray[i][1];
	//var lackOpt = optionalCredits - trackResultArray[i][2];
	var lackOpt = trackChoseStoreGetArray[2];
	var comment = "";//"<br/><Span class=\"italicRedText\">Comments: </Span>";
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
//---------- After page is loaded, call checkSessionStorage function to get list of course chose and display----------
function getSessionStorage()
{
	if(techniqueList == false || nonTechniqueList == false || courseInformationLoad == false || courseTrackArrayLoad == false)
		myTime = setInterval(getSessionStorage, 1000);
	else
	{
		checkSessionStorage();
		clearTimeout(myTime);
	}
}

//----------Variable to store the list of course that the user choose----------
var courseChoseStore = "";
//----------Browse in courseChose array to store into courseChoseStore to use in webstorage----------
function setSessionStorage()
{
	for(var i = 1; i < courseChose.length; i++)
	{
		courseChoseStore += courseChose[i] + ",";
	}
	sessionStorage.setItem("courseChoseKey", courseChoseStore);
}

//----------Variable to get list of course chose form web storage----------
var courseChoseStoreGet = "";
var courseChoseStoreGetArray = new Array();
//----------Function to get list of course chose form web storage and display on list of course chose----------
function checkSessionStorage()
{
	//setSessionStorage();//phai gan lai cho nay ben cho unload moi page
	courseChoseStoreGet = sessionStorage.getItem("courseChoseKey");
	//initCourseTrackArray();
	if(courseChoseStoreGet != null)
	{
		courseChoseStoreGetArray = courseChoseStoreGet.split(",");
		for(var i =0; i<courseChoseStoreGetArray.length; i++)
		{
			if(courseChoseStoreGetArray[i] != "")
				{
					var checkboxName = 	courseChoseStoreGetArray[i] + "-Checkbox";	
					if(document.getElementById(checkboxName)!= null)
					{
						document.getElementById(checkboxName).checked = true;	
							
						courseChoseCheck(checkboxName);
					}
					else
					{
						//courseChoseCount = courseChoseCount +1;
						//courseChose[courseChoseCount] = courseChoseStoreGetArray[i];
						var courseName = courseChoseStoreGetArray[i];
						for(var j = 0; j<courseTrackArray[0].length; j++)
						{
							if(courseTrackArray[0][j+1] == courseName&&document.getElementById("no" +courseName)==null)
							{
								var credit = courseTrackArray[2][j+1];
								if(credit == null)
									credit = 3;
								courseTrackArray[15][j+1] =1;
								courseChoseCount = courseChoseCount +1;
								courseChose[courseChoseCount] = courseName;				
								var result ="				<div id=\"no" +courseName +"\" class=\""+"div-column-ChosedCourse-No"+"\">"+courseChoseCount+"</div>";
								result +="				<div id=\"course"+courseName+"\" class=\""+"div-column-ChosedCourse-Course"+"\">"+courseName+"</div>";
								result +="				<div id=\"credit"+courseName+"\" class=\""+"div-column-ChosedCourse-Credits"+"\">"+credit+"</div>";									
								result +="				</div>";
								
								document.getElementById("CourseCredit").innerHTML = document.getElementById("CourseCredit").innerHTML + result;
								creditCount += parseInt(credit);
								if(document.getElementById("creditCountProgress")!=null && document.getElementById("creditCountAnnouncement")!=null)
								{
									document.getElementById("creditCountProgress").style.width = creditCount + "%";
									document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
								}
								break;
							}
						}

					}
				}
		}
	}
}

//-----------Variable to store the amount of credits that the users chose----------
var courseChoseCount = 0;
//-----------Every time the checkbox of each course in the list is checked, the course will be add to the list of chose course (at the right hand of the web page) and count the amount of credits. On the contrary, the checkbox is deselected, the course will be moved out of the list of chose course and minus from the amount of credits----------
function courseChoseCheck(checkBoxName)
{
	var checkBoxNameSplit = checkBoxName.split("-");
	var courseName = checkBoxNameSplit[0];
	if(document.getElementById(checkBoxName).checked==true)
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
				var result ="				<div id=\"no" +courseName +"\" class=\""+"div-column-ChosedCourse-No"+"\">"+courseChoseCount+"</div>";
				result +="				<div id=\"course"+courseName+"\" class=\""+"div-column-ChosedCourse-Course"+"\">"+courseName+"</div>";
				result +="				<div id=\"credit"+courseName+"\" class=\""+"div-column-ChosedCourse-Credits"+"\">"+credit+"</div>";									
				result +="				</div>";
				
				document.getElementById("CourseCredit").innerHTML = document.getElementById("CourseCredit").innerHTML + result;
				creditCount += parseInt(credit);
				document.getElementById("creditCountProgress").style.width = creditCount + "%";
				document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
			}
		}
		//------Sign the color on the calendar with the chose courses-----
		queryCourseTime(courseName,checkBoxName);

	}
	if(document.getElementById(checkBoxName).checked==false)
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
			//document.getElementById("CourseCredit").removeChild("course"+courseName);
			
			creditCount -= parseInt(creditEliminated);
			document.getElementById("creditCountProgress").style.width = creditCount + "%";
			document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
		}
		var courseRemoveIndex;
		for(var i = 1; i<courseChose.length; i++)
		{
			if(courseChose[i] == courseName)
				courseRemoveIndex = i;
		}
		for (var j = courseRemoveIndex; j<courseChoseCount; j++)
		{
			courseChose[j] = courseChose[j+1];
			var cN = courseChose[j+1];
			document.getElementById("no"+cN).innerHTML = j;
		}
		if(courseRemoveIndex == courseChoseCount)
			delete courseChose[courseRemoveIndex];
		courseChoseCount--;		
	}
	if(creditCount >= 9)
	{
		document.getElementById("checkTrackButton").disabled=false;
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

//-----------Display the calculate results for users according to each track ------------
function displayTableTrackResult(trackName, trackOrder)
{
		document.getElementById(trackName + "_MCredits").innerHTML=trackResultArray[trackOrder][1];
		document.getElementById(trackName + "_OCredits").innerHTML=trackResultArray[trackOrder][2];
		document.getElementById(trackName + "_MCourses").innerHTML=trackResultArray[trackOrder][4];
		document.getElementById(trackName + "_OCourses").innerHTML=trackResultArray[trackOrder][5];
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
	//-----Add notes-----
	for(var m = 0; m<trackChoseArray.length; m++)
	{
		document.getElementById(trackResultArray[trackChoseArray[m]][0]+ " Notes").innerHTML = "You can chose!";
	}
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
		/*else if(lackCredits == trackResultArray[largestSumCourse][8] + oplastlackC)
		{
			count++;
			largestSumCourse = j;
			trackChoseArray[count] = largestSumCourse;

		}*/		
	}
	//------Add the other track with the result is equal with the track has just chosen-------
	for (var j = 2; j<=7; j++)
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

	//-----Colorize the list of course the user chose (on the right hand of the web page) according to the recommended track-------
	colorizeChoseList(trackResultArray[trackChoseArray[0]][0]);
	//-----Add notes-----
	for(var m = 0; m<trackChoseArray.length; m++)
	{
		document.getElementById(trackResultArray[trackChoseArray[m]][0]+ " Notes").innerHTML = "You can chose!";
	}
	//****
	addComments(trackResultArray[trackChoseArray[0]][0]);
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
	comment += "<br/> If you chose "+ trackName + " track, you lack of "+ lackMan + " credits of mandatory courses and ";
	if(lackOpt > 0)
		comment += lackOpt + " credits of optional courses!";
	else if(lackOpt == 0)
		comment += " enough credits of optional courses!";
	else
		comment += " enough credits (with " + Math.abs(lackOpt) +" credits of surplus) of optional courses!";
	
	comment += "<br/> You chose " + trackResultArray[i][3] + " credits of free and other courses";
	
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
		document.getElementById(trackName).style.backgroundColor = "#CC99FF";
	}
}

//------------Pop-up window contains information of each course (name, teacher name, teacher department, teacher image), is called when mouve over on the name of course in the list------------
function openWin(courseName, event)
{  
  //newWin= open(str, "displayWindow", "width=400,height=200,status=yes,toolbar=yes,menubar=yes,screenX=50,screenY=50");  
  //document.getElementById("courseDetails").innerHTML = str;
  //queryCourseDetail(str);
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
      	imageObj.src = teacherImage;
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

//------------This function is called when mouse over on the web page in order to update the position for the list of course on the right hand of the webpage ----------
//------Need to edit to call this function automatically according to time-------
function courseChoseScroll(event)
{
	//document.body.scrollTop = 40;
	var scrollPosition = document.body.scrollTop;
	if( scrollPosition == 0)
	{
		document.getElementById("courseChosedBorder").style.top = "150px";
	}
	else if(scrollPosition <=100)
		document.getElementById("courseChosedBorder").style.top = scrollPosition/2 +"px";// chua ro tai sao chia 2
	else
		document.getElementById("courseChosedBorder").style.top = "0px";

}

//-----Colorize the list of course the user chose (on the right hand of the web page) according to the recommended track-------
function colorizeChoseList(trackName)
{
	document.getElementById("trackNameCourseChose").innerHTML = trackName;
	//-----Set all of course background to the default color (background)-----
	for( var k = 0; k<courseChoseStoreGetArray.length-1; k++)
	{		
		document.getElementById("no"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
		document.getElementById("course"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
		document.getElementById("credit"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";

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
				document.getElementById("no"+courseName).style.backgroundColor ="#FF3300";
				document.getElementById("course"+courseName).style.backgroundColor ="#FF3300";
				document.getElementById("credit"+courseName).style.backgroundColor ="#FF3300";
			}
			else if(courseTrackArray[n][i] == 2)
			{
				document.getElementById("no"+courseName).style.backgroundColor ="#CC9900";
				document.getElementById("course"+courseName).style.backgroundColor ="#CC9900";
				document.getElementById("credit"+courseName).style.backgroundColor ="#CC9900";
			}
			else if(courseTrackArray[n][i] == 3)
			{
				document.getElementById("no"+courseName).style.backgroundColor ="#CCFF66";
				document.getElementById("course"+courseName).style.backgroundColor ="#CCFF66";
				document.getElementById("credit"+courseName).style.backgroundColor ="#CCFF66";
			}
		}
	}
	//-----Add comments-----
	//addComments(trackName);
}

/*function callListTechnicalCourse()
{
	if(nonTechniqueList == false || courseInformationLoad == false || courseTrackArrayLoad == false)
		myTime = setInterval(listTechnicalCourse, 1000);
	else
	{
		listTechnicalCourse();
		clearTimeout(myTime);
	}
}*/

//----------Make the list of course (on the left hand) of edit choice page----------
function listTechnicalCourse()
{

	techniqueList= true;

	var result = " <table class="+ "border_table" + ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Semester</td> <td class="+ "border_row_header"+ ">Credits</td> <td class="+ "border_row_header"+ "></td></tr>";

	for(var i =0; i<courseInformationArray.length; i++)
	{
		var courseName = courseInformationArray[i][0];
		var semester = courseInformationArray[i][1];
		var semesterDisplay = semester;
		var checkBoxName = courseName + "-Checkbox";
		if(semester.search("Fall") != -1)
			semesterDisplay = "Fall";
		else if(semester.search("Spring") != -1)
			semesterDisplay = "Spring";
		 result += " <tr id =\""+courseName+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+courseName+"\', event);  \"" + " onmouseout="+"\"closeWin(); \">" + courseName;

	  result += "</td><td class="+ "border_row"+ ">" + semesterDisplay;
	  result += "</td><td class="+ "border_row"+ ">";
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+courseName +"\', \'"+checkBoxName+"\'); \"";
	  result += "></form>";

	  result += " </td></tr>"; 
	}
	document.getElementById("technicalCourseSemester").innerHTML = result;
}

//-----Colorize the list of course the user chose (on the right hand of the web page) according to the recommended track-------
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
		if(document.getElementById("course"+courseName) != null)
		{			
			if(courseTrackArray[n][i] == 1)
			{
				document.getElementById(courseName).style.backgroundColor ="#FF3300";
			}
			else if(courseTrackArray[n][i] == 2)
			{
				document.getElementById(courseName).style.backgroundColor ="#CC9900";
			
			}
			else if(courseTrackArray[n][i] == 3)
			{
				document.getElementById(courseName).style.backgroundColor ="#CCFF66";
			}
		}
	}
	//-----Add comments-----
	//addComments(trackName);
}

//-----------Colorize course by teacher department---------
/*function colorizeCourse(courseNameArray)
{	
	for(var j =0 ; j<courseNameArray.length; j++)
	{
		courseName = courseNameArray[j];

		for(var i = 0; i<courseInformationArray.length; i++)
		{
			if(courseInformationArray[i][0] == courseName)
			{
				var dep = courseInformationArray[i][5];
				if(dep == "Networking and Security" && document.getElementById(courseName) != null)
					document.getElementById(courseName).style.backgroundColor= "#FFCCFF";//"#FF9966";
				if(dep == "Mobile Communications")
					document.getElementById(courseName).style.backgroundColor= "#FFFF99";//"#FCD88B";//"#FF66FF";
				if(dep == "Multimedia Communications")
					document.getElementById(courseName).style.backgroundColor= "#99FF33";//"#CCFF33";
			}
		}
	}
	
}
*/

/*
function queryCourseCredits(str,checkBoxName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT DISTINCT ?course ?credit WHERE {?code AIISO:code ?course. ?code AIISO:code '" + str+"'. ?cCFT REVE:isCreditForCourse ?code. ?cCFT REVE:hasCredit ?credit}";
	var checkBoxNameSplit = checkBoxName.split("-");
	var courseName = checkBoxNameSplit[0];
//	var elementId = "CourseCheckbox" + i;
	if(document.getElementById(checkBoxName).checked==true)
	{
		// Make the query.
		sparqlQueryJson(query, endpoint, callbackCourseCredits, true);
	}
	if(document.getElementById(checkBoxName).checked==false)
	{
		queryCourseTimeDeselect(courseName);
		
		if(document.getElementById("course"+courseName)!= null)
		{
			var creditEliminated = document.getElementById("credit"+courseName).innerHTML;
			var no = document.getElementById("no"+courseName);
			no.parentNode.removeChild(no);
			var course = document.getElementById("course"+courseName);
			course.parentNode.removeChild(course);
			var credit = document.getElementById("credit"+courseName);
			credit.parentNode.removeChild(credit);
			//document.getElementById("CourseCredit").removeChild("course"+courseName);
			
			creditCount -= parseInt(creditEliminated);
			document.getElementById("creditCountProgress").style.width = creditCount + "%";
			document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
		}		
	}
}


function callbackCourseCredits(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	if(jsonObj.results.bindings.length>0)
	{
		var course = jsonObj.results.bindings[0].course.value;
		var credit = jsonObj.results.bindings[0].credit.value;
		courseChoosedcount = courseChoosedcount +1;
		var result ="				<div id=\"no" +course +"\" class=\""+"div-column-ChosedCourse-No"+"\">"+courseChoosedcount+"</div>";
		result +="				<div id=\"course"+course+"\" class=\""+"div-column-ChosedCourse-Course"+"\">"+course+"</div>";
		result +="				<div id=\"credit"+course+"\" class=\""+"div-column-ChosedCourse-Credits"+"\">"+credit+"</div>";									
		result +="				</div>";
		
		document.getElementById("CourseCredit").innerHTML = document.getElementById("CourseCredit").innerHTML + result;
		creditCount += parseInt(credit);
		document.getElementById("creditCountProgress").style.width = creditCount + "%";
		document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
	}
}
*/
/*function queryCourseDetail(str)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX DC:<http://purl.org/dc/terms/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?course ?des WHERE { ?course AIISO:code '"+str+"'. ?course DC:description ?des}";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseDetail, true);
}


function callbackCourseDetail(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
	var courseName = "";//jsonObj.results[0].course.value;
	if(jsonObj.results.bindings.length>0)
	{
		var des = jsonObj.results.bindings[0].des.value;
		result = courseName + des;	
		document.getElementById("courseDetails").innerHTML = result;
	}	
}*/

//----------Using cookie---------
/*
function setCookie(courseChoseCookieName, cookieValue, exdays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var cookieValue = escape(cookieValue) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	var chuoi = courseChoseCookieName + "=";
	chuoi = chuoi + cookieValue;
	document.cookie = chuoi;
}

function getCookie(courseChoseCookieName)
{
	var i, x, y, cookieArray = document.cookie.split(";");
	for (i = 0; i<cookieArray.length; i++)
	{
		x = cookieArray[i].substr(0, cookieArray[i].indexOf("="));
		y = cookieArray[i].substr(cookieArray[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if(x == courseChoseCookieName)
			return unescape(y);
	}
}

var cookie = "";
function checkCookie()
{
	var test = courseChose[0];
	for(var i = 1; i < courseChose.length; i++)
	{
		courseChoseStringCookie += courseChose[i] + ",";
	}
	setCookie("cc", courseChoseStringCookie, 1);
}
function nullCookie()
{
	var cookie_date = new Date ( );
	cookie_date.setTime ( cookie_date.getTime() - 1 );
	document.cookie = "; expires=" + cookie_date.toGMTString();}

function useCookie()
{
	//checkCookie();
	var courseCookie = getCookie("cc");
	if(courseCookie != null)
	{
		var courseChoseGetFromCookie = new Array();
		courseChoseGetFromCookie= courseCookie.split(",");
		for(var i = 0; i <courseChoseGetFromCookie.length; i++)
		{
			if(courseChoseGetFromCookie[i] != "" && courseChoseGetFromCookie[i] != "undefined")
			{
				var checkboxName = 	courseChoseGetFromCookie[i] + "-Checkbox";	
				if(document.getElementById(checkboxName)!= null)
				{
					document.getElementById(checkboxName).checked = true;	
					courseChoseCheck(checkboxName);
				}
			}
		}
	}
}
*/
