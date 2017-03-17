package com.mbusiness.util;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import javax.mail.*;
import javax.mail.internet.*;

import com.mbusiness.model.Sendmailinfo;

/**
 * msgsendsample creates a very simple text/plain message and sends it.
 * <p>
 * usage: <code>java msgsendsample <i>to from smtphost true|false</i></code>
 * where <i>to</i> and <i>from</i> are the destination and
 * origin email addresses, respectively, and <i>smtphost</i>
 * is the hostname of the machine that has the smtp server
 * running. The last parameter either turns on or turns off
 * debugging during sending.
 *
 * @author Max Spivak
 */
public class Sendmailnew_1 {
    
	String result="";
	private MMessage mmessage = new MMessage();
	private List<Sendmailinfo> sendmailinfos;
	
	public String send(List<Sendmailinfo> sinfos, int todaytotal){
		sendmailinfos = sinfos;		
		Sending sending = new Sending();
		ExecutorService es = Executors.newFixedThreadPool(100);
				
		//Future<String> fresult = null;
		//fresult = es.submit(sending);
		
		FutureTask<String> fresult = new FutureTask<String>(sending);
		es.execute(fresult);
		
		try {
			result = fresult.get(5, TimeUnit.MINUTES);	
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			System.err.println("======="+ e.getMessage() +",time:"+ (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			System.err.println("======="+ e.getMessage() +",time:"+ (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
		} catch (TimeoutException e) {
			// TODO Auto-generated catch block
			System.err.println("======="+ e.getMessage() +",time:"+ (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
		} finally{
			es.shutdownNow();
			try {
				es.awaitTermination(5, TimeUnit.SECONDS);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				System.err.println("======="+ e.getMessage() +",time:"+ (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
			}
		}
		
		return result;
	}    
	
    class Sending implements Callable<String>{
    	
		@Override
		public String call() {
			// TODO Auto-generated method stub
			String host = sendmailinfos.get(0).getZdy1();
			String username = sendmailinfos.get(0).getToaddress();
			String pwd = sendmailinfos.get(0).getZdy2();
			//auth =   new   Authenticator_1(sendmailinfos.get(0).getToaddress(), sendmailinfos.get(0).getZdy2());
			String from = sendmailinfos.get(0).getToaddress();
			//System.out.println("==========="+ sendmailinfos.get(0).getToaddress() + ","+ sendmailinfos.get(0).getZdy2());
			for(int i=1;i<sendmailinfos.size();i++){
				Properties props=new Properties();
			    props.setProperty("mail.smtp.auth", "true");
			    props.setProperty("mail.transport.protocol", "smtp");
			    props.setProperty("mail.smtp.connectiontimeout", "8000");
				props.setProperty("mail.smtp.timeout", "20000");
				Session session=Session.getInstance(props);
			    session.setDebug(true);
				
				try {
				    // create a message
					Message msg=new MimeMessage(session);
					msg.setSubject(sendmailinfos.get(i).getTitle());
					msg.setText(sendmailinfos.get(i).getContent());
					msg.setFrom(new InternetAddress(from));
					
					Transport transport=session.getTransport();
					transport.connect(host, 25,username,pwd);
					transport.sendMessage(msg, new Address[]{new InternetAddress(sendmailinfos.get(i).getToaddress())});
					transport.close();					    
					System.err.println("=======from:"+ from +",to:"+ sendmailinfos.get(i).getToaddress() +",time:"+ (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
					result = mmessage.sendmailsuccess;
				}catch (Exception e) {
					//e.printStackTrace();
					result = mmessage.sendmailerror;
					System.err.println("======="+ e.getMessage() +",time:"+ (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
					if(i == sendmailinfos.size()-1){
						return "Exception";
					}
				}finally{
					try {
						session.getTransport().close();
					} catch (NoSuchProviderException e) {
						// TODO Auto-generated catch block
						//e.printStackTrace();
						if(i == sendmailinfos.size()-1){
							return "NoSuchProviderException";
						}
					} catch (MessagingException e) {
						// TODO Auto-generated catch block
						//e.printStackTrace();
						if(i == sendmailinfos.size()-1){
							return "MessagingException";
						}
					}
				}			
			}
			return result;	
		} 
    }
}
