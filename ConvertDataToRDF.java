import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

//import org.json.JSONException;
//import org.json.JSONString;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.hp.hpl.jena.datatypes.xsd.XSDDatatype;
import com.hp.hpl.jena.datatypes.xsd.XSDDateTime;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.Bag;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.ResIterator;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.reasoner.Reasoner;
import com.hp.hpl.jena.sparql.vocabulary.FOAF;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;
import com.hp.hpl.jena.vocabulary.XSD;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntProperty;


public class ConvertDataToRDF {

	/**
	 * @param args
	 * @throws ParseException 
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */

	public static void internship(JSONObject internshipObject, String internshipURI, JSONParser parser, Model modelInternship, Model modelREVE, Model modelPeople, String REVE_URL,
			String peopleURI, String semesterURI, Model modelSemester, Model modelTIME, String TIME_URL, String companyURI, Model modelCourse, Model modelLODE, String LODE_URL,
			Bag peopleBag, Model modelCompany, Model modelORG, String ORG_URL, Model modelSKOS, String SKOS_URL, Bag companyBag, Bag internshipBag)
	{
		//JSONObject internshipObject = (JSONObject) parser.parse(new FileReader(fileName));
		JSONArray internshipArray = (JSONArray) internshipObject.get("response");
		for(int i =0; i<internshipArray.size(); i++)
		{
			JSONObject internship = (JSONObject) internshipArray.get(i);
			Long id = (Long) internship.get("id");
			String eachInternshipURI = internshipURI + id;
			Resource eachInternship = modelInternship.createResource(eachInternshipURI);
			eachInternship.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"InternshipOffer"));
			Literal literTitle;
			if(internship.get("title") != null)
				literTitle = modelInternship.createLiteral(internship.get("title").toString(),"en");
			else
				literTitle = modelInternship.createLiteral(internship.get("title_en").toString(),"en");
				
			eachInternship.addProperty(RDFS.label, literTitle);
			
			JSONObject supervisor = (JSONObject) internship.get("superviseur");
			String idSupervisor = supervisor.get("id").toString();
			String eachPeopleURI = peopleURI + idSupervisor;
			
			Resource eachPeople= modelPeople.getResource(eachPeopleURI);
			if(!modelPeople.containsResource(eachPeople))
			{
				eachPeople.addProperty(RDF.type, FOAF.Person);
				if(supervisor.get("firstname")!=null)
				eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(supervisor.get("firstname").toString()));
				if(supervisor.get("lastname")!=null)
				eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(supervisor.get("lastname").toString()));
				if(supervisor.get("picture")!=null)
					eachPeople.addProperty(FOAF.img, modelPeople.createLiteral(supervisor.get("picture").toString()));
			}
			
			eachInternship.addProperty(modelREVE.getProperty(REVE_URL+"hasSupervisor"), eachPeople);
			eachPeople.addProperty(modelREVE.getProperty(REVE_URL+"isSupervisorOf"), eachInternship);
			peopleBag.add(eachPeople);
			
			JSONObject period = (JSONObject) internship.get("period");
			String semesterName = period.get("name").toString();
			String eachSemURI = semesterURI +semesterName;
			Resource eachSem = modelSemester.getResource(eachSemURI);
			if(!modelSemester.containsResource(eachPeople))
			{
				eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));
				eachSem.addProperty(RDFS.label, modelSemester.createLiteral(period.get("name").toString()));
			}
			eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableInternshipOffer"), eachInternship);
			eachInternship.addProperty(modelREVE.getProperty(REVE_URL+"isAvailableAt"), eachSem);
			
			Resource interval = modelInternship.createResource();
			Resource beginInstant = modelInternship.createResource();
			Resource endInstant = modelInternship.createResource();
			
			interval.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"ProperInterval"));
			beginInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
			endInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
			interval.addProperty(modelTIME.getProperty(TIME_URL+"hasBeginning"), beginInstant);
			interval.addProperty(modelTIME.getProperty(TIME_URL+"hasEnd"), endInstant);
			beginInstant.addProperty(modelTIME.getProperty(TIME_URL+"inXSDDateTime"), modelCourse.createTypedLiteral(internship.get("begindate"), XSDDatatype.XSDdateTime));
			endInstant.addProperty(modelTIME.getProperty(TIME_URL+"inXSDDateTime"), modelCourse.createTypedLiteral(internship.get("enddate"), XSDDatatype.XSDdateTime));
			eachInternship.addProperty(modelLODE.getProperty(LODE_URL+"atTime"), interval);
			
			String company = internship.get("company").toString();
			String eachCompanyURI = companyURI + company;
			Resource eachCompany = modelCompany.getResource(eachCompanyURI);
			if(!modelCompany.containsResource(eachCompany))
			{
				eachCompany.addProperty(RDF.type, modelORG.getResource(ORG_URL+"Organization"));
				eachCompany.addProperty(modelSKOS.getProperty(SKOS_URL+"prefLabel"), modelCompany.createLiteral(company));
			}
			eachInternship.addProperty(modelREVE.getProperty(REVE_URL+"isEmploymentOf"), eachCompany);
			eachCompany.addProperty(modelREVE.getProperty(REVE_URL+"hasEmployment"), eachInternship);
			
			companyBag.add(eachCompany);
			internshipBag.add(eachInternship);
		}
	}
	
	public static void track(JSONObject trackObject, String trackURI, Model modelTrack, Model modelREVE, String REVE_URL, Model modelAIISO, String AIISO_URL, String peopleURI,
			Model modelPeople, Bag peopleBag, String semesterURI, Model modelSemester, String courseURI, Model modelCourse, Model modelCCreditFT, Bag cCreditFTBag, Bag trackBag)
	{
		JSONArray trackArray = (JSONArray)trackObject.get("response");
		for (int i =0; i<trackArray.size();i++)
		{
			JSONObject track = (JSONObject) trackArray.get(i);
			Long id = (Long) track.get("id");
			String eachTrackURI = trackURI + id;
			Resource eachTrack= modelTrack.createResource(eachTrackURI);
			eachTrack.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Track"));
			//OntClass cl = modelREVE.getOntClass("Track");
			//RDFNode trackNode = (RDFNode) modelREVE.getOntClass(REVE_URL+"Track");
			eachTrack.addProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelTrack.createLiteral(track.get("code").toString()));
			Literal literTitle = modelTrack.createLiteral(track.get("title_en").toString(), "en");
			eachTrack.addProperty(RDFS.label, literTitle);
						
			JSONArray resp = (JSONArray) track.get("responsibleList");
			for(int j=0;j<resp.size();j++)
			{
				JSONObject eachResp = (JSONObject)resp.get(j);
				JSONObject roleObject = (JSONObject) eachResp.get("role");
				JSONObject peoObject = (JSONObject)roleObject.get("people");
				String idPeople = peoObject.get("id").toString();
				String eachPeopleURI = peopleURI + idPeople;
				Resource eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
				eachPeople.addProperty(RDF.type, FOAF.Person);
				if(peoObject.get("firstname")!=null)
					eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peoObject.get("firstname").toString()));
				if(peoObject.get("lastname")!=null)
					eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peoObject.get("lastname").toString()));
				eachTrack.addProperty(modelREVE.getProperty(REVE_URL+"hasCoordinator"), eachPeople);
				eachPeople.addProperty(modelREVE.getProperty(REVE_URL+"isCoordinatorOf"), eachTrack);
				peopleBag.add(eachPeople);
			}
			
			JSONArray cat = (JSONArray) track.get("catalogList");
			for (int k =0; k<cat.size();k++)
			{
				JSONObject eachCat = (JSONObject)cat.get(k);
				JSONObject period = (JSONObject)eachCat.get("period");
				String semesterName = period.get("name").toString();
				String eachSemURI = semesterURI +semesterName;
				Resource eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
				eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));
				
				JSONArray courseArray = (JSONArray)eachCat.get("courseList");
				for(int l =0; l<courseArray.size();l++)
				{
					JSONObject courseObject = (JSONObject)courseArray.get(l);
					String courseID = courseObject.get("id").toString();
					String eachCourseURI = courseURI + courseID;
					//Resource eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
					Resource eachCourse = modelCourse.getResource(eachCourseURI);
					eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(courseObject.get("code").toString()));
					eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));					
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
					cCreditFT.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"CourseCreditForTrack"));
					eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasCreditForTrack"), cCreditFT);
					cCreditFT.addProperty(modelREVE.getProperty(REVE_URL+"hasTrack"), eachTrack);
					//Literal creditLiteral = modelCourse.createTypedLiteral(courseObject.get("nbcredits"), XSDDatatype.XSDfloat);
					Literal creditLiteral = modelCCreditFT.createTypedLiteral(courseObject.get("nbcredits"), XSDDatatype.XSDfloat);
					cCreditFT.addProperty(modelREVE.getProperty(REVE_URL+"hasCredit"), creditLiteral);
					cCreditFT.addProperty(modelCCreditFT.getProperty(REVE_URL+"isCreditForCourse"), eachCourse);
					cCreditFTBag.add(cCreditFT);
					//courseBag.add(eachCourse);
				}
			}
			//eachtrack.addProperty(RDF.type, modelREVE.getOntClass())));
			trackBag.add(eachTrack);
		}
	}
	
	public static void course(JSONObject courseObject, String courseURI, Model modelCourse, Model modelREVE, String REVE_URL, Model modelAIISO, String AIISO_URL, Model modelDC,
			String DC_URL, Bag courseBag, String semesterURI, Model modelSemester, String peopleURI, Model modelPeople, Bag peopleBag, Bag semesterBag)
	{
		JSONArray courseArray = (JSONArray)courseObject.get("response");
		for(int i =0; i<courseArray.size();i++)
		{
			JSONObject course = (JSONObject)courseArray.get(i);
			JSONArray periodsArray = (JSONArray)course.get("periodList");
			JSONObject firstPeriod = (JSONObject)periodsArray.get(0);
			Long id = (Long) firstPeriod.get("id");
			String eachCourseURI = courseURI + id;
			Resource eachCourse = modelCourse.getResource(eachCourseURI);
			//if(eachCourse.equals(null))
			//{
				//eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
			boolean c1 = !modelCourse.containsResource(eachCourse);
			//boolean c2 = !modelCourse.contains(eachCourse, modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(course.get("code").toString()));
			if(c1)
			{
				//if(!modelCourse.contains(eachCourse, modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(course.get("code").toString())))
				//{
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));
				eachCourse.addProperty(RDFS.label,modelCourse.createLiteral(firstPeriod.get("display_value").toString(),"en"));
				eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(course.get("code").toString()));
				courseBag.add(eachCourse);
				//}
			}
				//}
			if(firstPeriod.get("abstract_en")!= null)
				eachCourse.addProperty(modelDC.getProperty(DC_URL+"abstract"), modelCourse.createLiteral(firstPeriod.get("abstract_en").toString()));
			if(firstPeriod.get("description_en")!= null)
				eachCourse.addProperty(modelDC.getProperty(DC_URL+"description"), modelCourse.createLiteral(firstPeriod.get("description_en").toString()));
			
			
			JSONObject period = (JSONObject)firstPeriod.get("period");
			String semesterName = period.get("name").toString();
			String eachSemURI = semesterURI +semesterName;
			Resource eachSem = modelSemester.getResource(eachSemURI);
			
			//eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
			eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));			
			eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
			eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"availableDuring"), eachSem);
			eachSem.addProperty(RDFS.label, modelSemester.createLiteral(period.get("name").toString()));			
			if(firstPeriod.get("category").equals("General Teaching"))
			{
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"GeneralCourse"));
				if(firstPeriod.get("type")!= null)
				{
					if(firstPeriod.get("type").equals("Economy"))
						eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"economy"));
					else if(firstPeriod.get("type").equals("Law"))
						eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"law"));
					else if(firstPeriod.get("type").equals("Human science"))
						eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"humanSciences"));
					else if(firstPeriod.get("type").equals("Project management"))
						eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"projectManagement"));
				}
			}
			if(firstPeriod.get("category").equals("Technical Teaching"))
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"TechnicalCourse"));
			if(firstPeriod.get("category").equals("Language Teaching"))
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"LanguageCourse"));
			
			JSONArray contriArray = (JSONArray)firstPeriod.get("contributorList");
			for(int j =0; j<contriArray.size();j++)
			{
				JSONObject contriObject = (JSONObject)contriArray.get(j);
				JSONObject roleObject = (JSONObject) contriObject.get("role");
				JSONObject peopleObject = (JSONObject)roleObject.get("people");
				Long peopleID = (Long)peopleObject.get("id");
				String eachPeopleURI = peopleURI+peopleID;
				Resource eachPeople = modelPeople.getResource(eachPeopleURI);
				
				//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
				if(!modelPeople.containsResource(eachPeople))
				{					
					eachPeople.addProperty(RDF.type, FOAF.Person);
					if(peopleObject.get("firstname")!= null)
						eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
					if(peopleObject.get("lastname")!= null)
						eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
					peopleBag.add(eachPeople);
				}
				
				
				eachPeople.addProperty(modelAIISO.getProperty(AIISO_URL+"responsibleFor"), eachCourse);
				
				eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"responsibilityOf"), eachPeople);
				//peopleBag.add(eachPeople);				
			}
			semesterBag.add(eachSem);
			//courseBag.add(eachCourse);
		}
	}
	
	public static void courseSession(JSONObject cSessionObject2012, String courseURI, Model modelCourse, Model modelREVE, String REVE_URL, Model modelAIISO, String AIISO_URL,
			Bag courseBag, String semesterURI, Model modelSemester, String courseSessionURI, Model modelCSession, Model modelTIME, String TIME_URL, Model modelLODE,
			String LODE_URL, String peopleURI, Model modelPeople, Bag peopleBag, String roomURI, Model modelRoom, Model modelROOMS, String ROOMS_URL, Bag roomBag, Bag cSessionBag)
	{
		JSONArray cSessionArray2012 = (JSONArray) cSessionObject2012.get("response");
		
		for(int i =0; i<cSessionArray2012.size();i++)
		{
			JSONObject resObject = (JSONObject)cSessionArray2012.get(i);
			JSONArray periodListArray = (JSONArray)resObject.get("periodList");
			for(int j=0;j<periodListArray.size();j++)
			{
				JSONObject periodObject = (JSONObject)periodListArray.get(j);
				Long id =(Long)periodObject.get("id");
				String eachCourseURI = courseURI +id;
				
				Resource eachCourse;
				ResIterator resI = modelCourse.listResourcesWithProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(periodObject.get("code").toString()));
				//eachCourse = = modelCourse.listResourcesWithProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(periodObject.get("code").toString()));
				if (resI.hasNext())
				{
					//List<Resource> listRes = resI.toList();
					eachCourse = resI.nextResource();
				}
				else
				{
					eachCourse = modelCourse.getResource(eachCourseURI);
				//eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
				boolean c1 = !modelCourse.containsResource(eachCourse);
				if(c1)
				{	
					eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));
					eachCourse.addProperty(RDFS.label, modelCourse.createLiteral(periodObject.get("display_value").toString(),"en"));
					eachCourse.addLiteral(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(periodObject.get("code").toString()));
					courseBag.add(eachCourse);					
				}
				}				
				JSONObject sePeriodObject = (JSONObject)periodObject.get("period");
				String semesterName = sePeriodObject.get("name").toString();
				String eachSemURI = semesterURI +semesterName;
				Resource eachSem = modelSemester.getResource(eachSemURI);
				
				//eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
				eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));
				
				eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
				eachSem.addProperty(RDFS.label, modelSemester.createLiteral(sePeriodObject.get("name").toString()));
				
				JSONArray sessionArray = (JSONArray)periodObject.get("sessionList");
				for(int k=0;k<sessionArray.size();k++)
				{
					JSONObject sessionObject = (JSONObject)sessionArray.get(k);
					Long sessionID = (Long)sessionObject.get("id");
					String eachSessionURI = courseSessionURI +sessionID;
					Resource eachSession = modelCSession.createResource(eachSessionURI);//dung cham khi khoi tao o cho khac
					eachSession.addProperty(RDF.type, modelREVE.getResource(REVE_URL +"CourseSession"));
					eachSession.addProperty(modelREVE.getProperty(REVE_URL+"isConstituentOf"), eachCourse);
					eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasConstituent"), eachSession);
					
					Resource interval = modelCSession.createResource();
					Resource beginInstant = modelCSession.createResource();
					Resource endInstant = modelCSession.createResource();
					interval.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"ProperInterval"));
					beginInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
					endInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
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
							JSONObject peoObject = (JSONObject)contriArray.get(l);
							JSONObject detailPeoObject = (JSONObject)peoObject.get("people");
							String idPeople = detailPeoObject.get("id").toString();
							String eachPeopleURI = peopleURI + idPeople;
							Resource eachPeople = modelSemester.getResource(eachPeopleURI);
							
							//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
							if(!modelPeople.containsResource(eachPeople))
							{
								if(!modelPeople.contains(eachPeople, FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString())))
								{
								eachPeople.addProperty(RDF.type, FOAF.Person);
								eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString()));
								eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(detailPeoObject.get("lastname").toString()));
								peopleBag.add(eachPeople);
								}
							}
							eachSession.addProperty(modelLODE.getProperty(LODE_URL+"involvedAgent"), eachPeople);
							//peopleBag.add(eachPeople);							
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
								eachRoom.addProperty(RDF.type, modelROOMS.getResource(ROOMS_URL +"Room"));
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
	}
	
	public static void teacher(JSONObject teacherObject, String peopleURI, Model modelPeople, Bag peopleBag, Model modelREVE, String REVE_URL, String roleURI, Model modelRole,
			Model modelPART, String PART_URL)
	{
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
			Resource eachPeople = modelPeople.getResource(eachPeopleURI);
			
			//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
						
			if(!modelPeople.containsResource(eachPeople))
			{
				eachPeople.addProperty(RDF.type, FOAF.Person);				
				if(peopleObject.get("firstname")!= null)
					eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
				if(peopleObject.get("lastname")!= null)
					eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
				peopleBag.add(eachPeople);
			}
			eachPeople.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Teacher"));
			if(peopleObject.get("picture")!=null)
				eachPeople.addProperty(FOAF.img, modelPeople.createLiteral(peopleObject.get("picture").toString()));
			//peopleBag.add(eachPeople);
			
			//---
			Long roleId = (Long) resPeopleObject.get("id");
			String eachRoleURI = roleURI + roleId;
			Resource eachRole = modelRole.getResource(eachRoleURI);
						
			if(!modelRole.containsResource(eachRole))
			{
				eachRole.addProperty(RDF.type, modelPART.getResource(PART_URL+"Role"));				
			}
			if(!modelRole.contains(eachRole, modelPART.getProperty(PART_URL+"holder"), eachPeople))
				eachRole.addProperty(modelPART.getProperty(PART_URL+"holder"), eachPeople);
			
			if(!modelPeople.contains(eachPeople, modelPART.getProperty(PART_URL+"holder_of"), eachRole))
				eachPeople.addProperty(modelPART.getProperty(PART_URL+"holder_of"), eachRole);
			//---
		}
	}
	
	public static void researcher(JSONObject researcherObject, String roleURI, Model modelRole, String peopleURI, Model modelPeople, Model modelPART, String PART_URL,
			Model modelREVE, String REVE_URL, String departmentURI, Model modelDepartment, Model modelAIISO, String AIISO_URL)
	{
		JSONArray researcherArray = (JSONArray) researcherObject.get("response");
		
		for(int i =0; i<researcherArray.size();i++)
		{
			JSONObject researcher = (JSONObject) researcherArray.get(i);
			Long researcherId = (Long) researcher.get("id");
			String eachRoleURI = roleURI +researcherId;
			Resource eachRole = modelRole.getResource(eachRoleURI);
			
			String peopleID = researcher.get("people_id").toString();
			String eachPeopleURI = peopleURI + peopleID;
			Resource eachPeople= modelPeople.getResource(eachPeopleURI);
			JSONObject peopleObject = (JSONObject) researcher.get("people");
			
			if(!modelRole.containsResource(eachRole))
			{
				eachRole.addProperty(RDF.type, modelPART.getResource(PART_URL+"Role"));				
			}
			if(!modelRole.contains(eachRole, modelPART.getProperty(PART_URL+"holder"), eachPeople))
				eachRole.addProperty(modelPART.getProperty(PART_URL+"holder"), eachPeople);
			if(!modelPeople.containsResource(eachPeople))
			{
				eachPeople.addProperty(RDF.type, FOAF.Person);
				if(peopleObject.get("firstname")!=null)
				eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
				if(peopleObject.get("lastname")!=null)
				eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
			}
			if(!modelPeople.contains(eachPeople, modelPART.getProperty(PART_URL+"holder_of"), eachRole))
				eachPeople.addProperty(modelPART.getProperty(PART_URL+"holder_of"), eachRole);
						
			String comment = "";
			if(peopleObject.get("education_en")!=null)
				comment += "Education: " + peopleObject.get("education_en").toString();
			if(peopleObject.get("experience_en")!=null)
				comment += "Experience: " + peopleObject.get("experience_en").toString();
			
			if(comment!=null)
				eachPeople.addProperty(RDFS.comment, modelPeople.createLiteral(comment));
			
			if(researcher.get("begindate")!=null)
				eachRole.addProperty(modelPART.getProperty(PART_URL+"startDate"), modelRole.createTypedLiteral(researcher.get("begindate"), XSDDatatype.XSDdate));
			if(researcher.get("enddate")!=null)
				eachRole.addProperty(modelPART.getProperty(PART_URL+"endDate"), modelRole.createTypedLiteral(researcher.get("enddate"), XSDDatatype.XSDdate));
			
			if(researcher.get("type").toString().equals("teacher"))
				eachRole.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Teacher"));
			if(researcher.get("type").toString().equals("researcher"))
				eachRole.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Researcher"));
			if(researcher.get("type").toString().equals("phd"))
				eachRole.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"DoctoralStudent"));
			
			if(researcher.get("department")!=null)
			{
				JSONObject departmentObject = (JSONObject) researcher.get("department");
				Long departmentId = (Long) departmentObject.get("id");
				String eachDepartmentURI = departmentURI+departmentId;
				Resource eachDepartment = modelDepartment.createResource(eachDepartmentURI);
				
				if(departmentObject.get("type").equals("research"))
					eachDepartment.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"ResearchUnit"));
				else
					eachDepartment.addProperty(RDF.type, modelAIISO.getResource(AIISO_URL+"Department"));
				eachDepartment.addProperty(RDFS.label, modelDepartment.createLiteral(departmentObject.get("label_en").toString(), "en"));
				eachRole.addProperty(modelPART.getProperty(PART_URL+"role_at"), eachDepartment);
			}
		}
	}
	
	 
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
		Model modelRole = ModelFactory.createDefaultModel();
		Model modelDepartment = ModelFactory.createDefaultModel();
		Model modelInternship = ModelFactory.createDefaultModel();
		Model modelCompany = ModelFactory.createDefaultModel();
		
		Bag trackBag = modelTrack.createBag();
		Bag peopleBag = modelPeople.createBag();
		Bag semesterBag = modelSemester.createBag();
		Bag courseBag = modelCourse.createBag();
		Bag cSessionBag = modelCSession.createBag();
		Bag timeBag = modelTimeSession.createBag();
		Bag roomBag = modelRoom.createBag();
		Bag teacherBag = modelTeacher.createBag();
		Bag cCreditFTBag = modelCCreditFT.createBag();
		Bag roleBag = modelRole.createBag();
		Bag departmentBag = modelDepartment.createBag();
		Bag internshipBag = modelInternship.createBag();
		Bag companyBag = modelCompany.createBag();
		
		OntModel modelAIISO = null;
		OntModel modelLODE = null;
		OntModel modelDC = null;
		OntModel modelREVE = null;
		OntModel modelTIME = null;
		OntModel modelROOMS = null;
		OntModel modelPART = null;
		OntModel modelORG = null;
		OntModel modelSKOS = null;
		
		String AIISO_URL= "http://vocab.org/aiiso/schema#";
		String LODE_URL = "http://linkedevents.org/ontology/";
		String DC_URL = "http://purl.org/dc/terms/";
		String REVE_URL = "http://data.eurecom.fr/ontology/reve#";
		String TIME_URL = "http://www.w3.org/2006/time#";
		String ROOMS_URL = "http://vocab.deri.ie/rooms#";
		String PART_URL = "http://purl.org/vocab/participation/schema#";
		String ORG_URL = "http://www.w3.org/TR/vocab-org/#";
		String SKOS_URL = "http://www.w3.org/2004/02/skos/core.html#";
				
    	//FileInputStream REVE_File = new FileInputStream(new File("F:\\Eclipse\\Data\\reve_1.0.rdf")); 
    	//modelREVE.read(REVE_File, "", "RDF/XML");
    	
		modelAIISO = ModelFactory.createOntologyModel();
		modelLODE = ModelFactory.createOntologyModel();
		modelDC = ModelFactory.createOntologyModel();
		modelREVE = ModelFactory.createOntologyModel();
		modelTIME = ModelFactory.createOntologyModel();
		modelROOMS = ModelFactory.createOntologyModel();
		modelPART = ModelFactory.createOntologyModel();
		modelORG = ModelFactory.createOntologyModel();
		modelSKOS = ModelFactory.createOntologyModel();
		
		modelTrack.setNsPrefix("AIISO", AIISO_URL);
		modelTrack.setNsPrefix("LODE", LODE_URL);
		modelTrack.setNsPrefix("DC", DC_URL);
		modelTrack.setNsPrefix("REVE", REVE_URL);
		modelTrack.setNsPrefix("FOAF", FOAF.getURI());
		modelTrack.setNsPrefix("TIME", TIME_URL);
		modelTrack.setNsPrefix("ROOMS", ROOMS_URL);
		modelTrack.setNsPrefix("PART", PART_URL);
		modelTrack.setNsPrefix("ORG", ORG_URL);
		modelTrack.setNsPrefix("SKOS", SKOS_URL);
		
		modelPeople.setNsPrefix("AIISO", AIISO_URL);
		modelPeople.setNsPrefix("LODE", LODE_URL);
		modelPeople.setNsPrefix("DC", DC_URL);
		modelPeople.setNsPrefix("REVE", REVE_URL);
		modelPeople.setNsPrefix("FOAF", FOAF.getURI());
		modelPeople.setNsPrefix("TIME", TIME_URL);
		modelPeople.setNsPrefix("ROOMS", ROOMS_URL);
		modelPeople.setNsPrefix("PART", PART_URL);
		modelPeople.setNsPrefix("ORG", ORG_URL);
		modelPeople.setNsPrefix("SKOS", SKOS_URL);
		
		modelSemester.setNsPrefix("AIISO", AIISO_URL);
		modelSemester.setNsPrefix("LODE", LODE_URL);
		modelSemester.setNsPrefix("DC", DC_URL);
		modelSemester.setNsPrefix("REVE", REVE_URL);
		modelSemester.setNsPrefix("FOAF", FOAF.getURI());
		modelSemester.setNsPrefix("TIME", TIME_URL);
		modelSemester.setNsPrefix("ROOMS", ROOMS_URL);
		modelSemester.setNsPrefix("PART", PART_URL);
		modelSemester.setNsPrefix("ORG", ORG_URL);
		modelSemester.setNsPrefix("SKOS", SKOS_URL);
		
		modelCourse.setNsPrefix("AIISO", AIISO_URL);
		modelCourse.setNsPrefix("LODE", LODE_URL);
		modelCourse.setNsPrefix("DC", DC_URL);
		modelCourse.setNsPrefix("REVE", REVE_URL);
		modelCourse.setNsPrefix("FOAF", FOAF.getURI());
		modelCourse.setNsPrefix("TIME", TIME_URL);
		modelCourse.setNsPrefix("ROOMS", ROOMS_URL);
		modelCourse.setNsPrefix("PART", PART_URL);
		modelCourse.setNsPrefix("ORG", ORG_URL);
		modelCourse.setNsPrefix("SKOS", SKOS_URL);
		
		modelCCreditFT.setNsPrefix("AIISO", AIISO_URL);
		modelCCreditFT.setNsPrefix("LODE", LODE_URL);
		modelCCreditFT.setNsPrefix("DC", DC_URL);
		modelCCreditFT.setNsPrefix("REVE", REVE_URL);
		modelCCreditFT.setNsPrefix("FOAF", FOAF.getURI());
		modelCCreditFT.setNsPrefix("TIME", TIME_URL);
		modelCCreditFT.setNsPrefix("ROOMS", ROOMS_URL);
		modelCCreditFT.setNsPrefix("PART", PART_URL);
		modelCCreditFT.setNsPrefix("ORG", ORG_URL);
		modelCCreditFT.setNsPrefix("SKOS", SKOS_URL);
		
		modelCSession.setNsPrefix("AIISO", AIISO_URL);
		modelCSession.setNsPrefix("LODE", LODE_URL);
		modelCSession.setNsPrefix("DC", DC_URL);
		modelCSession.setNsPrefix("REVE", REVE_URL);
		modelCSession.setNsPrefix("FOAF", FOAF.getURI());
		modelCSession.setNsPrefix("TIME", TIME_URL);
		modelCSession.setNsPrefix("ROOMS", ROOMS_URL);
		modelCSession.setNsPrefix("PART", PART_URL);
		modelCSession.setNsPrefix("ORG", ORG_URL);
		modelCSession.setNsPrefix("SKOS", SKOS_URL);
		
		modelTimeSession.setNsPrefix("AIISO", AIISO_URL);
		modelTimeSession.setNsPrefix("LODE", LODE_URL);
		modelTimeSession.setNsPrefix("DC", DC_URL);
		modelTimeSession.setNsPrefix("REVE", REVE_URL);
		modelTimeSession.setNsPrefix("FOAF", FOAF.getURI());
		modelTimeSession.setNsPrefix("TIME", TIME_URL);
		modelTimeSession.setNsPrefix("ROOMS", ROOMS_URL);
		modelTimeSession.setNsPrefix("PART", PART_URL);
		modelTimeSession.setNsPrefix("ORG", ORG_URL);
		modelTimeSession.setNsPrefix("SKOS", SKOS_URL);
		
		modelRole.setNsPrefix("AIISO", AIISO_URL);
		modelRole.setNsPrefix("LODE", LODE_URL);
		modelRole.setNsPrefix("DC", DC_URL);
		modelRole.setNsPrefix("REVE", REVE_URL);
		modelRole.setNsPrefix("FOAF", FOAF.getURI());
		modelRole.setNsPrefix("TIME", TIME_URL);
		modelRole.setNsPrefix("ROOMS", ROOMS_URL);
		modelRole.setNsPrefix("PART", PART_URL);
		modelRole.setNsPrefix("ORG", ORG_URL);
		modelRole.setNsPrefix("SKOS", SKOS_URL);
		
		modelDepartment.setNsPrefix("AIISO", AIISO_URL);
		modelDepartment.setNsPrefix("LODE", LODE_URL);
		modelDepartment.setNsPrefix("DC", DC_URL);
		modelDepartment.setNsPrefix("REVE", REVE_URL);
		modelDepartment.setNsPrefix("FOAF", FOAF.getURI());
		modelDepartment.setNsPrefix("TIME", TIME_URL);
		modelDepartment.setNsPrefix("ROOMS", ROOMS_URL);
		modelDepartment.setNsPrefix("PART", PART_URL);
		modelDepartment.setNsPrefix("ORG", ORG_URL);
		modelDepartment.setNsPrefix("SKOS", SKOS_URL);
		
		modelInternship.setNsPrefix("AIISO", AIISO_URL);
		modelInternship.setNsPrefix("LODE", LODE_URL);
		modelInternship.setNsPrefix("DC", DC_URL);
		modelInternship.setNsPrefix("REVE", REVE_URL);
		modelInternship.setNsPrefix("FOAF", FOAF.getURI());
		modelInternship.setNsPrefix("TIME", TIME_URL);
		modelInternship.setNsPrefix("ROOMS", ROOMS_URL);
		modelInternship.setNsPrefix("PART", PART_URL);
		modelInternship.setNsPrefix("ORG", ORG_URL);
		modelInternship.setNsPrefix("SKOS", SKOS_URL);
		
		modelCompany.setNsPrefix("AIISO", AIISO_URL);
		modelCompany.setNsPrefix("LODE", LODE_URL);
		modelCompany.setNsPrefix("DC", DC_URL);
		modelCompany.setNsPrefix("REVE", REVE_URL);
		modelCompany.setNsPrefix("FOAF", FOAF.getURI());
		modelCompany.setNsPrefix("TIME", TIME_URL);
		modelCompany.setNsPrefix("ROOMS", ROOMS_URL);
		modelCompany.setNsPrefix("PART", PART_URL);
		modelCompany.setNsPrefix("ORG", ORG_URL);
		modelCompany.setNsPrefix("SKOS", SKOS_URL);
		
		String trackURI= "http://data.eurecom.fr/track/";
		String courseURI = "http://data.eurecom.fr/course/";
		String courseSessionURI = "http://data.eurecom.fr/coursesession/";
		String semesterURI = "http://data.eurecom.fr/semester/";
		String peopleURI = "http://data.eurecom.fr/people/";
		String roleURI = "http://data.eurecom.fr/role/";
		String roomURI = "http://data.eurecom.fr/room/";
		String teacherURI ="http://data.eurecom.fr/teacher/";
		String departmentURI = "http://data.eurecom.fr/department/";
		String internshipURI = "http://data.eurecom.fr/internship/";
		String companyURI = "http://data.eurecom.fr/company/";
		
		/*String trackFile = "E:\\Eclipse\\Data\\track.json";
		String courseFile = "E:\\Eclipse\\Data\\course.json";		
		String cSessionFile = "E:\\Eclipse\\Data\\coursesession.json";
		String cSessionFile2012 = "E:\\Eclipse\\Data\\coursesession_2012.json";
		String teacherFile = "E:\\Eclipse\\Data\\teacher.json";
		String researcherFile = "E:\\Eclipse\\Data\\researcher.json";
		String internshipFile2007 = "E:\\Eclipse\\Data\\internship2007.json";
		String internshipFile2008 = "E:\\Eclipse\\Data\\internship2008.json";
		String internshipFile2009 = "E:\\Eclipse\\Data\\internship2009.json";
		String internshipFile2010 = "E:\\Eclipse\\Data\\internship2010.json";
		String internshipFile2011 = "E:\\Eclipse\\Data\\internship2011.json";
		String internshipFile2012 = "E:\\Eclipse\\Data\\internship2012.json";
		String internshipFile2013 = "E:\\Eclipse\\Data\\internship2013.json";
		String inputFileName = "inputFileName.json";*/
		
		JSONParser parser = new JSONParser();
		String currentDir = new File("bin").getAbsolutePath();
		JSONObject fileNameObject = (JSONObject) parser.parse(new FileReader(currentDir + "/inputFileName.json"));
		
		/*URL google = new URL("http://localhost:8080/TrackPicker/track.json");
        URLConnection yc = google.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            System.out.println(inputLine);
        }
        in.close();*/
		
		
		//JSONObject fileNameObject = (JSONObject) parser.parse(new FileReader(inputFileName));
		
		JSONObject inputName = (JSONObject) fileNameObject.get("input");
		
		
		//----------TRACKS----------
		JSONArray trackInput = (JSONArray)inputName.get("track");		
		for(int i = 0; i<trackInput.size(); i++)
		{
			JSONObject trackObjectName = (JSONObject) trackInput.get(i);
			String trackFileName = trackObjectName.get("name").toString();
			
			JSONObject trackObject = (JSONObject) parser.parse(new FileReader(currentDir + trackFileName));			    
			track(trackObject, trackURI, modelTrack, modelREVE, REVE_URL, modelAIISO, AIISO_URL, peopleURI, modelPeople, peopleBag, semesterURI, modelSemester, courseURI, modelCourse, modelCCreditFT, cCreditFTBag, trackBag);
		}
		
		//----------COURSES----------
		JSONArray courseInput = (JSONArray)inputName.get("course");		
		for(int i = 0; i<courseInput.size(); i++)
		{
			JSONObject courseObjectName = (JSONObject) courseInput.get(i);
			String courseFileName = courseObjectName.get("name").toString();
			JSONObject courseObject = (JSONObject)parser.parse(new FileReader(currentDir + courseFileName));
			course(courseObject, courseURI, modelCourse, modelREVE, REVE_URL, modelAIISO, AIISO_URL, modelDC,
					DC_URL, courseBag, semesterURI, modelSemester, peopleURI, modelPeople, peopleBag, semesterBag);
		}
		
		//---------COURSE SESSIONS----------
		JSONArray courseSessionInput = (JSONArray)inputName.get("courseSession");		
		for(int i = 0; i<courseSessionInput.size(); i++)
		{
			JSONObject courseSessionObjectName = (JSONObject) courseSessionInput.get(i);
			String courseSessionFileName = courseSessionObjectName.get("name").toString();
			JSONObject cSessionObject = (JSONObject)parser.parse(new FileReader(currentDir + courseSessionFileName));
			courseSession(cSessionObject, courseURI, modelCourse, modelREVE, REVE_URL, modelAIISO, AIISO_URL,
				courseBag, semesterURI, modelSemester, courseSessionURI, modelCSession, modelTIME, TIME_URL, modelLODE,
				LODE_URL, peopleURI, modelPeople, peopleBag, roomURI, modelRoom, modelROOMS, ROOMS_URL, roomBag, cSessionBag);
		}
				
		//----------TEACHERS----------
		JSONArray teacherInput = (JSONArray)inputName.get("teacher");		
		for(int i = 0; i<teacherInput.size(); i++)
		{
			JSONObject teacherObjectName = (JSONObject) teacherInput.get(i);
			String teacherFileName = teacherObjectName.get("name").toString();
			JSONObject teacherObject = (JSONObject)parser.parse(new FileReader(currentDir + teacherFileName));
			teacher(teacherObject, peopleURI, modelPeople, peopleBag, modelREVE, REVE_URL, roleURI, modelRole, modelPART, PART_URL);
		}
				
		//------------RESEARCHER (ROLES)--------
		JSONArray researcherInput = (JSONArray)inputName.get("researcher");		
		for(int i = 0; i<researcherInput.size(); i++)
		{
			JSONObject researcherObjectName = (JSONObject) researcherInput.get(i);
			String researcherFileName = researcherObjectName.get("name").toString();
			JSONObject researcherObject = (JSONObject)parser.parse(new FileReader(currentDir + researcherFileName));
			researcher(researcherObject, roleURI, modelRole, peopleURI, modelPeople, modelPART, PART_URL, modelREVE, REVE_URL, departmentURI, modelDepartment, modelAIISO, AIISO_URL);
		}

		//------------INTERNSHIP--------
		JSONArray internshipInput = (JSONArray)inputName.get("internship");		
		for(int i = 0; i<internshipInput.size(); i++)
		{
			JSONObject internshipObjectName = (JSONObject) internshipInput.get(i);
			String internshipFileName = internshipObjectName.get("name").toString();
			JSONObject internshipObject = (JSONObject) parser.parse(new FileReader(currentDir + internshipFileName));
			internship(internshipObject, internshipURI,  parser,  modelInternship,  modelREVE,  modelPeople,  REVE_URL,
				 peopleURI,  semesterURI,  modelSemester,  modelTIME,  TIME_URL,  companyURI,  modelCourse,  modelLODE,  LODE_URL,
				 peopleBag,  modelCompany,  modelORG,  ORG_URL,  modelSKOS,  SKOS_URL,  companyBag,  internshipBag);
		}
		 
		try
		{
			JSONObject outputName = (JSONObject) fileNameObject.get("output");
			JSONObject nameObjet = (JSONObject) outputName.get("track");
			String trackOutputFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("course");
			String courseOutputFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("people");
			String peopleOutputFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("semester");
			String semesterOutputFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("courseSession");
			String courseSessionOutputFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("courseCreditForTrack");
			String courseCreditForTrackFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("role");
			String roleFile = nameObjet.get("name").toString();	
			nameObjet = (JSONObject) outputName.get("department");
			String departmentFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("internship");
			String internshipFile = nameObjet.get("name").toString();
			nameObjet = (JSONObject) outputName.get("company");
			String companyFile = nameObjet.get("name").toString();
			
			FileOutputStream fout=new FileOutputStream(currentDir + trackOutputFile);
			modelTrack.write(fout);			
			FileOutputStream foutP=new FileOutputStream(currentDir + peopleOutputFile);
			modelPeople.write(foutP);
			FileOutputStream foutCourse=new FileOutputStream(currentDir + courseOutputFile);
			modelCourse.write(foutCourse);
			FileOutputStream foutSemester=new FileOutputStream(currentDir + semesterOutputFile);
			modelSemester.write(foutSemester);
			FileOutputStream foutCourseSession=new FileOutputStream(currentDir + courseSessionOutputFile);
			modelCSession.write(foutCourseSession);
			FileOutputStream foutCCreditFT=new FileOutputStream(currentDir + courseCreditForTrackFile);
			modelCCreditFT.write(foutCCreditFT);
			FileOutputStream foutRole=new FileOutputStream(currentDir + roleFile);
			modelRole.write(foutRole);
			FileOutputStream foutDepartment=new FileOutputStream(currentDir + departmentFile);
			modelDepartment.write(foutDepartment);
			//FileOutputStream foutTeacher=new FileOutputStream("E:\\Eclipse\\OutputFile\\teacher.rdf");
			//modelTeacher.write(foutTeacher);
			FileOutputStream foutInternship=new FileOutputStream(currentDir + internshipFile);
			modelInternship.write(foutInternship);
			FileOutputStream foutCompany=new FileOutputStream(currentDir + companyFile);
			modelCompany.write(foutCompany);
		}
		catch(IOException e)			
		{
			System.out.println("Exception caught"+e.getMessage());
		}
		
		//----------TRACKS----------
		/*JSONArray trackArray = (JSONArray)trackObject.get("response");
		for (int i =0; i<trackArray.size();i++)
		{
			JSONObject track = (JSONObject) trackArray.get(i);
			Long id = (Long) track.get("id");
			String eachTrackURI = trackURI + id;
			Resource eachTrack= modelTrack.createResource(eachTrackURI);
			eachTrack.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Track"));
			//OntClass cl = modelREVE.getOntClass("Track");
			//RDFNode trackNode = (RDFNode) modelREVE.getOntClass(REVE_URL+"Track");
			eachTrack.addProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelTrack.createLiteral(track.get("code").toString()));
			Literal literTitle = modelTrack.createLiteral(track.get("title_en").toString(), "en");
			eachTrack.addProperty(RDFS.label, literTitle);
						
			JSONArray resp = (JSONArray) track.get("responsibleList");
			for(int j=0;j<resp.size();j++)
			{
				JSONObject eachResp = (JSONObject)resp.get(j);
				JSONObject roleObject = (JSONObject) eachResp.get("role");
				JSONObject peoObject = (JSONObject)roleObject.get("people");
				String idPeople = peoObject.get("id").toString();
				String eachPeopleURI = peopleURI + idPeople;
				Resource eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
				eachPeople.addProperty(RDF.type, FOAF.Person);
				if(peoObject.get("firstname")!=null)
					eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peoObject.get("firstname").toString()));
				if(peoObject.get("lastname")!=null)
					eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peoObject.get("lastname").toString()));
				eachTrack.addProperty(modelREVE.getProperty(REVE_URL+"hasCoordinator"), eachPeople);
				eachPeople.addProperty(modelREVE.getProperty(REVE_URL+"isCoordinatorOf"), eachTrack);
				peopleBag.add(eachPeople);
			}
			
			JSONArray cat = (JSONArray) track.get("catalogList");
			for (int k =0; k<cat.size();k++)
			{
				JSONObject eachCat = (JSONObject)cat.get(k);
				JSONObject period = (JSONObject)eachCat.get("period");
				String semesterName = period.get("name").toString();
				String eachSemURI = semesterURI +semesterName;
				Resource eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
				eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));
				
				JSONArray courseArray = (JSONArray)eachCat.get("courseList");
				for(int l =0; l<courseArray.size();l++)
				{
					JSONObject courseObject = (JSONObject)courseArray.get(l);
					String courseID = courseObject.get("id").toString();
					String eachCourseURI = courseURI + courseID;
					//Resource eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
					Resource eachCourse = modelCourse.getResource(eachCourseURI);
					eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(courseObject.get("code").toString()));
					eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));					
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
					cCreditFT.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"CourseCreditForTrack"));
					eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasCreditForTrack"), cCreditFT);
					cCreditFT.addProperty(modelREVE.getProperty(REVE_URL+"hasTrack"), eachTrack);
					//Literal creditLiteral = modelCourse.createTypedLiteral(courseObject.get("nbcredits"), XSDDatatype.XSDfloat);
					Literal creditLiteral = modelCCreditFT.createTypedLiteral(courseObject.get("nbcredits"), XSDDatatype.XSDfloat);
					cCreditFT.addProperty(modelREVE.getProperty(REVE_URL+"hasCredit"), creditLiteral);
					cCreditFT.addProperty(modelCCreditFT.getProperty(REVE_URL+"isCreditForCourse"), eachCourse);
					cCreditFTBag.add(cCreditFT);
					//courseBag.add(eachCourse);
				}
			}
			//eachtrack.addProperty(RDF.type, modelREVE.getOntClass())));
			trackBag.add(eachTrack);
		}*/
		
		//----------COURSES----------		
		/*JSONArray courseArray = (JSONArray)courseObject.get("response");
		for(int i =0; i<courseArray.size();i++)
		{
			JSONObject course = (JSONObject)courseArray.get(i);
			JSONArray periodsArray = (JSONArray)course.get("periodList");
			JSONObject firstPeriod = (JSONObject)periodsArray.get(0);
			Long id = (Long) firstPeriod.get("id");
			String eachCourseURI = courseURI + id;
			Resource eachCourse = modelCourse.getResource(eachCourseURI);
			//if(eachCourse.equals(null))
			//{
				//eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
			boolean c1 = !modelCourse.containsResource(eachCourse);
			//boolean c2 = !modelCourse.contains(eachCourse, modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(course.get("code").toString()));
			if(c1)
			{
				//if(!modelCourse.contains(eachCourse, modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(course.get("code").toString())))
				//{
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));
				eachCourse.addProperty(RDFS.label,modelCourse.createLiteral(firstPeriod.get("display_value").toString(),"en"));
				eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(course.get("code").toString()));
				courseBag.add(eachCourse);
				//}
			}
				//}
			if(firstPeriod.get("abstract_en")!= null)
				eachCourse.addProperty(modelDC.getProperty(DC_URL+"abstract"), modelCourse.createLiteral(firstPeriod.get("abstract_en").toString()));
			if(firstPeriod.get("description_en")!= null)
				eachCourse.addProperty(modelDC.getProperty(DC_URL+"description"), modelCourse.createLiteral(firstPeriod.get("description_en").toString()));
			
			
			JSONObject period = (JSONObject)firstPeriod.get("period");
			String semesterName = period.get("name").toString();
			String eachSemURI = semesterURI +semesterName;
			Resource eachSem = modelSemester.getResource(eachSemURI);
			
			//eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
			eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));			
			eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
			eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"availableDuring"), eachSem);
			eachSem.addProperty(RDFS.label, modelSemester.createLiteral(period.get("name").toString()));			
			if(firstPeriod.get("category").equals("General Teaching"))
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"GeneralCourse"));
			if(firstPeriod.get("category").equals("Technical Teaching"))
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"TechnicalCourse"));
			if(firstPeriod.get("category").equals("Language Teaching"))
				eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"LanguageCourse"));
			
			JSONArray contriArray = (JSONArray)firstPeriod.get("contributorList");
			for(int j =0; j<contriArray.size();j++)
			{
				JSONObject contriObject = (JSONObject)contriArray.get(j);
				JSONObject roleObject = (JSONObject) contriObject.get("role");
				JSONObject peopleObject = (JSONObject)roleObject.get("people");
				Long peopleID = (Long)peopleObject.get("id");
				String eachPeopleURI = peopleURI+peopleID;
				Resource eachPeople = modelPeople.getResource(eachPeopleURI);
				
				//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
				if(!modelPeople.containsResource(eachPeople))
				{					
					eachPeople.addProperty(RDF.type, FOAF.Person);
					if(peopleObject.get("firstname")!= null)
						eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
					if(peopleObject.get("lastname")!= null)
						eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
					peopleBag.add(eachPeople);
				}
				
				
				eachPeople.addProperty(modelAIISO.getProperty(AIISO_URL+"responsibleFor"), eachCourse);
				
				eachCourse.addProperty(modelAIISO.getProperty(AIISO_URL+"responsibilityOf"), eachPeople);
				//peopleBag.add(eachPeople);				
			}
			semesterBag.add(eachSem);
			//courseBag.add(eachCourse);
		}*/
		
		//---------COURSE SESSIONS----------
		/*JSONObject cSessionObject = (JSONObject)parser.parse(new FileReader(cSessionFile));
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
				Resource eachCourse = modelCourse.getResource(eachCourseURI);
				
				//eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
				boolean c1 = !modelCourse.containsResource(eachCourse);
				if(c1)
				{	
					eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));
					eachCourse.addProperty(RDFS.label, modelCourse.createLiteral(periodObject.get("display_value").toString(),"en"));
					eachCourse.addLiteral(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(periodObject.get("code").toString()));
					courseBag.add(eachCourse);					
				}
								
				JSONObject sePeriodObject = (JSONObject)periodObject.get("period");
				String semesterName = sePeriodObject.get("name").toString();
				String eachSemURI = semesterURI +semesterName;
				Resource eachSem = modelSemester.getResource(eachSemURI);
				
				//eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
				eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));
				
				eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
				eachSem.addProperty(RDFS.label, modelSemester.createLiteral(sePeriodObject.get("name").toString()));
				
				JSONArray sessionArray = (JSONArray)periodObject.get("sessionList");
				for(int k=0;k<sessionArray.size();k++)
				{
					JSONObject sessionObject = (JSONObject)sessionArray.get(k);
					Long sessionID = (Long)sessionObject.get("id");
					String eachSessionURI = courseSessionURI +sessionID;
					Resource eachSession = modelCSession.createResource(eachSessionURI);//dung cham khi khoi tao o cho khac
					eachSession.addProperty(RDF.type, modelREVE.getResource(REVE_URL +"CourseSession"));
					eachSession.addProperty(modelREVE.getProperty(REVE_URL+"isConstituentOf"), eachCourse);
					eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasConstituent"), eachSession);
					
					Resource interval = modelCSession.createResource();
					Resource beginInstant = modelCSession.createResource();
					Resource endInstant = modelCSession.createResource();
					interval.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"ProperInterval"));
					beginInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
					endInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
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
							JSONObject peoObject = (JSONObject)contriArray.get(l);
							JSONObject detailPeoObject = (JSONObject)peoObject.get("people");
							String idPeople = detailPeoObject.get("id").toString();
							String eachPeopleURI = peopleURI + idPeople;
							Resource eachPeople = modelSemester.getResource(eachPeopleURI);
							
							//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
							if(!modelPeople.containsResource(eachPeople))
							{
								if(!modelPeople.contains(eachPeople, FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString())))
								{
								eachPeople.addProperty(RDF.type, FOAF.Person);
								eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString()));
								eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(detailPeoObject.get("lastname").toString()));
								peopleBag.add(eachPeople);
								}
							}
							eachSession.addProperty(modelLODE.getProperty(LODE_URL+"involvedAgent"), eachPeople);
							//peopleBag.add(eachPeople);							
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
								eachRoom.addProperty(RDF.type, modelROOMS.getResource(ROOMS_URL +"Room"));
								eachRoom.addProperty(RDFS.label, modelRoom.createLiteral(respRoomObject.get("label_en").toString()));
								eachSession.addProperty(modelLODE.getProperty(LODE_URL+"atTime"), interval);
								
								roomBag.add(eachRoom);
							}
						}
					}
					cSessionBag.add(eachSession);
				}
			}
			
		}	*/
		
		//---------COURSE SESSIONS 2012 ----------
				//JSONObject cSessionObject2012 = (JSONObject)parser.parse(new FileReader(cSessionFile2012));
				/*JSONArray cSessionArray2012 = (JSONArray) cSessionObject2012.get("response");
				
				for(int i =0; i<cSessionArray2012.size();i++)
				{
					JSONObject resObject = (JSONObject)cSessionArray2012.get(i);
					JSONArray periodListArray = (JSONArray)resObject.get("periodList");
					for(int j=0;j<periodListArray.size();j++)
					{
						JSONObject periodObject = (JSONObject)periodListArray.get(j);
						Long id =(Long)periodObject.get("id");
						String eachCourseURI = courseURI +id;
						
						Resource eachCourse;
						ResIterator resI = modelCourse.listResourcesWithProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(periodObject.get("code").toString()));
						//eachCourse = = modelCourse.listResourcesWithProperty(modelAIISO.getProperty(AIISO_URL+"code"), modelCourse.createLiteral(periodObject.get("code").toString()));
						if (resI.hasNext())
						{
							//List<Resource> listRes = resI.toList();
							eachCourse = resI.nextResource();
						}
						else
						{
							eachCourse = modelCourse.getResource(eachCourseURI);
						//eachCourse = modelCourse.createResource(eachCourseURI);//dung cham khi khoi tao o cho khac
						boolean c1 = !modelCourse.containsResource(eachCourse);
						if(c1)
						{	
							eachCourse.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Course"));
							eachCourse.addProperty(RDFS.label, modelCourse.createLiteral(periodObject.get("display_value").toString(),"en"));
							eachCourse.addLiteral(modelAIISO.getProperty(AIISO_URL+"code"),modelCourse.createLiteral(periodObject.get("code").toString()));
							courseBag.add(eachCourse);					
						}
						}				
						JSONObject sePeriodObject = (JSONObject)periodObject.get("period");
						String semesterName = sePeriodObject.get("name").toString();
						String eachSemURI = semesterURI +semesterName;
						Resource eachSem = modelSemester.getResource(eachSemURI);
						
						//eachSem = modelSemester.createResource(eachSemURI);//dung cham khi khoi tao o cho khac
						eachSem.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Semester"));
						
						eachSem.addProperty(modelREVE.getProperty(REVE_URL+"hasAvailableCourse"), eachCourse);
						eachSem.addProperty(RDFS.label, modelSemester.createLiteral(sePeriodObject.get("name").toString()));
						
						JSONArray sessionArray = (JSONArray)periodObject.get("sessionList");
						for(int k=0;k<sessionArray.size();k++)
						{
							JSONObject sessionObject = (JSONObject)sessionArray.get(k);
							Long sessionID = (Long)sessionObject.get("id");
							String eachSessionURI = courseSessionURI +sessionID;
							Resource eachSession = modelCSession.createResource(eachSessionURI);//dung cham khi khoi tao o cho khac
							eachSession.addProperty(RDF.type, modelREVE.getResource(REVE_URL +"CourseSession"));
							eachSession.addProperty(modelREVE.getProperty(REVE_URL+"isConstituentOf"), eachCourse);
							eachCourse.addProperty(modelREVE.getProperty(REVE_URL+"hasConstituent"), eachSession);
							
							Resource interval = modelCSession.createResource();
							Resource beginInstant = modelCSession.createResource();
							Resource endInstant = modelCSession.createResource();
							interval.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"ProperInterval"));
							beginInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
							endInstant.addProperty(RDF.type, modelTIME.getResource(TIME_URL+"Instant"));
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
									JSONObject peoObject = (JSONObject)contriArray.get(l);
									JSONObject detailPeoObject = (JSONObject)peoObject.get("people");
									String idPeople = detailPeoObject.get("id").toString();
									String eachPeopleURI = peopleURI + idPeople;
									Resource eachPeople = modelSemester.getResource(eachPeopleURI);
									
									//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
									if(!modelPeople.containsResource(eachPeople))
									{
										if(!modelPeople.contains(eachPeople, FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString())))
										{
										eachPeople.addProperty(RDF.type, FOAF.Person);
										eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(detailPeoObject.get("firstname").toString()));
										eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(detailPeoObject.get("lastname").toString()));
										peopleBag.add(eachPeople);
										}
									}
									eachSession.addProperty(modelLODE.getProperty(LODE_URL+"involvedAgent"), eachPeople);
									//peopleBag.add(eachPeople);							
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
										eachRoom.addProperty(RDF.type, modelROOMS.getResource(ROOMS_URL +"Room"));
										eachRoom.addProperty(RDFS.label, modelRoom.createLiteral(respRoomObject.get("label_en").toString()));
										eachSession.addProperty(modelLODE.getProperty(LODE_URL+"atTime"), interval);
										
										roomBag.add(eachRoom);
									}
								}
							}
							cSessionBag.add(eachSession);
						}
					}
					
				}	*/
				
		//----------TEACHERS----------
		//JSONObject teacherObject = (JSONObject)parser.parse(new FileReader(teacherFile));
		/*JSONArray teacherArray = (JSONArray) teacherObject.get("response");
		
		for(int i =0; i<teacherArray.size();i++)
		{
			JSONObject resPeopleObject = (JSONObject)teacherArray.get(i);
			JSONObject peopleObject = (JSONObject)resPeopleObject.get("people");
			String peopleID = peopleObject.get("id").toString();
			String eachPeopleURI = peopleURI + peopleID;
			
			//String teacherID = resPeopleObject.get("id").toString();
			//String eachTeacherURI = teacherURI+teacherID;
			//Resource eachTeacher = modelTeacher.createResource(eachTeacherURI);
			Resource eachPeople = modelPeople.getResource(eachPeopleURI);
			
			//eachPeople = modelPeople.createResource(eachPeopleURI);//dung cham khi khoi tao o cho khac
						
			if(!modelPeople.containsResource(eachPeople))
			{
				eachPeople.addProperty(RDF.type, FOAF.Person);				
				if(peopleObject.get("firstname")!= null)
					eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
				if(peopleObject.get("lastname")!= null)
					eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
				peopleBag.add(eachPeople);
			}
			eachPeople.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Teacher"));
			if(peopleObject.get("picture")!=null)
				eachPeople.addProperty(FOAF.img, modelPeople.createLiteral(peopleObject.get("picture").toString()));
			//peopleBag.add(eachPeople);
			
			//---
			Long roleId = (Long) resPeopleObject.get("id");
			String eachRoleURI = roleURI + roleId;
			Resource eachRole = modelRole.getResource(eachRoleURI);
						
			if(!modelRole.containsResource(eachRole))
			{
				eachRole.addProperty(RDF.type, modelPART.getResource(PART_URL+"Role"));				
			}
			if(!modelRole.contains(eachRole, modelPART.getProperty(PART_URL+"holder"), eachPeople))
				eachRole.addProperty(modelPART.getProperty(PART_URL+"holder"), eachPeople);
			
			if(!modelPeople.contains(eachPeople, modelPART.getProperty(PART_URL+"holder_of"), eachRole))
				eachPeople.addProperty(modelPART.getProperty(PART_URL+"holder_of"), eachRole);
			//---
		}*/
		
		//------------RESEARCHER (ROLES)--------
		//JSONObject researcherObject = (JSONObject)parser.parse(new FileReader(researcherFile));
		/*JSONArray researcherArray = (JSONArray) researcherObject.get("response");
		
		for(int i =0; i<researcherArray.size();i++)
		{
			JSONObject researcher = (JSONObject) researcherArray.get(i);
			Long researcherId = (Long) researcher.get("id");
			String eachRoleURI = roleURI +researcherId;
			Resource eachRole = modelRole.getResource(eachRoleURI);
			
			String peopleID = researcher.get("people_id").toString();
			String eachPeopleURI = peopleURI + peopleID;
			Resource eachPeople= modelPeople.getResource(eachPeopleURI);
			JSONObject peopleObject = (JSONObject) researcher.get("people");
			
			if(!modelRole.containsResource(eachRole))
			{
				eachRole.addProperty(RDF.type, modelPART.getResource(PART_URL+"Role"));				
			}
			if(!modelRole.contains(eachRole, modelPART.getProperty(PART_URL+"holder"), eachPeople))
				eachRole.addProperty(modelPART.getProperty(PART_URL+"holder"), eachPeople);
			if(!modelPeople.containsResource(eachPeople))
			{
				eachPeople.addProperty(RDF.type, FOAF.Person);
				if(peopleObject.get("firstname")!=null)
				eachPeople.addProperty(FOAF.firstName, modelPeople.createLiteral(peopleObject.get("firstname").toString()));
				if(peopleObject.get("lastname")!=null)
				eachPeople.addProperty(FOAF.family_name, modelPeople.createLiteral(peopleObject.get("lastname").toString()));
			}
			if(!modelPeople.contains(eachPeople, modelPART.getProperty(PART_URL+"holder_of"), eachRole))
				eachPeople.addProperty(modelPART.getProperty(PART_URL+"holder_of"), eachRole);
						
			String comment = "";
			if(peopleObject.get("education_en")!=null)
				comment += "Education: " + peopleObject.get("education_en").toString();
			if(peopleObject.get("experience_en")!=null)
				comment += "Experience: " + peopleObject.get("experience_en").toString();
			
			if(comment!=null)
				eachPeople.addProperty(RDFS.comment, modelPeople.createLiteral(comment));
			
			if(researcher.get("begindate")!=null)
				eachRole.addProperty(modelPART.getProperty(PART_URL+"startDate"), modelRole.createTypedLiteral(researcher.get("begindate"), XSDDatatype.XSDdate));
			if(researcher.get("enddate")!=null)
				eachRole.addProperty(modelPART.getProperty(PART_URL+"endDate"), modelRole.createTypedLiteral(researcher.get("enddate"), XSDDatatype.XSDdate));
			
			if(researcher.get("type").toString().equals("teacher"))
				eachRole.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Teacher"));
			if(researcher.get("type").toString().equals("researcher"))
				eachRole.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"Researcher"));
			if(researcher.get("type").toString().equals("phd"))
				eachRole.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"DoctoralStudent"));
			
			if(researcher.get("department")!=null)
			{
				JSONObject departmentObject = (JSONObject) researcher.get("department");
				Long departmentId = (Long) departmentObject.get("id");
				String eachDepartmentURI = departmentURI+departmentId;
				Resource eachDepartment = modelDepartment.createResource(eachDepartmentURI);
				
				if(departmentObject.get("type").equals("research"))
					eachDepartment.addProperty(RDF.type, modelREVE.getResource(REVE_URL+"ResearchUnit"));
				else
					eachDepartment.addProperty(RDF.type, modelAIISO.getResource(AIISO_URL+"Department"));
				eachDepartment.addProperty(RDFS.label, modelDepartment.createLiteral(departmentObject.get("label_en").toString(), "en"));
				eachRole.addProperty(modelPART.getProperty(PART_URL+"role_at"), eachDepartment);
			}
		}*/
		
		
		
		
		
		/*try
		{
			FileOutputStream fout=new FileOutputStream("E:\\Eclipse\\OutputFile\\track.rdf");
			modelTrack.write(fout);
			FileOutputStream foutP=new FileOutputStream("E:\\Eclipse\\OutputFile\\people.rdf");
			modelPeople.write(foutP);
			FileOutputStream foutCourse=new FileOutputStream("E:\\Eclipse\\OutputFile\\course.rdf");
			modelCourse.write(foutCourse);
			FileOutputStream foutSemester=new FileOutputStream("E:\\Eclipse\\OutputFile\\semester.rdf");
			modelSemester.write(foutSemester);
			FileOutputStream foutCourseSession=new FileOutputStream("E:\\Eclipse\\OutputFile\\courseSession.rdf");
			modelCSession.write(foutCourseSession);
			FileOutputStream foutCCreditFT=new FileOutputStream("E:\\Eclipse\\OutputFile\\courseCreditForTrack.rdf");
			modelCCreditFT.write(foutCCreditFT);
			FileOutputStream foutRole=new FileOutputStream("E:\\Eclipse\\OutputFile\\role.rdf");
			modelRole.write(foutRole);
			FileOutputStream foutDepartment=new FileOutputStream("E:\\Eclipse\\OutputFile\\department.rdf");
			modelDepartment.write(foutDepartment);
			//FileOutputStream foutTeacher=new FileOutputStream("E:\\Eclipse\\OutputFile\\teacher.rdf");
			//modelTeacher.write(foutTeacher);
			FileOutputStream foutInternship=new FileOutputStream("E:\\Eclipse\\OutputFile\\internship.rdf");
			modelInternship.write(foutInternship);
			FileOutputStream foutCompany=new FileOutputStream("E:\\Eclipse\\OutputFile\\company.rdf");
			modelCompany.write(foutCompany);
		}
		catch(IOException e)			
		{
			System.out.println("Exception caught"+e.getMessage());
		}*/
	}
}

