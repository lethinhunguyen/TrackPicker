package website.web;

import java.awt.List;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openrdf.Sesame;
import org.openrdf.query.BindingSet;
import org.openrdf.query.MalformedQueryException;
import org.openrdf.query.QueryEvaluationException;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryException;
import org.openrdf.repository.http.HTTPRepository;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HomeServlet extends HttpServlet {

	public int totalC3S = 90;
	public int technicalC3S = 60;
	public int madatoryC3S = 25;
	public int optionalC3S = 18;
	public int non_technicalC3S = 12;
	public int languageC3S = 6;
	public int c = 0;
	private Logger logger = LogManager.getLogger(this.getClass());
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// super.doGet(req, resp);
		PrintWriter writer = resp.getWriter();
		writer.println("<h1>Hello, World!</h1>");

		req.setAttribute("totalC3S", totalC3S);
		req.setAttribute("technicalC3S", technicalC3S);
		req.setAttribute("madatoryC3S", madatoryC3S);
		req.setAttribute("optionalC3S", optionalC3S);
		req.setAttribute("non_technicalC3S", non_technicalC3S);
		req.setAttribute("languageC3S", languageC3S);
		
		
		String sesameServer = "http://localhost:8080/openrdf-sesame";
		String repositoryID = "REVE2";
		Repository myRepository = null;
		try {
			myRepository = new HTTPRepository(sesameServer, repositoryID);
			//writer.println("Repo create");
			myRepository.initialize();
			//writer.println("Repo initialized");						
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
				
		String query="PREFIX AIISO:<http://vocab.org/aiiso/schema#> SELECT ?course ?code WHERE { ?course AIISO:code ?code}";
		RepositoryConnection con;
		try {
			con = myRepository.getConnection();
			try {
					TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, query);
					TupleQueryResult tupleQueryResult = tupleQuery.evaluate();
					//ArrayList<HashMap<Value, String>> list = new ArrayList<HashMap<Value, String>>();
					//ArrayList<String> arrayCourse = new ArrayList<String>();
					//String[] arrayCourse = new String[20];
					ArrayList<String> arrayCourse = new ArrayList<>();
					int i=0;
					while(tupleQueryResult.hasNext())
					{
						BindingSet bindingSet = tupleQueryResult.next();
						java.util.List<String> bindingNames = tupleQueryResult.getBindingNames();
						String v1 = bindingSet.getValue(bindingNames.get(0)).toString();
						String v2 = bindingSet.getValue(bindingNames.get(1)).toString();
						//arrayCourse[i]=v2;
						arrayCourse.add(v2);
						i++;
						//writer.println(v2);
						//writer.println(v2.toString());
						//req.setAttribute("v2", v2);
						//req.getRequestDispatcher("/home.jsp").forward(req, resp);
						/*HashMap<Value, String> hm = new HashMap<Value, String>();
						for(Object n:bindingNames)
						{
							hm.put(bindingSet.getValue(bindingNames.get(0)), bindingNames.get(1));
						}
						list.add(hm);
					
					}
				
					/*HashMap<Value, String> hm1 = list.get(0);
					Set set =hm1.entrySet();
					Iterator i = set.iterator();
					String me1 = new String();
					String me2;
					while(i.hasNext())
					{
						Map.Entry me = (Map.Entry) i.next();
						me1 = me.getKey().toString();
						me2 = me.getValue().toString();						
					}
					req.setAttribute("me1", me1);
					req.getRequestDispatcher("/home.jsp").forward(req, resp);*/
					}
					c = arrayCourse.size();
					
					req.setAttribute("c", c);
					//writer.println(c);
					req.setAttribute("arrayCourse", arrayCourse);
			}
				catch (MalformedQueryException | QueryEvaluationException e1)
				{
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		try {
//			logger.debug("HomeServlet.doGet()");
//			writer.println("<h1>Used logger</h1>");
//		}
//		finally {
//			
//		}
		
		req.getRequestDispatcher("/home.jsp").forward(req, resp);
		//RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/home.jsp");
		//dispatcher.forward(req, resp);
	}

}
