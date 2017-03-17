package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.KeyvalueListDAO;
import com.mbusiness.model.Keyvalue;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.MMessage;

public class KeyvalueListImpl implements KeyvalueListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Keyvalue> keyvalues;
	
	@Override
	public List<Keyvalue> list(Usersession usersession, int type) {
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		if (!usersession.getUsername().equalsIgnoreCase("")){
			keyvalues = ss.createSQLQuery("select * from keyvalue where status=1 and type="+ type +" order by id").addEntity(Keyvalue.class).list();
			if(keyvalues.isEmpty()){
				Keyvalue a = new Keyvalue();
				a.setKeyname(mmessage.nodata);	
				a.setId(0);
				keyvalues.add(a);
			}
		}else{
			keyvalues = new ArrayList<Keyvalue>();
			if (keyvalues.isEmpty()){
				Keyvalue a = new Keyvalue();
				a.setKeyname(mmessage.notlogin);	
				a.setId(0);
				keyvalues.add(a);
			}
		}
		
		HibernateUtil_new.closeSession();
		return keyvalues;
	}

}
