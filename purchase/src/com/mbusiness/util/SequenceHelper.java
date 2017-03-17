package com.mbusiness.util;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.model.Sequence;

public class SequenceHelper {

	private List<Sequence> sequences;
	private int value;
	
	public int currentValue(String name, Session ss){
		sequences = ss.createSQLQuery("select * from sequence where status=1 and name='"+ name +"'").addEntity(Sequence.class).list();
		if(!sequences.isEmpty()){
			value = sequences.get(0).getCurrents();
		}else{
			value = -1;
		}
		return value;
	}
	
	public int nextValue(String name, Session ss){
		sequences = ss.createSQLQuery("select * from sequence where status=1 and name='"+ name +"'").addEntity(Sequence.class).list();
		if(!sequences.isEmpty()){
			value = sequences.get(0).getCurrents() + sequences.get(0).getIncrement();
			sequences.get(0).setCurrents(value);
		}else{
			value = -1;
		}
		return value;
	}
	
	public void reset(String name, int current){
		HibernateUtil_new.closeSession();
		Session ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		Query q = ss.createSQLQuery("update sequence set current="+ current +" where status=1 and name='"+ name +"'");
		q.executeUpdate();
		ss.getTransaction().commit();
		HibernateUtil_new.closeSession();
	}
}
