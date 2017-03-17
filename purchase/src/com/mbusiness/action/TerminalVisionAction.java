package com.mbusiness.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.apache.struts2.ServletActionContext;

import com.mbusiness.util.Inputverify;
import com.opensymphony.xwork2.ActionSupport;

public class TerminalVisionAction extends ActionSupport {

	private String vision;
	private String result;
	private boolean success;
	private Inputverify inputverify = new Inputverify();
	private String type;
	private int force;
	
	public String list(){
		//System.out.println("============"+vision.substring(0, 1)+";"+vision.substring(2));
		if(inputverify.check(vision) == 1){
			if(type == null){
				type = "";
			}
			File file = new File(ServletActionContext.getServletContext().getRealPath("/config/version.txt"));
			FileReader fr;
			BufferedReader bfr;
			String versioncontent = "";
			try {
				fr = new FileReader(file);
				bfr = new BufferedReader(fr);
				String tmp = "";
				while((tmp = bfr.readLine()) != null){
					if(tmp.split("=")[0].equalsIgnoreCase("version") && tmp.split("=").length == 2){
						versioncontent = tmp.split("=")[1];
					}else if(tmp.split("=")[0].equalsIgnoreCase("force") && tmp.split("=").length == 2){
						force = Integer.parseInt(tmp.split("=")[1]);
					}
				}
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				
			} finally{
				fr = null;
				bfr = null;
			}
			if(Integer.parseInt(vision.substring(0, 1))<Integer.parseInt(versioncontent.substring(0, 1))){
				setResult("n");
			}else if(Integer.parseInt(vision.substring(0, 1))>Integer.parseInt(versioncontent.substring(0, 1))){
				setResult("y");
			}else{
				if(Integer.parseInt(vision.substring(2,3))<Integer.parseInt(versioncontent.substring(2, 3))){
					setResult("n");
				}else if(Integer.parseInt(vision.substring(2,3))>Integer.parseInt(versioncontent.substring(2, 3))){
					setResult("y");
				}else{
					if(vision.length()>3){
						if(Integer.parseInt(vision.substring(4))<Integer.parseInt(versioncontent.substring(4))){
							setResult("n");
						}else{
							setResult("y");
						}
					}else{
						setResult("n");
					}
				}
			}
			vision = vision +"_"+ versioncontent;
		}else{
			setResult("y");
		}		
		success = true;
		return SUCCESS;
	}

	public String getVision() {
		return vision;
	}

	public void setVision(String vision) {
		this.vision = vision;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setForce(int force) {
		this.force = force;
	}

	public int getForce() {
		return force;
	}
}
