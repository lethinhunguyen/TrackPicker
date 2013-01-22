package website.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.openrdf.Sesame;
//import org.openrdf.Sesame.repository.remote;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryException;
import org.openrdf.repository.http.HTTPRepository;
import org.openrdf.repository.sail.SailRepository;
import org.openrdf.sail.memory.MemoryStore;
import org.openrdf.model.Value;
import org.openrdf.query.BindingSet;
import org.openrdf.query.GraphQuery;
import org.openrdf.query.GraphQueryResult;
import org.openrdf.query.MalformedQueryException;
import org.openrdf.query.QueryEvaluationException;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;

public class HomeServlet extends HttpServlet {

	private Logger logger = Logger.getLogger(this.getClass());
	public int credit = 90;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		PrintWriter writer = resp.getWriter();
		writer.println("<h1>Hello, World!</h1>");
		
		//req.setAttribute("credit", credit);
		//req.getRequestDispatcher("/home.jsp").forward(req, resp);
				
		String sesameServer = "http://localhost:8080/openrdf-sesame/";
		String repositoryID = "reve1";
		
		Repository myRepository = new HTTPRepository(sesameServer, repositoryID);
		try {
			myRepository.initialize();
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
				
		String query="SELECT ?course ?track WHERE { ?course REVE:isFreeFor ?track}";
		RepositoryConnection con;
		try {
			con = myRepository.getConnection();
			try {
				TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, query);
				TupleQueryResult tupleQueryResult = tupleQuery.evaluate();
				//ArrayList<HashMap<Value, String>> list = new ArrayList<HashMap<Value, String>>();
				while(tupleQueryResult.hasNext())
				{
					BindingSet bindingSet = tupleQueryResult.next();
					List<String> bindingNames = tupleQueryResult.getBindingNames();
					String v1 = bindingSet.getValue(bindingNames.get(0)).toString();
					writer.println(v1.toString());
					//req.setAttribute("v1", v1);
					//req.getRequestDispatcher("/home").forward(req, resp);
					/*HashMap<Value, String> hm = new HashMap<Value, String>();
					for(Object n:bindingNames)
					{
						hm.put(bindingSet.getValue(bindingNames.get(0)), bindingNames.get(1));
					}
					list.add(hm);*/
				
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
				
			} catch (MalformedQueryException | QueryEvaluationException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.debug("HomeServlet.doGet()");
	}

}		
	
