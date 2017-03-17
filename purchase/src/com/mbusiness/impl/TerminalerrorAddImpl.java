package com.mbusiness.impl;

import java.util.Date;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.dao.TerminalerrorAddDAO;
import com.mbusiness.model.Terminalerror;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class TerminalerrorAddImpl implements TerminalerrorAddDAO {
	
	private Session session = HibernateUtil_new.currentSession();
	private MMessage mmessage = new MMessage();
	private String result;

	@Override
	public String erroradd(Terminalerror terminalerror) {
		session.beginTransaction();			
		Query q = session.createSQLQuery("select id from terminalerror where status=1 and logtime='"+ terminalerror.getLogtime() +"' and corporationid="+ 1 +" and username='zhenneng' and sourcetype='"+ terminalerror.getSourcetype() +"' and content='"+ terminalerror.getContent() +"'");
		if(q.list().isEmpty()){
			terminalerror.setCreatedate(new Date());
			terminalerror.setStatus(1);		
			terminalerror.setCorporationid(1);
			terminalerror.setUsername("zhenneng");
		    session.save(terminalerror);		        
		    session.getTransaction().commit();	
		}else{
			result = mmessage.dataduplicate;
		}
		HibernateUtil_new.closeSession();
	    result = mmessage.savesuccess;
	    return result;
	}
}
