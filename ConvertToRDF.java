import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.hp.hpl.jena.datatypes.xsd.XSDDatatype;
import com.hp.hpl.jena.datatypes.xsd.XSDDateTime;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.Bag;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.reasoner.Reasoner;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;
import com.hp.hpl.jena.vocabulary.XSD;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntProperty;


public class ConvertToRDF {

	/**
	 * @param args
	 * @throws ParseException 
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	public static void main(String[] args) throws FileNotFoundException, IOException, ParseException {
		// TODO Auto-generated method stub
		Model modelTrack= ModelFactory.createDefaultModel();
		Model modelPeople = ModelFactory.createDefaultModel();
		Model modelSemester = ModelFactory.createDefaultModel();
		Model modelCourse = ModelFactory.createDefaultModel();
		Model modelCCreditFT = ModelFactory.createDefaultModel();
		Model modelCSession = ModelFactory.createDefaultModel();
		Model modelTimeSession = ModelFactory.createDefaultModel();
		Model modelRoom = ModelFactory.createDefaultModel();
		Model modelTeacher = ModelFactory.createDefaultModel();
		
		Bag trackBag = modelTrack.createBag();
		Bag peopleBag = modelPeople.createBag();
		Bag semesterBag = modelSemester.createBag();
		Bag courseBag = modelCourse.createBag();
		Bag cSessionBag = modelCSession.createBag();
		Bag timeBag = modelTimeSession.createBag();
		Bag roomBag = modelRoom.createBag();
		Bag teacherBag = modelTeacher.createBag();
		
		OntModel modelAIISO = null;
		OntModel modelLODE = null;
		OntModel modelDC = null;
		OntModel modelREVE = null;
		OntModel modelTIME = null;
		OntModel modelROOMS = null;		
		
		String AIISO_URL= "http://vocab.org/aiiso/schema#";
		String LODE_URL = "http://linkedevents.org/ontology/";
		String DC_URL = "http://purl.org/dc/terms/";
		String REVE_URL = "http://data.eurecom.fr/ontology/reve#";
		String TIME_URL = "http://www.w3.org/2006/time#";
		String ROOMS_URL = "http://vocab.deri.ie/rooms#";
				
    	//FileInputStream REVE_File = new FileInputStream(new File("F:\\Eclipse\\Data\\reve_1.0.rdf")); 
    	//modelREVE.read(REVE_File, "", "RDF/XML");
    	
		modelAIISO = ModelFactory.createOntologyModel();
		modelLODE = ModelFactory.createOntologyModel();
		modelDC = ModelFactory.createOntologyModel();
		modelREVE = ModelFactory.createOntologyModel();
		modelTIME = ModelFactory.createOntologyModel();
		modelROOMS = ModelFactory.createOntologyModel();
		
		modelTrack.setNsPrefix("AIISO", AIISO_URL);
		modelTrack.setNsPrefix("LODE", LODE_URL);
		modelTrack.setNsPrefix("DC", DC_URL);
		modelTrack.setNsPrefix("REVE", REVE_URL);
		modelTrack.setNsPrefix("FOAF", FOAF.getURI());
		modelTrack.setNsPrefix("TIME", TIME_URL);
		modelRoom.setNsPrefix("ROOMS", ROOMS_URL);
		
		modelPeople.setNsPrefix("AIISO", AIISO_URL);
		modelPeople.setNsPrefix("LODE", LODE_URL);
		modelPeople.setNsPrefix("DC", DC_URL);
		modelPeople.setNsPrefix("REVE", REVE_URL);
		modelPeople.setNsPrefix("FOAF", FOAF.getURI());
		modelPeople.setNsPrefix("TIME", TIME_URL);
		
		modelSemester.setNsPrefix("AIISO", AIISO_URL);
		modelSemester.setNsPrefix("LODE", LODE_URL);
		modelSemester.setNsPrefix("DC", DC_URL);
		modelSemester.setNsPrefix("REVE", REVE_URL);
		modelSemester.setNsPrefix("FOAF", FOAF.getURI());
		modelSemester.setNsPrefix("TIME", TIME_URL);
		
		modelCourse.setNsPrefix("AIISO", AIISO_URL);
		modelCourse.setNsPrefix("LODE", LODE_URL);
		modelCourse.setNsPrefix("DC", DC_URL);
		modelCourse.setNsPrefix("REVE", REVE_URL);
		modelCourse.setNsPrefix("FOAF", FOAF.getURI());
		modelCourse.setNsPrefix("TIME", TIME_URL);
		
		modelCCreditFT.setNsPrefix("AIISO", AIISO_URL);
		modelCCreditFT.setNsPrefix("LODE", LODE_URL);
		modelCCreditFT.setNsPrefix("DC", DC_URL);
		modelCCreditFT.setNsPrefix("REVE", REVE_URL);
		modelCCreditFT.setNsPrefix("FOAF", FOAF.getURI());
		modelCCreditFT.setNsPrefix("TIME", TIME_URL);
		
		modelCSession.setNsPrefix("AIISO", AIISO_URL);
		modelCSession.setNsPrefix("LODE", LODE_URL);
		modelCSession.setNsPrefix("DC", DC_URL);
		modelCSession.setNsPrefix("REVE", REVE_URL);
		modelCSession.setNsPrefix("FOAF", FOAF.getURI());
		
		modelTimeSession.setNsPrefix("AIISO", AIISO_URL);
		modelTimeSession.setNsPrefix("LODE", LODE_URL);
		modelTimeSession.setNsPrefix("DC", DC_URL);
		modelTimeSession.setNsPrefix("REVE", REVE_URL);
		modelTimeSession.setNsPrefix("FOAF", FOAF.getURI());
		modelTimeSession.setNsPrefix("TIME", TIME_URL);
		
		String trackURI= "http://data.eurecom.fr/track/";
		String courseURI = "http://data.eurecom.fr/course/";
		String courseSessionURI = "http://data.eurecom.fr/coursesession/";
		String semesterURI = "http://data.eurecom.fr/semester/";
		String peopleURI = "http://data.eurecom.fr/people/";
		String roleURI = "http://data.eurecom.fr/role/";
		String roomURI = "http://data.eurecom.fr/room/";
		String teacherURI ="http://data.eurecom.fr/teacher/";
		
		String trackFile = "F:\\Eclipse\\Data\\track_json.json";
		String courseFile = "F:\\Eclipse\\Data\\course_json.json";		
		String cSessionFile = "F:\\Eclipse\\Data\\coursesession_json.json";
		String teacherFile = "F:\\Eclipse\\Data\\teacher_json.json";
		
		JSONParser parser = new JSONParser();
		
		//----------TRACKS----------
		JSONObject trackObject = (JSONObject) parser.parse(new FileReader(trackFile));
		JSONArray trackArray = (JSONArray)trackObject.get("response");
		for (int i =0; i<trackArray.size();i++)
		{
			JSONObject track = (JSONObject) trackArray.get(i);
			Long id = (Long) track.get("id");
			String eachTrackURI = trackURI + id;
			Resource eachTrack= modelTrack.createResource(eachTrackURI);
			eachTrack.addProperty(RDF.type, REVE_URL+"Track");
			//OntClass cl = modelREVE.getOntClass("Track");
			//RDFNode trackNode = (RDFNode) modelREVE.getOntClass(REVE_URL+"Track");
			eachTrack.addProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelTrack.createLiteral(track.get("code").toString()));
			Literal literTitle = modelTrack.createLiteral(track.get("title_en").toString(), "en");
			eachTrack.addProperty(RDFS.label, literTitle);
			
			//Reasoner r = PelletReasonerFac
			//Graph 
			JSONArray resp = (JSONArray) track.get("responsible");
			for(int j=0;j<resp.size();j++)
			{
				JSONObject eachResp = (JSONObject)resp.get(j);
				JSONObject roleObject = (JSONObject) eachResp.get("role");
				JSONObject peoObject = (JSONObject)roleObject.get("people");
				String idPeople = peoObject.get("id").toString();
				String eachPeopleURI = peopleURI + idPeople;
				Resource eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
				//eachPeople.addProperty(RDF.type, FOAF.Person);
				eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peoObject.get("firstname").toString()));
				eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peoObject.get("lastname").toString()));
				eachTrack.addProperty(modelREVE.getProperty(REVE_URL+"hasCoordinator"), eachPeople);
				eachPeople.addProperty(modelREVE.getProperty(REVE_URL+"isCoordinatorOf"), eachTrack);
				peopleBag.add(eachPeople);
			}
			
			JSONArray cat = (JSONArray) track.get("catalogs");
			for (int k =0; k<cat.size();k++)
			{
				JSONObject eachCat = (JSONObject)cat.get(k);
				JSONObject period = (JSONObject)eachCat.get("period");
				String semesterName = period.get("name").toString();
				String eachSemURI = semesterURI +semesterName;
				Resource eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
				eachSem.addProperty(RDF.type, REVE_URL+"Semester");
				
				JSONArray courseArray = (JSONArray)eachCat.get("courses");
				for(int l =0; l<courseArray.size();l++)
				{
					JSONObject courseObject = (JSONObject)courseArray.get(l);
					String courseID = courseObject.get("id").toString();
					String eachCourseURI = courseURI + courseID;
					Resource eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
					eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(courseObject.get("code").toString()));
					if(courseObject.get("liberty").equals("optionnal"))
					{
						eachTrack.addProperty(modelREVE.getProperty(REVE_URL+"hasOptionalCourse"), eachCourse);
						eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"isOptionalFor"), eachTrack);
					}
					if(courseObject.get("liberty").equals("mandatory"))
					{
						eachTrack.addProperty(modelREVE.getProperty(REVE_URL+"hasMandatoryCourse"), eachCourse);
						eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"isMandatoryFor"), eachTrack);
					}
					if(courseObject.get("liberty").equals("free"))
					{
						eachTrack.addProperty(modelREVE.getProperty(REVE_URL+"hasFreeCourse"), eachCourse);
						eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"isFreeFor"), eachTrack);
					}
					//Resource cCreditFT = modelCourse.createResource();
					Resource cCreditFT = modelCCreditFT.createResource();
					cCreditFT.addProperty(RDF.type, REVE_URL+"CourseCreditForTrack");
					eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasCreditForTrack"), cCreditFT);
					cCreditFT.addProperty(modelREVE.getProperty(REVE_URL+"hasTrack"), eachTrack);
					//Literal creditLiteral = modelCourse.createTypedLiteral(courseObject.get("nbcredits"), XSDDatatype.XSDfloat);
					Literal creditLiteral = modelCCreditFT.createTypedLiteral(courseObject.get("nbcredits"), XSDDatatype.XSDfloat);
					cCreditFT.addProperty(modelREVE.getProperty(REVE_URL+"hasCredit"), creditLiteral);
					//courseBag.add(eachCourse);
				}
			}
			//eachtrack.addProperty(RDF.type, modelREVE.getOntClass())));
			trackBag.add(eachTrack);
		}
		
		//----------COURSES----------
		JSONObject courseObject = (JSONObject)parser.parse(new FileReader(courseFile));
		JSONArray courseArray = (JSONArray)courseObject.get("response");
		for(int i =0; i<courseArray.size();i++)
		{
			JSONObject course = (JSONObject)courseArray.get(i);
			JSONArray periodsArray = (JSONArray)course.get("periods");
			JSONObject firstPeriod = (JSONObject)periodsArray.get(0);
			Long id = (Long) firstPeriod.get("id");
			String eachCourseURI = courseURI + id;
			Resource eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
			eachCourse.addProperty(RDF.type, REVE_URL+"Course");
			eachCourse.addProperty(RDFS.label,modelCourse.createLiteral(firstPeriod.get("display_value").toString(),"en"));
			eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(course.get("code").toString()));
			eachCourse.addProperty(modelDC.getProperty(DC_URL+"abstract"), modelCourse.createLiteral(firstPeriod.get("abstract_en").toString()));
			eachCourse.addProperty(modelDC.getProperty(DC_URL+"description"), modelCourse.createLiteral(firstPeriod.get("description_en").toString()));
			
			JSONObject period = (JSONObject)firstPeriod.get("period");
			String semesterName = period.get("name").toString();
			String eachSemURI = semesterURI +semesterName;
			Resource eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
			eachSem.addProperty(RDF.type, REVE_URL+"Semester");
			eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
			eachSem.addProperty(RDFS.label, modelSemester.createLiteral(period.get("name").toString()));
			
			if(firstPeriod.get("category").equals("General Teaching"))
				eachCourse.addProperty(RDF.type, REVE_URL+"GeneralCourse");
			if(firstPeriod.get("category").equals("Technical Teaching"))
				eachCourse.addProperty(RDF.type, REVE_URL+"TechnicalCourse");
			if(firstPeriod.get("category").equals("Language Teaching"))
				eachCourse.addProperty(RDF.type, REVE_URL+"LanguageCourse");
			
			JSONArray contriArray = (JSONArray)firstPeriod.get("contributors");
			for(int j =0; j<contriArray.size();j++)
			{
				JSONObject contriObject = (JSONObject)contriArray.get(j);
				JSONObject roleObject = (JSONObject) contriObject.get("role");
				JSONObject peopleObject = (JSONObject)roleObject.get("people");
				Long peopleID = (Long)peopleObject.get("id");
				String eachPeopleURI = peopleURI+peopleID;
				Resource eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
				eachPeople.addProperty(RDF.type, FOAF.Person);
				eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
				eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
				eachPeople.addProperty(modelAIISO.getProperty(AIISO_URL+"responsibleFor"), eachCourse);
				eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"responsibilityOf"), eachPeople);
				peopleBag.add(eachPeople);
			}
			semesterBag.add(eachSem);
			courseBag.add(eachCourse);
		}
		
		//---------COURSE SESSIONS----------
		JSONObject cSessionObject = (JSONObject)parser.parse(new FileReader(cSessionFile));
		JSONArray cSessionArray = (JSONArray) cSessionObject.get("response");
		
		for(int i =0; i<cSessionArray.size();i++)
		{
			JSONObject resObject = (JSONObject)cSessionArray.get(i);
			JSONArray periodListArray = (JSONArray)resObject.get("periodList");
			for(int j=0;j<periodListArray.size();j++)
			{
				JSONObject periodObject = (JSONObject)periodListArray.get(j);
				Long id =(Long)periodObject.get("id");
				String eachCourseURI = courseURI +id;
				Resource eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
				eachCourse.addProperty(RDF.type, REVE_URL+"Course");
				eachCourse.addProperty(RDFS.label, modelCourse.createLiteral(periodObject.get("display_value").toString(),"en"));
				eachCourse.addLiteral(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(periodObject.get("code").toString()));
				
				JSONObject sePeriodObject = (JSONObject)periodObject.get("period");
				String semesterName = sePeriodObject.get("name").toString();
				String eachSemURI = semesterURI +semesterName;
				Resource eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
				eachSem.addProperty(RDF.type, REVE_URL+"Semester");
				eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
				eachSem.addProperty(RDFS.label, modelSemester.createLiteral(sePeriodObject.get("name").toString()));
				
				JSONArray sessionArray = (JSONArray)periodObject.get("sessionList");
				for(int k=0;k<sessionArray.size();k++)
				{
					JSONObject sessionObject = (JSONObject)sessionArray.get(k);
					Long sessionID = (Long)sessionObject.get("id");
					String eachSessionURI = courseSessionURI +sessionID;
					Resource eachSession = modelCSession.createResource(eachSessionURI);//dung cham khi khoi tao o cho khac
					eachSession.addProperty(RDF.type, REVE_URL +"CourseSession");
					eachSession.addProperty(modelREVE.getProperty(REVE_URL+"isConstituentOf"), eachCourse);
					eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasConstituent"), eachSession);
					
					Resource interval = modelCSession.createResource();
					Resource beginInstant = modelCSession.createResource();
					Resource endInstant = modelCSession.createResource();
					interval.addProperty(RDF.type, TIME_URL+"ProperInterval");
					beginInstant.addProperty(RDF.type, TIME_URL+"Instant");
					endInstant.addProperty(RDF.type, TIME_URL+"Instant");
					interval.addProperty(modelTIME.getProperty(TIME_URL+"hasBeginning"), beginInstant);
					interval.addProperty(modelTIME.getProperty(TIME_URL+"hasEnd"), endInstant);
					beginInstant.addProperty(modelTIME.getProperty(TIME_URL+"inXSDDateTime"), modelCourse.createTypedLiteral(sessionObject.get("begindate"), XSDDatatype.XSDdateTime));
					endInstant.addProperty(modelTIME.getProperty(TIME_URL+"inXSDDateTime"), modelCourse.createTypedLiteral(sessionObject.get("enddate"), XSDDatatype.XSDdateTime));
					eachSession.addProperty(modelLODE.getProperty(LODE_URL+"atTime"), interval);

					if(sessionObject.get("contributorList")!= null)
					{
						JSONArray contriArray = (JSONArray)sessionObject.get("contributorList");
						for(int l =0; l<contriArray.size(); l++)
						{
							JSONObject peoObject = (JSONObject)contriArray.get(i);
							JSONObject detailPeoObject = (JSONObject)peoObject.get("people");
							String idPeople = detailPeoObject.get("id").toString();
							String eachPeopleURI = peopleURI + idPeople;
							Resource eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
							eachPeople.addProperty(RDF.type, FOAF.Person);
							eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString()));
							eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(detailPeoObject.get("lastname").toString()));
							eachSession.addProperty(modelLODE.getProperty(LODE_URL+"involvedAgent"), eachPeople);
							
							peopleBag.add(eachPeople);
						}
					}
					
					if(sessionObject.get("resourceList")!= null)
					{
						JSONArray resourceArray = (JSONArray)sessionObject.get("resourceList");
						for(int m =0; m<resourceArray.size();m++)
						{
							JSONObject respRoomObject = (JSONObject)resourceArray.get(m);
							if(respRoomObject.get("type").equals("room"))
							{
								//JSONObject detailReObject = (JSONObject)respObject.get("")
								String roomID = respRoomObject.get("id").toString();
								String eachRoomURI = roomURI+roomID;
								Resource eachRoom = modelRoom.createResource(eachRoomURI);//model de tao la model nao
								eachRoom.addProperty(RDF.type, ROOMS_URL +"Room");
								eachRoom.addProperty(RDFS.label, modelRoom.createLiteral(respRoomObject.get("label_en").toString()));
								eachSession.addProperty(modelLODE.getProperty(LODE_URL+"atTime"), interval);
								
								roomBag.add(eachRoom);
							}
						}
					}
					cSessionBag.add(eachSession);
				}
			}
			
		}	
		
		//----------TEACHERS----------
		JSONObject teacherObject = (JSONObject)parser.parse(new FileReader(teacherFile));
		JSONArray teacherArray = (JSONArray) teacherObject.get("response");
		
		for(int i =0; i<teacherArray.size();i++)
		{
			JSONObject resPeopleObject = (JSONObject)teacherArray.get(i);
			JSONObject peopleObject = (JSONObject)resPeopleObject.get("people");
			String peopleID = peopleObject.get("id").toString();
			String eachPeopleURI = peopleURI + peopleID;
			
			//String teacherID = resPeopleObject.get("id").toString();
			//String eachTeacherURI = teacherURI+teacherID;
			//Resource eachTeacher = modelTeacher.createResource(eachTeacherURI);
			
			Resource eachPeople = modelPeople.createResource(eachPeopleURI);
			//eachPeople.addProperty(RDF.type, FOAF.Person);
			eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
			eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
			eachPeople.addProperty(RDF.type, REVE_URL+"Teacher");
			
			peopleBag.add(eachPeople);
		}
			
		try
		{
			FileOutputStream fout=new FileOutputStream("F:\\Eclipse\\OutputFile\\track.rdf");
			modelTrack.write(fout);
			FileOutputStream foutP=new FileOutputStream("F:\\Eclipse\\OutputFile\\people.rdf");
			modelPeople.write(foutP);
			FileOutputStream foutCourse=new FileOutputStream("F:\\Eclipse\\OutputFile\\course.rdf");
			modelCourse.write(foutCourse);
			FileOutputStream foutSemester=new FileOutputStream("F:\\Eclipse\\OutputFile\\semester.rdf");
			modelSemester.write(foutSemester);
			FileOutputStream foutCourseSession=new FileOutputStream("F:\\Eclipse\\OutputFile\\CourseSession.rdf");
			modelCSession.write(foutCourseSession);
			//FileOutputStream foutTeacher=new FileOutputStream("F:\\Eclipse\\OutputFile\\teacher.rdf");
			//modelTeacher.write(foutTeacher);
		}
		catch(IOException e)			
		{
			System.out.println("Exception caught"+e.getMessage());
		}
	}

}
