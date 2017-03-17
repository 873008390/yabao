package com.mbusiness.util;

import java.io.File;
import java.io.FileInputStream;

public class CommonJudgeDB {
	public static String createOrg(){
		 String value = "";
		 String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
 		 String substring = path.substring(0,path.length()-16) + "config/createorg.txt";
 		
 		 File file = new File(substring);
 		 String str = "";
 		 FileInputStream fis = null;
            
 		 if(file.exists()){
			 try {
				fis = new FileInputStream(substring);
				 int length = fis.available(); 
				  	
	  	         byte [] buffer = new byte[length]; 
	  	
	  	         fis.read(buffer); 
	  	         
	  	         fis.close();
	  	         str=new String(buffer,"UTF-8");
	  	         value = str.split("=")[1];
	  	        
			} catch (Exception e) {
				e.printStackTrace();
			}
 		 }
		return value;
	}
	/**
	 * 判断是使用的数据库
	 * @return
	 */
	public static int judgeDB(){
		 int flag = 0;
		 String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
 		 String substring = path.substring(0,path.length()-16) + "config/compatibledb.txt";
 		
 		 File file = new File(substring);
 		 String str = "";
 		 FileInputStream fis = null;
            
 		 if(file.exists()){
			 try {
				fis = new FileInputStream(substring);
				 int length = fis.available(); 
				  	
	  	         byte [] buffer = new byte[length]; 
	  	
	  	         fis.read(buffer); 
	  	         
	  	         fis.close();
	  	         str=new String(buffer,"UTF-8");
	  	         String value = str.split("=")[1];
	  	         if("mysql".equalsIgnoreCase(value.trim())){
	  	        	 flag = 0;
	  	         }else{
	  	        	 flag = 1;
	  	         }
			} catch (Exception e) {
				e.printStackTrace();
			}
 		 }
		return flag;
	}
}
