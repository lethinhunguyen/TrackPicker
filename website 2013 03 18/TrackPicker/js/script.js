var allCredits = 90;
var technicalCredits = 60;
var mandatoryCredits = 25;
var optionalCredits = 18;
var nonTechnicalCredits = 12;
var languageCredits = 6;
var creditCount =0;
var defaultColor = "#FFFFFF";

var courseInformationArray = new Array();
var courseTrackArray = new Array();
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



function queryCourseTrackAddArray(trackName, index)
//function queryCourseTrackAddArray(trackName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?course ?typeCourse ?credit ?trackID WHERE {{?code AIISO:code ?course. ?code rdf:type REVE:Course} OPTIONAL {?code ?typeCourse  ?trackID. ?trackID rdf:type REVE:Track. ?trackID rdfs:label \""+ trackName +"\"@en} OPTIONAL {?cCFT REVE:isCreditForCourse ?code. ?cCFT REVE:hasCredit ?credit. ?cCFT REVE:hasTrack ?trackID. ?trackID rdfs:label \"" + trackName+ "\"@en }} ORDER BY ?course";
	
	// Make the query.
	sparqlQueryJsonCourseTrackArray(query, endpoint, callbackCourseTrackAddArray, index, true);
	//sparqlQueryJsonCourseTrackArray(query, endpoint, callbackCourseTrackAddArray, true);

}

// Define a callback function to receive the SPARQL JSON result.
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

function queryCourseName()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> SELECT  ?code WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseName, true);
}

// Define a callback function to receive the SPARQL JSON result.
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


function queryCourseInformationAddArray()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX PART:<http://purl.org/vocab/participation/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX DC:<http://purl.org/dc/terms/> SELECT ?code (SAMPLE (?semester) AS ?semester) (SAMPLE (?des) AS ?des) (SAMPLE (?teacherFirstName) AS ?teacherFirstName) (SAMPLE (?teacherLastName) AS ?teacherLastName) (SAMPLE (?teacherImage) AS ?teacherImage) (SAMPLE (?department) AS ?department) WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course} OPTIONAL {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}} {?course AIISO:responsibilityOf ?teacherID} {?teacherID FOAF:firstName ?teacherFirstName} {?teacherID FOAF:family_name ?teacherLastName} OPTIONAL {?teacherID FOAF:img ?teacherImage} OPTIONAL {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department} OPTIONAL {?course DC:description ?des}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseInformationAddArray, true);
}

// Define a callback function to receive the SPARQL JSON result.
function callbackCourseInformationAddArray(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	// Build up a table of results.
	/*var result = " <table class="+ "border_table"+ ">" + "<tr class="+ "border_column"+ "><td class="+ "border_row_header"+ ">Course</td> <td class="+ "border_row_header"+ ">Teacher</td> <td class="+ "border_row_header"+ ">Choose</td></tr>";*/
	//alert(result);
	//alert(jsonObj.results.bindings.length);
	//alert(jsonObj.results.bindings[1].course.value);
	
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
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
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
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) (SAMPLE (?semester) AS ?semester)  WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:TechnicalCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"fall\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacherFallSpring, true);

}
//----------Query technical list for Spring page---------
function queryTechnicalCourseTeacherSpring()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
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
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
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
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) (SAMPLE (?semester) AS ?semester)  WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:GeneralCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher} {{?course REVE:availableDuring ?semesterID} {?semesterID rdfs:label ?semester}}. FILTER regex (?semester, \"fall\", \"i\")} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacherFallSpring, true);
}

//----------Query non technical list for Spring page-----------
function queryNonTechnicalCourseTeacherSpring()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
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

function queryLanguageCourseTeacher()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course. ?course rdf:type REVE:LanguageCourse}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackLanguageCourseTeacher, true);
}

// Define a callback function to receive the SPARQL JSON result.
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

function queryCourseDepartment()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX DC:<http://purl.org/dc/terms/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX PART:<http://purl.org/vocab/participation/schema#> SELECT ?code ?department WHERE {{ ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course AIISO:responsibilityOf ?teacherID} {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department}}";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseDepartment, true);
	//checkSessionStorage();
}

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

function queryCourseTimeMouseMove(courseName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE WHERE {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseTime, true);
}

function queryCourseTime(courseName,checkBoxName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?code ?timeB ?timeE WHERE {{ ?course AIISO:code \'"+courseName+"\'. ?course AIISO:code ?code. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session} OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	if(document.getElementById(checkBoxName).checked==true)//can phai xem lai dieu kien nay khi re chuot vao thi no hien ra
		sparqlQueryJson(query, endpoint, callbackCourseTime,true);
}

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

function queryCourseTimeDeselect(courseName, checkBoxName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?timeB ?timeE WHERE {{ ?course AIISO:code '"+ courseName+ "'. ?course rdf:type REVE:Course}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session}OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	if(document.getElementById(checkBoxName).checked==false)
		sparqlQueryJson(query, endpoint, callbackCourseTimeDeselect, true);
}

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
	document.getElementById("timeCourse").innerHTML = result;

	var d = new Date('2013','02','28');
	var n = d.getDay();
	document.getElementById("test").innerHTML = n;

}

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

var courseChoseStore = "";
function setSessionStorage()
{
	for(var i = 1; i < courseChose.length; i++)
	{
		courseChoseStore += courseChose[i] + ",";
	}
	sessionStorage.setItem("courseChoseKey", courseChoseStore);
}

var courseChoseStoreGet = "";
var courseChoseStoreGetArray = new Array();
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
var courseChoseCount = 0;
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

var trackResultArray = new Array();
function checkTrack()
{
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
		var MCourses = 0;
		var OCourses = 0;
		for(var l = 1; l<courseTrackArray[k].length; l++)
		{
			if(courseTrackArray[15][l]==1)
			{
				if(courseTrackArray[k][l] == 1)
					MCourses ++;
				else if(courseTrackArray[k][l] == 2)
					OCourses ++;
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
			}
		}
		trackResultArray[(k-1)/2]= new Array();
		trackResultArray [(k-1)/2][0] = MCredits;
		trackResultArray [(k-1)/2][1] = OCredits;
		trackResultArray [(k-1)/2][2] = MCourses;
		trackResultArray [(k-1)/2][3] = OCourses;
	}
	document.getElementById("MUL_MCredits").innerHTML=trackResultArray[0][0];
	document.getElementById("MUL_OCredits").innerHTML=trackResultArray[0][1];
	document.getElementById("MUL_MCourses").innerHTML=trackResultArray[0][2];
	document.getElementById("MUL_OCourses").innerHTML=trackResultArray[0][3];
	
	document.getElementById("COM_MCredits").innerHTML=trackResultArray[1][0];
	document.getElementById("COM_OCredits").innerHTML=trackResultArray[1][1];
	document.getElementById("COM_MCourses").innerHTML=trackResultArray[1][2];
	document.getElementById("COM_OCourses").innerHTML=trackResultArray[1][3];
	
	document.getElementById("TRAN_MCredits").innerHTML=trackResultArray[2][0];
	document.getElementById("TRAN_OCredits").innerHTML=trackResultArray[2][1];
	document.getElementById("TRAN_MCourses").innerHTML=trackResultArray[2][2];
	document.getElementById("TRAN_OCourses").innerHTML=trackResultArray[2][3];

	document.getElementById("WEB_MCredits").innerHTML=trackResultArray[3][0];
	document.getElementById("WEB_OCredits").innerHTML=trackResultArray[3][1];
	document.getElementById("WEB_MCourses").innerHTML=trackResultArray[3][2];
	document.getElementById("WEB_OCourses").innerHTML=trackResultArray[3][3];

	document.getElementById("MOB_MCredits").innerHTML=trackResultArray[4][0];
	document.getElementById("MOB_OCredits").innerHTML=trackResultArray[4][1];
	document.getElementById("MOB_MCourses").innerHTML=trackResultArray[4][2];
	document.getElementById("MOB_OCourses").innerHTML=trackResultArray[4][3];

	document.getElementById("NET_MCredits").innerHTML=trackResultArray[5][0];
	document.getElementById("NET_OCredits").innerHTML=trackResultArray[5][1];
	document.getElementById("NET_MCourses").innerHTML=trackResultArray[5][2];
	document.getElementById("NET_OCourses").innerHTML=trackResultArray[5][3];

	document.getElementById("REAL_MCredits").innerHTML=trackResultArray[6][0];
	document.getElementById("REAL_OCredits").innerHTML=trackResultArray[6][1];
	document.getElementById("REAL_MCourses").innerHTML=trackResultArray[6][2];
	document.getElementById("REAL_OCourses").innerHTML=trackResultArray[6][3];


}

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
function closeWin()
{
	document.getElementById("courseDetails").style.visibility="hidden";
	document.getElementById("courseDes").innerHTML="";
	document.getElementById("courseDes").style.visibility="hidden";
}

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

function colorizeChoseList(trackName)
{
	document.getElementById("trackNameCourseChose").innerHTML = trackName;
	for( var k = 0; k<courseChoseStoreGetArray.length-1; k++)
	{		
		document.getElementById("no"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
		document.getElementById("course"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";
		document.getElementById("credit"+courseChoseStoreGetArray[k]).style.backgroundColor ="#f3f2f2";

	}
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
