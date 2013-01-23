<%@ page language ="java"%>
<%@ page import="java.util.ArrayList"%>

<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="stylesheet" href="style/style.css" type="text/css"/>
	</head>
	<body>
		<div id="main_container">
			<header class="header">
				
				<img class="logo" src="logo.gif" alt="Eurecom Track Picker"/>
				
				<div class="title">TRACK PICKER</div>
				
			</header>
			<div class="clear"></div>
			
			<div class="middle">
				<aside class="side_left">
					<p class="headline_space">All of courses at Eurecom:</p>
                    
                    <% int c = (Integer)request.getAttribute("c"); %>
                    
                    <%-- String[] str = (String[])request.getAttribute("arrayCourse"); --%> 
							 <%-- = str[0] --%>
					<% ArrayList newlist = (ArrayList) request.getAttribute("arrayCourse"); %>
					      
                    <table class="border_table">
						<tr class="border_column">
	                        	<th class="border_row" style="font-weight:bold">Course's code</th>
	                            <th class="border_row" style="font-weight:bold">Semester</th>
	                    </tr>
                    	<% for (int i =0; i< c ; i++) 
						{ %>
	                        <tr class="border_column">
	                        	<th class="border_row"><%= newlist.get(i)%></th>
	                            <th class="border_row">Spring</th>
	                        </tr>
                        <%} %>
                    </table>
				</aside>
				
				<section id="content_container" class="container">
					<section>
						<p class="track_picker">Track picker:</p>
						<p class="headline_space">This web application of Eurecom helps you choose the suitable track for you. You use this Track Picker application by choosing all of courses that you want to study such that the list of courses you choose is satisfied the curriculum regulation of Eurecom. </p>
					</section>
					<section>
						<p class="paragraph_title">The curriculum regulations of Eurecom:</p>
						<p>
							In 3 semesters, you have to study at least <%= request.getAttribute("totalC3S").toString() %> credits. Among them, there is at least <%= request.getAttribute("technicalC3S").toString() %> credits of technical courses (include at least <%= request.getAttribute("madatoryC3S").toString() %> mandatory, <%= request.getAttribute("optionalC3S").toString() %> optional and some free course credits), <%= request.getAttribute("non_technicalC3S").toString() %> credits of non-technical courses, <%= request.getAttribute("languageC3S").toString() %> credits of languages courses, and 10 credits for project.
							
						</p>
					</section>
					<section>
						<p class="paragraph_title">You click on each semester to choose courses for each one:</p>
						<p class="button_center">
							<button class="margin_button">Fall 1</button>
							<button class="margin_button">Spring</button>
							<button class="margin_button">Fall 2</button>
							<button class="margin_button">Iternship</button>
							
						</p>
						<p class="headline_space">After chossing enough courses, you can check which track is suitable with you.</p>
						<p class="button_center"><button>Check track</button></p>
					</section>
				</section>
				
				<aside class="side_right">
					<p style="padding-left:10px">Your schedule:</p>
				</aside>
				<div class="clear"></div>
			</div>
			
			
			<footer class="footer">
				&copy; Eurecom - 2013
				
			</footer>
		</div>
	</body>
</html>