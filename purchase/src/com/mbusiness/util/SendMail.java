package com.mbusiness.util;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.model.Mailset;
import com.mbusiness.model.Sendmailinfo;
import com.mbusiness.model.Smsmails;

public class SendMail {
	
	private MMessage mmessage = new MMessage();
	private List<Sendmailinfo> sendmailinfos = new ArrayList<Sendmailinfo>();

	public void send(Session session, String content, String title, int type){
		if(type == 0){
			type = 1;
		}
		List<Mailset> ms = session.createSQLQuery("select * from mailset where status=1 order by -id").addEntity(Mailset.class).list();
		if(!ms.isEmpty()){
			Sendmailinfo s = new Sendmailinfo();
			s.setContent("");
			s.setTitle("");
			s.setZdy1(ms.get(0).getHost());
			s.setZdy2(ms.get(0).getPassword());
			s.setToaddress(ms.get(0).getUsername());
			sendmailinfos.add(s);
			List<Smsmails> sms = session.createSQLQuery("select * from smsmails where status=1 and type="+ type).addEntity(Smsmails.class).list();
			if(!sms.isEmpty()){
				for(int i=0;i<sms.size();i++){
					s = new Sendmailinfo();
					s.setContent(content +"["+ mmessage.corporation +"]");
					s.setTitle(title);
					s.setToaddress(sms.get(i).getMail());
					sendmailinfos.add(s);
				}
				new Thread(new sending()).start();				
			}
		}
	}
	
	class sending implements Runnable{

		@Override
		public void run() {
			// TODO Auto-generated method stub
			Sendmailnew_1 sendmail = new Sendmailnew_1();
			sendmail.send(sendmailinfos, 0);
		}
		
	}
}
