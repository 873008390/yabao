package com.mbusiness.util;

import java.io.File;
import java.io.FileInputStream;

public class VariableUtil {
	 public static String POST_K3CloudURL = readTextData();
	 public static String dbId;
     public static String uid;
     public static String pwd;
     
     public static String readTextData(){
    	 
    	 String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
 		 String substring = path.substring(0,path.length()-16) + "config/variableutil.txt";
 		
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
	  	         String[] datas = str.split(";");
	  	         Base64 base64 = new Base64();
	  	         for(int i=0; i<datas.length; i++){
	  	        	 String key = datas[i].split("=")[0];
	  				 String value = datas[i].split("=")[1];
	  				 if("POST_K3CloudURL".equalsIgnoreCase(key.trim())){
	  					POST_K3CloudURL = value.trim();
	  				 }else if("dbId".equalsIgnoreCase(key.trim())){
	  					dbId = value.trim();
	  				 }else if("uid".equalsIgnoreCase(key.trim())){
	  					uid = base64.decode(value.trim().substring(4, value.trim().length()-4));
	  							
	  				 }else if("pwd".equalsIgnoreCase(key.trim())){
	  					pwd = base64.decode(value.trim().substring(4, value.trim().length()-4));
	  				 }
	  	         }
	  	        
			}catch (Exception e) {
				e.printStackTrace();
			} 
 		   	
 		 }
 			 
      	return POST_K3CloudURL;
 		 
     }
     
}
