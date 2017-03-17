package com.mbusiness.action;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import com.mbusiness.model.Terminalerror;
import com.mbusiness.service.TerminalService;
import com.mbusiness.util.Inputverify;
import com.opensymphony.xwork2.ActionSupport;

public class TerminalerrorAddAction extends ActionSupport{

	private Terminalerror terminalerror;
	private boolean success;
	private String result;
	private TerminalService terminalService = new TerminalService();
	private Inputverify inputverify = new Inputverify();
	private HttpServletRequest request;
	
	public String add(){
		//System.out.println(terminalerror.getTerminalerror());
		try {
			terminalerror.setContent(URLDecoder.decode(terminalerror.getContent(), "gbk"));
			terminalerror.setUsername(URLDecoder.decode(terminalerror.getUsername(), "gbk"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//if(inputverify.check(terminalerror.getSourcetype()) == 1 && inputverify.check(terminalerror.getUsername()) == 1 && inputverify.check(terminalerror.getContent()+"") == 1){
			
			result = terminalService.erroradd(terminalerror);
		//}
		success = false;
		
		return SUCCESS;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult() {
		return result;
	}

	public Terminalerror getTerminalerror() {
		return terminalerror;
	}

	public void setTerminalerror(Terminalerror terminalerror) {
		this.terminalerror = terminalerror;
	}
}
