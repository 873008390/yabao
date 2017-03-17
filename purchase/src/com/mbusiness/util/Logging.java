package com.mbusiness.util;

import java.util.Date;

import org.hibernate.Session;

import com.mbusiness.model.Log;

public class Logging {

	public void log(int userid,String type,String operation,String ip,Session session){
		Log l = new Log();
		l.setCreatedate(new Date());
		l.setIp(ip);
		l.setOperation(operation);
		l.setType(type);
		l.setUserid(userid);
		session.save(l);
	}
}
