package com.mbusiness.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class Savebase64data {

	public void savedata(String data, String path){
		File f;
		BufferedWriter output;
		FileWriter fw;
		try {  
            f = new File(path);  
            if (!f.exists()) {  
                f.createNewFile();// 不存在则创建  
            } 
            fw = new FileWriter(f);
            output = new BufferedWriter(fw);  
            output.write(data);  
            output.close();  
        } catch (Exception e) {             
  
        } finally{
        	f = null;
        	output = null;
        	fw = null;
        	data = null;
        	path = null;
        }
	}
}
