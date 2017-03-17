package com.mbusiness.util;

import java.io.FileOutputStream;
import sun.misc.BASE64Decoder;

public class String2Image {

	/** 
	 * ͨ��BASE64Decoder���룬������ͼƬ 
	 * @param imgStr ������string 
	 */  
	private boolean result;
	
	public boolean string2Image(String imgStr, String imgFilePath) { 
		// ���ֽ������ַ�������Base64���벢����ͼƬ  
		byte[] b;
	    if (imgStr == null)  
	        return false;  
	    try {  
	        // Base64����  
	        b = new BASE64Decoder().decodeBuffer(imgStr);  
	        for (int i = 0; i < b.length; ++i) {  
	            if (b[i] < 0) {  
	                // �����쳣����  
	                b[i] += 256;  
	            }  
	        }  
	        // ����JpegͼƬ  
	        FileOutputStream out = new FileOutputStream(imgFilePath);  
	        out.write(b);  
	        out.flush();  
	        out.close();
	    } catch (Exception e) {  
	        result = false;  
	    } finally{
	    	b = null;
	        imgStr = null;
	        result = true;
	    }
	    return result;
	}   
}
