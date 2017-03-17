package com.mbusiness.kingdee.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.hibernate.Session;

import com.mbusiness.util.GetK3CloudData;

public class OrgListener implements ServletContextListener{
	private Session session;
	private ScheduledExecutorService executor; 
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		  		 
		start();
	}
	
	public void start(){
		
		Runnable task = new Runnable(){
			@Override
			public void run() {
				try {
					GetK3CloudData.queryOrg(session);
				}catch (Exception e) {  
                    e.printStackTrace();  
                }
			}
		};
		executor = Executors.newScheduledThreadPool(1);
		long oneDay = 24 * 60 * 60 * 1000;  
	    long initDelay  = getTimeMillis("23:00:00") - System.currentTimeMillis();  
	    initDelay = initDelay > 0 ? initDelay : oneDay + initDelay;  
	  
	    executor.scheduleAtFixedRate(  
	            task,  
	            initDelay,  
	            oneDay,  
	            TimeUnit.MILLISECONDS); 
	}
	/** 
	 * 获取指定时间对应的毫秒数 
	 * @param time "HH:mm:ss" 
	 * @return 
	 */  
	private static long getTimeMillis(String time) {  
	    try {  
	        DateFormat dateFormat = new SimpleDateFormat("yy-MM-dd HH:mm:ss");  
	        DateFormat dayFormat = new SimpleDateFormat("yy-MM-dd");  
	        Date curDate = dateFormat.parse(dayFormat.format(new Date()) + " " + time);  
	        return curDate.getTime();  
	    } catch (ParseException e) {  
	        e.printStackTrace();  
	    }  
	    return 0;  
	}  
	
}
