package com.mbusiness.util;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.hibernate.Session;

import com.mbusiness.model.Mailset;
import com.mbusiness.model.Sendmailinfo;
import com.mbusiness.model.Smsmails;
import com.mbusiness.util.HibernateUtil_new;

public class MonitornoteListener  implements ServletContextListener{

	private Session session;
	private int monitortime = 30;
	private ScheduledExecutorService executor; 
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		  		 
		start();
	}
	
	public void start(){
		
		Runnable task = new Runnable(){
			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					senddata();
				}catch (Exception e) {  
                    e.printStackTrace();  
                }
			}
		};
		executor = Executors.newScheduledThreadPool(1);
		executor.scheduleWithFixedDelay(task, 1000*10, monitortime*1000, TimeUnit.MILLISECONDS);
	}
	
	public void senddata(){
		int flag = 0;
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();			
		MMessage mmessage = new MMessage();
		List<Sendmailinfo> sendmailinfos = new ArrayList<Sendmailinfo>(); 
		List<Object> us = session.createSQLQuery("select id from user where status=1 and servicestatus=1").list();
		if(!us.isEmpty()){
			List<Object> o1 = session.createSQLQuery("select touserids from note where status=1 and replynum=0 and DATE_ADD(createdate,INTERVAL "+ monitortime*4 +" SECOND)<NOW() and DATE_ADD(createdate,INTERVAL "+ monitortime*6 +" SECOND)>NOW()").list();
			if(!o1.isEmpty()){
				for(int i=0;i<o1.size();i++){
					for(int j=0;j<us.size();j++){
						if(o1.get(i).toString().equalsIgnoreCase(","+ us.get(j).toString() +",")){
							flag = 1;
							break;
						}
					}
				}
			}
			if(flag == 0){
				List<Object> o2 = session.createSQLQuery("select touserid from notereply where status=1 and DATE_ADD(createdate,INTERVAL "+ monitortime*4 +" SECOND)<NOW() and DATE_ADD(createdate,INTERVAL "+ monitortime*6 +" SECOND)>NOW()").list();
				if(!o2.isEmpty()){
					for(int i=0;i<o2.size();i++){
						for(int j=0;j<us.size();j++){
							if(o2.get(i).toString().equalsIgnoreCase(us.get(j).toString())){
								flag = 1;
								break;
							}
						}
					}
				}
			}
			if(flag == 1){
				List<Mailset> ms = session.createSQLQuery("select * from mailset where status=1 order by -id").addEntity(Mailset.class).list();
				if(!ms.isEmpty()){
					Sendmailinfo s = new Sendmailinfo();
					s.setContent("");
					s.setTitle("");
					s.setZdy1(ms.get(0).getHost());
					s.setZdy2(ms.get(0).getPassword());
					s.setToaddress(ms.get(0).getUsername());
					sendmailinfos.add(s);
					List<Smsmails> sms = session.createSQLQuery("select * from smsmails where status=1 and type=1").addEntity(Smsmails.class).list();
					if(!sms.isEmpty()){
						for(int i=0;i<sms.size();i++){
							s = new Sendmailinfo();
							s.setContent("Ð»Ð»");
							s.setTitle("ÓÐÈËÁôÑÔ£¬Çë»Ø¸´["+ mmessage.corporation +"]");
							s.setToaddress(sms.get(i).getMail());
							sendmailinfos.add(s);
						}
						Sendmailnew_1 sendmail = new Sendmailnew_1();
						sendmail.send(sendmailinfos, 0);
					}
				}
			}
		}
		HibernateUtil_new.closeSession();		
	}	
}
