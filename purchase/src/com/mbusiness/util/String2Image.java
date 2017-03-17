package com.mbusiness.util;

import java.io.FileOutputStream;
import sun.misc.BASE64Decoder;

public class String2Image {

	/** 
	 * 通过BASE64Decoder解码，并生成图片 
	 * @param imgStr 解码后的string 
	 */  
	private boolean result;
	
	public boolean string2Image(String imgStr, String imgFilePath) { 
		// 对字节数组字符串进行Base64解码并生成图片  
		byte[] b;
	    if (imgStr == null)  
	        return false;  
	    try {  
	        // Base64解码  
	        b = new BASE64Decoder().decodeBuffer(imgStr);  
	        for (int i = 0; i < b.length; ++i) {  
	            if (b[i] < 0) {  
	                // 调整异常数据  
	                b[i] += 256;  
	            }  
	        }  
	        // 生成Jpeg图片  
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
