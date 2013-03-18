var allCredits = 90;
var technicalCredits = 60;
var mandatoryCredits = 25;
var optionalCredits = 18;
var nonTechnicalCredits = 12;
var languageCredits = 6;
var creditCount =0;

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

function queryTechnicalCourseTeacher()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#Course'. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#TechnicalCourse'}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackTechnicalCourseTeacher, true);
}

// Define a callback function to receive the SPARQL JSON result.
function callbackTechnicalCourseTeacher(str)
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
	  result += " <tr id =\""+co+"\" class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  //result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"> <div" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[i].code.value; + "</div>";
	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  var checkBoxName = co + "-Checkbox"+i;
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	  //result +=" onclick= \"queryCourseCredits(\'"+co+"\', \'"+checkBoxName+"\');" + " \"";
	  result +=" onclick= \"queryCourseCredits_queryCourseTime(\'"+co+"\', \'"+checkBoxName+"\'); \"";

	  result += "></form>";
	  result += " </td></tr>"; 
	}
	
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("technicalCourseTeacher").innerHTML = result;	
}


function queryNonTechnicalCourseTeacher()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#Course'. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#GeneralCourse'}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackNonTechnicalCourseTeacher, true);
}

// Define a callback function to receive the SPARQL JSON result.
function callbackNonTechnicalCourseTeacher(str)
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
	  result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  //result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"> <div" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[i].code.value; + "</div>";
	  result += "</td><td class="+ "border_row"+ ">" + jsonObj.results.bindings[i].teacher.value;
	  var checkBoxName = co + "-Checkbox"+i;
	  result += " </td><td class="+ "border_row"+ ">"+ "<form><input type="+ "checkbox"+ " id=\""+ checkBoxName+"\"";
	  result +=" onclick= \"queryCourseCredits(\'"+co+"\', \'"+checkBoxName+"\');" + " \"";
	  result += "></form>";
	  result += " </td></tr>"; 
	}
	
	result += "</table>";
	//alert(result);
	//result +="<p" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[1].code.value + "</p>";
	document.getElementById("nonTechnicalCourseTeacher").innerHTML = result;	

}

function queryLanguageCourseTeacher()
{
	//var endpoint = "http://dbpedia.org/sparql";
	//var query = "select * {?s ?p ?o} limit 5" ;
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX FOAF:<http://xmlns.com/foaf/0.1/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?code (SAMPLE (?teacher) AS ?teacher) WHERE {{ ?course AIISO:code ?code. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#Course'. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#LanguageCourse'}{?course AIISO:responsibilityOf ?teacherID}{?teacherID FOAF:firstName ?teacher}} GROUP BY ?code ORDER BY ?code";
	
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
	  result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + " onmouseout="+"\"closeWin();\"" + ">" + jsonObj.results.bindings[i].code.value;
	  //result += " <tr class="+ "border_column"+ ">"+"<td class="+ "\"" + "border_row"+ "\"> <div" + " onmousemove="+"\"openWin(\'"+co+"\');\"" + ">" + jsonObj.results.bindings[i].code.value; + "</div>";
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

}

function queryCourseCredits_queryCourseTime(co, checkBoxName)
{
	queryCourseCredits(co, checkBoxName);
	queryCourseTime(co);
}
function queryCourseDepartment()
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX DC:<http://purl.org/dc/terms/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX PART:<http://purl.org/vocab/participation/schema#> SELECT ?code ?department WHERE {{ ?course AIISO:code ?code. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#Course'}{?course AIISO:responsibilityOf ?teacherID} {?teacherID PART:holder_of ?role. ?role PART:role_at ?departmentID. ?departmentID rdfs:label ?department}}";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseDepartment, true);
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
				document.getElementById(courseName).style.backgroundColor= "#FF9966";
			if(dep == "Mobile Communications")
				document.getElementById(courseName).style.backgroundColor= "#FF66FF";
			if(dep == "Multimedia Communications")
				document.getElementById(courseName).style.backgroundColor= "#CCFF33";

		}
	}
}

function queryCourseTime(courseName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX AIISO:<http://vocab.org/aiiso/schema#> PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX LODE:<http://linkedevents.org/ontology/> PREFIX TIME:<http://www.w3.org/2006/time#> SELECT ?course ?timeB ?timeE WHERE {{ ?course AIISO:code '"+ courseName+ "'. ?course rdf:type 'http://data.eurecom.fr/ontology/reve#Course'}{?course REVE:hasConstituent ?sess} {?sess LODE:atTime ?session}OPTIONAL{ {?session TIME:hasBeginning ?nodeB} {?nodeB TIME:inXSDDateTime ?timeB}}OPTIONAL{{?session TIME:hasEnd ?nodeE} {?nodeE TIME:inXSDDateTime ?timeE}}}";
	// Make the query.
	sparqlQueryJson(query, endpoint, callbackCourseTime, true);
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
			var timeB = jsonObj.results.bindings[i].timeB.value;
			var timeE = jsonObj.results.bindings[i].timeE.value;
			result += "<div style= \"float:left\">"+timeB+" &nbsp &nbsp &nbsp &nbsp </div> ";
			result += "<div style= \"float:left\">"+timeE+"</div></br>";
		}
	}
	result += "</div>";
	document.getElementById("timeCourse").innerHTML = result;

}


function query1(str)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX DC:<http://purl.org/dc/terms/> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?course ?des WHERE { ?course AIISO:code '"+str+"'. ?course DC:description ?des}";
	
	// Make the query.
	sparqlQueryJson(query, endpoint, myCallback1, true);
}

function myCallback1(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	//alert(str);
	var courseName = "";//jsonObj.results[0].course.value;
	var des = jsonObj.results.bindings[0].des.value;
	result = courseName + des;
	
	document.getElementById("courseDetails").innerHTML = result;
}



function queryCourseCredits(str,checkBoxName)
{
	var endpoint = "http://localhost:8080/openrdf-sesame/repositories/REVE2.2";
	var query = "PREFIX REVE:<http://data.eurecom.fr/ontology/reve#> PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT DISTINCT ?course ?credit WHERE {?code AIISO:code ?course. ?code AIISO:code '" + str+"'. ?cCFT REVE:isCreditForCourse ?code. ?cCFT REVE:hasCredit ?credit}";
	var checkBoxNameSplit = checkBoxName.split("-");
	var courseName = checkBoxNameSplit[0];
//	var elementId = "CourseCheckbox" + i;
	if(/*document.getElementById(elementId)!= null && */document.getElementById(checkBoxName).checked==true)
	{
		// Make the query.
		sparqlQueryJson(query, endpoint, callbackCourseCredits, true);
	}
	if(document.getElementById(checkBoxName).checked==false)
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
		document.getElementById("creditCountProgress").style.width = creditCount*2 + "%";
		document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;

	}
}

var courseChoosedcount = 0;
function callbackCourseCredits(str)
{
	// Convert result to JSON
	var jsonObj = eval('(' + str + ')');
	
	var course = jsonObj.results.bindings[0].course.value;
	var credit = jsonObj.results.bindings[0].credit.value;
	courseChoosedcount = courseChoosedcount +1;
	var result ="				<div id=\"no" +course +"\" class=\""+"div-column-ChosedCourse-No"+"\">"+courseChoosedcount+"</div>";
	result +="				<div id=\"course"+course+"\" class=\""+"div-column-ChosedCourse-Course"+"\">"+course+"</div>";
	result +="				<div id=\"credit"+course+"\" class=\""+"div-column-ChosedCourse-Credits"+"\">"+credit+"</div>";									
	result +="				</div>";
	
	document.getElementById("CourseCredit").innerHTML = document.getElementById("CourseCredit").innerHTML + result;
	creditCount += parseInt(credit);
	document.getElementById("creditCountProgress").style.width = creditCount*2 + "%";
	document.getElementById("creditCountAnnouncement").innerHTML = "Amount of credits: "+ creditCount;
}


function openWin(str) {  
  //newWin= open(str, "displayWindow", "width=400,height=200,status=yes,toolbar=yes,menubar=yes,screenX=50,screenY=50");  
  //document.getElementById("courseDetails").innerHTML = str;
  query1(str);
  document.getElementById("courseDetails").style.visibility="visible";
}  
function closeWin()
{
	document.getElementById("courseDetails").style.visibility="hidden";
}
/*
var y1 = 20;   // change the # on the left to adjuct the Y co-ordinate
(document.getElementById) ? dom = true : dom = false;

function hideIt() {
  if (dom) {document.getElementById("layer1").style.visibility='hidden';}
  if (document.layers) {document.layers["layer1"].visibility='hide';} }

function showIt() {
  if (dom) {document.getElementById("layer1").style.visibility='visible';}
  if (document.layers) {document.layers["layer1"].visibility='show';} }

function placeIt() {
  if (dom && !document.all) {document.getElementById("layer1").style.top = window.pageYOffset + (window.innerHeight - (window.innerHeight-y1))}
  if (document.layers) {document.layers["layer1"].top = window.pageYOffset + (window.innerHeight - (window.innerHeight-y1))}
  if (document.all) {document.all["layer1"].style.top = document.body.scrollTop + (document.body.clientHeight - (document.body.clientHeight-y1));}
  window.setTimeout("placeIt()", 10); }

window.onload=placeIt;
onResize="window.location.href = window.location.href"
*/