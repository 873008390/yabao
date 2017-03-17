package com.mbusiness.service;


import java.util.List;

import com.mbusiness.dao.GetuserinfoDAO;
import com.mbusiness.dao.UserAddDAO;
import com.mbusiness.dao.UserChangepasswordDAO;
import com.mbusiness.dao.UserDeleteDAO;
import com.mbusiness.dao.UserGetrandomcodeDAO;
import com.mbusiness.dao.UserListDAO;
import com.mbusiness.dao.UserLoginDAO;
import com.mbusiness.dao.UserRegisterDAO;
import com.mbusiness.dao.UserautoLoginDAO;
import com.mbusiness.dao.UserchangeauditstatusDAO;
import com.mbusiness.impl.GetuserinfoImpl;
import com.mbusiness.impl.UserAddImpl;
import com.mbusiness.impl.UserChangepasswordImpl;
import com.mbusiness.impl.UserDeleteImpl;
import com.mbusiness.impl.UserGetrandomcodeImpl;
import com.mbusiness.impl.UserListImpl;
import com.mbusiness.impl.UserLoginImpl;
import com.mbusiness.impl.UserRegisterImpl;
import com.mbusiness.impl.UserautoLoginImpl;
import com.mbusiness.impl.UserchangeauditstatusImpl;
import com.mbusiness.model.Users;
import com.mbusiness.model.Usersession;

public class UserService {

	private String result;
	
	private UserLoginDAO userLoginDAO = new UserLoginImpl();	
	
	public String login(String name,String password, int corporationid, String url){
		result = userLoginDAO.login(name, password, corporationid, url);
		return result;
	}

	private List<Users> users;
	private UserListDAO userListDAO = new UserListImpl();
	
	public List<Users> list(Usersession usersession, String idtype,	String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		users = userListDAO.list(usersession, idtype, typeid, start, limit, page);
		return users;
	}

	private UserAddDAO userAddDAO = new UserAddImpl();
	
	public String add(Usersession usersession, Users user) {
		// TODO Auto-generated method stub
		result = userAddDAO.add(usersession, user);
		return result;
	}

	private UserDeleteDAO userDeleteDAO = new UserDeleteImpl();
	
	public String delete(Usersession usersession, int userid) {
		// TODO Auto-generated method stub
		result = userDeleteDAO.delete(usersession, userid);
		return result;
	}

	private UserGetrandomcodeDAO userGetrandomcodeDAO = new UserGetrandomcodeImpl();
	
	public String getrandomcode(String phoneno, String idtype, String typeid) {
		// TODO Auto-generated method stub
		result = userGetrandomcodeDAO.get(phoneno, idtype, typeid);
		return result;
	}

	private UserRegisterDAO userRegisterDAO = new UserRegisterImpl();
	
	public String register(Users user) {
		// TODO Auto-generated method stub
		result = userRegisterDAO.add(user);
		return result;
	}

	private UserChangepasswordDAO userChangepasswordDAO = new UserChangepasswordImpl();
	
	public String change(Users user) {
		// TODO Auto-generated method stub
		result = userChangepasswordDAO.change(user);
		return result;
	}

	private UserchangeauditstatusDAO userchangeauditstatusDAO = new UserchangeauditstatusImpl();
	
	public String change(Usersession usersession, int userid) {
		// TODO Auto-generated method stub
		result = userchangeauditstatusDAO.change(usersession, userid);
		return result;
	}

	private UserautoLoginDAO userautoLoginDAO = new UserautoLoginImpl();
	
	public String autologin(String idtype, String typeid) {
		// TODO Auto-generated method stub
		result = userautoLoginDAO.login(idtype, typeid);
		return result;
	}

	private GetuserinfoDAO getuserinfoDAO = new GetuserinfoImpl();
	
	public List<Users> getuserinfo(Usersession usersession) {
		// TODO Auto-generated method stub
		users = getuserinfoDAO.list(usersession);
		return users;
	}
}
