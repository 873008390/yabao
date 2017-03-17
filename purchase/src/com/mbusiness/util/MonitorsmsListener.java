package com.mbusiness.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.hibernate.Query;
import org.hibernate.Session;

import com.mbusiness.model.Mailset;
import com.mbusiness.model.Sendmailinfo;
import com.mbusiness.model.Smsmails;
import com.mbusiness.util.HibernateUtil_new;

public class MonitorsmsListener  implements ServletContextListener{

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
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();			
		MMessage mmessage = new MMessage();
		List<Sendmailinfo> sendmailinfos = new ArrayList<Sendmailinfo>(); 
		String errorphones = "";
		List<Object> o = session.createSQLQuery("select imei from sendsmsphone where status=1").list();
		if(!o.isEmpty()){
			String phones = "";
			for(int i=0;i<o.size();i++){
				if(phones.equalsIgnoreCase("")){
					phones = o.get(i).toString();
				}else{
					phones = phones +"','"+ o.get(i).toString();
				}
			}
			List<Object> o1 = session.createSQLQuery("select imei from smsmonitor where imei in('"+ phones +"') and DATE_ADD(lastdate,INTERVAL "+ monitortime +" SECOND)<NOW() and DATE_ADD(lastdate,INTERVAL "+ monitortime*5 +" SECOND)>NOW()").list();
			if(!o1.isEmpty()){				
				for(int j=0;j<o1.size();j++){
					if(errorphones.equalsIgnoreCase("")){
						errorphones = o1.get(j).toString();
					}else{
						errorphones = errorphones +","+ o1.get(j).toString();
					}
				}
				errorphones = "短信设备掉线，请核查imei为:" + errorphones +"的手机";
			}
		}else{
			Query q = session.createSQLQuery("select id from smsmonitor where DATE_ADD(lastdate,INTERVAL "+ monitortime +" SECOND)<NOW() and DATE_ADD(lastdate,INTERVAL "+ monitortime*5 +" SECOND)>NOW()");
			if(!q.list().isEmpty()){
				errorphones = "短信设备掉线，请核查手机";
			}
		}
		if(!errorphones.equalsIgnoreCase("")){
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
					for(int k=0;k<sms.size();k++){
						s = new Sendmailinfo();
						s.setTitle(errorphones +"["+ mmessage.corporation +"]");
						s.setContent((new SimpleDateFormat("HHmmssSSS")).format(new Date())+ "的提示");
						s.setToaddress(sms.get(k).getMail());
						sendmailinfos.add(s);
						//System.err.println("======"+ sms.get(k).getMail());
					}
					Sendmailnew_1 sendmail = new Sendmailnew_1();
					sendmail.send(sendmailinfos, 0);
				}
			}
		}
		HibernateUtil_new.closeSession();
		session = HibernateUtil_new.currentSession();
		session.beginTransaction();
		sendmailinfos = new ArrayList<Sendmailinfo>();
		Query q1 = session.createSQLQuery("select id from smssending where status=1 and sendstatus=2 and DATE_ADD(createdate,INTERVAL 10 SECOND)<NOW() and DATE_ADD(createdate,INTERVAL "+ monitortime*2 +" SECOND)>NOW() order by -id limit 0,1");
		if(!q1.list().isEmpty()){
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
					for(int k=0;k<sms.size();k++){
						s = new Sendmailinfo();
						s.setContent("谢谢");
						s.setTitle("短信发送失败，请核查手机卡是否欠费或其它异常["+ mmessage.corporation +"]");
						s.setToaddress(sms.get(k).getMail());
						sendmailinfos.add(s);
					}
					Sendmailnew_1 sendmail = new Sendmailnew_1();
					sendmail.send(sendmailinfos, 0);
				}
			}
		}
		HibernateUtil_new.closeSession();		
	}	
}
