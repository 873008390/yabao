package com.mbusiness.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.struts2.ServletActionContext;

import com.mbusiness.util.Inputverify;
import com.opensymphony.xwork2.ActionSupport;

public class TerminalheartbeatAction extends ActionSupport {

	private String result = "";
	private boolean success;
	private Inputverify inputverify = new Inputverify();
	private String server;
	private String userid;
	private int force;
	
	public String add(){
		try {
			server = URLDecoder.decode(server, "GBK");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			//e1.printStackTrace();
		}
		if(inputverify.check(server) == 1){
			SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");
			SimpleDateFormat sformat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			FileReader fr;
			BufferedReader bfr;
			String content = "";
			File file;
			try {
				String filename = ServletActionContext.getServletContext().getRealPath("/server/"+ server +".txt");
				file = new File(filename);
				if(!file.exists()){
					file.createNewFile();
					
				}
				fr = new FileReader(file);
				bfr = new BufferedReader(fr);
				String tmp = "";
				String lastuserid = "";
				while((tmp = bfr.readLine()) != null){
					if(tmp.split("=")[0].equalsIgnoreCase("lasttime") && tmp.split("=").length == 3){
						content = tmp.split("=")[1];
						lastuserid = tmp.split("=")[2];
					}
				}
				if(content.equalsIgnoreCase("") || content.length() < 14 || userid.equalsIgnoreCase("0")){
					lastuserid = sformat.format(new Date());
					if(!userid.equalsIgnoreCase("0")){
						lastuserid = userid;
					}
					result = "normal_"+ lastuserid;
					content = "lasttime="+ sf.format(new Date()) +"="+ lastuserid;
					FileOutputStream o = null;
					o = new FileOutputStream(filename);
					o.write(content.getBytes());
					o.close();
					o = null;
				}else{
					if(!userid.equalsIgnoreCase(lastuserid)){
						Calendar c = Calendar.getInstance();
						long t1 = c.getTimeInMillis();
						int y = Integer.parseInt(content.substring(0, 4));
						int m = Integer.parseInt(content.substring(4, 6))-1;
						int d = Integer.parseInt(content.substring(6, 8));
						int h = Integer.parseInt(content.substring(8, 10));
						int n = Integer.parseInt(content.substring(10, 12));
						int s = Integer.parseInt(content.substring(12, 14));
						c.set(y, m, d, h, n, s);
						long t2 = c.getTimeInMillis();
						int diff = (int) ((t1 - t2)/60/1000);
						if(diff < 5){
							if(force == 1){
								content = "lasttime="+ sf.format(new Date()) +"="+ userid;
								FileOutputStream o = null;
								o = new FileOutputStream(filename);
								o.write(content.getBytes());
								o.close();
								o = null;
							}else{
								result = "busy";
							}
						}else{
							result = "normal";
							content = "lasttime="+ sf.format(new Date()) +"="+ userid;
							FileOutputStream o = null;
							o = new FileOutputStream(filename);
							o.write(content.getBytes());
							o.close();
							o = null;
						}
					}else{
						result = "normal";
						content = "lasttime="+ sf.format(new Date()) +"="+ userid;
						FileOutputStream o = null;
						o = new FileOutputStream(filename);
						o.write(content.getBytes());
						o.close();
						o = null;
					}					
				}
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				
			} finally{
				fr = null;
				bfr = null;
				file = null;
			}
			setSuccess(true);
			
		}else{
			result = "";
			setSuccess(false);
		}		
		
		return SUCCESS;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setForce(int force) {
		this.force = force;
	}

	public int getForce() {
		return force;
	}

	public String getServer() {
		return server;
	}

	public void setServer(String server) {
		this.server = server;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
}
