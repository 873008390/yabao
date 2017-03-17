package com.mbusiness.action;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;
import com.mbusiness.service.SupplierService;
import com.mbusiness.util.MMessage;
import com.opensymphony.xwork2.ActionSupport;

public class SupplierAddfileAction extends ActionSupport implements SessionAware{

	private File upload;//封装上传文件 
    private String uploadFileName;//设置上传文件的文件名 
    private String uploadContentType;//上传文件的类型 
    private String savePath;//上传文件的保存路径 
    private String result = "";
	private boolean success;
	private Supplierfile supplierfile;
	private Map session;
	private SupplierService SupplierfileService = new SupplierService();
	private MMessage mmessage = new MMessage();
	private Usersession usersession = new Usersession();
	
	public String add(){
		if(session.get("corporationid") == null || session.get("corporationid").toString() == ""){
			usersession.setCorporationid(0);
		}else{
			usersession.setCorporationid(Integer.parseInt(session.get("corporationid").toString()));
		}
		if(session.get("account") == null || session.get("account").toString() == ""){
			usersession.setUsername("");
		}else{
			usersession.setUsername(session.get("account").toString());
			String oldfilename = "";
			try {
				oldfilename = URLDecoder.decode(supplierfile.getOldfilename(), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			result = SupplierfileService.addfile(usersession, supplierfile, getUpload(), getSavePath(), oldfilename);
		}
		if (result.indexOf(mmessage.savesuccess)>-1){
			success = true;
			return SUCCESS;
		}else{				
			return INPUT;
		}
		
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

	@Override
	public void setSession(Map session) {
		this.session = session;
	}

	public Supplierfile getSupplierfile() {
		return supplierfile;
	}

	public void setSupplierfile(Supplierfile supplierfile) {
		this.supplierfile = supplierfile;
	}

	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public String getSavePath() {
		return ServletActionContext.getServletContext().getRealPath(savePath);
	}

	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public File getUpload() {
		return upload;
	}
}
