package com.mbusiness.service;


import com.mbusiness.dao.TerminalerrorAddDAO;
import com.mbusiness.impl.TerminalerrorAddImpl;
import com.mbusiness.model.Terminalerror;

public class TerminalService {

	private String result;

	private TerminalerrorAddDAO terminalerrorAddDAO = new TerminalerrorAddImpl();
	
	public String erroradd(Terminalerror terminalerror) {
		// TODO Auto-generated method stub
		result = terminalerrorAddDAO.erroradd(terminalerror);
		return result;
	}
}
