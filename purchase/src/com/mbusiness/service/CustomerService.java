package com.mbusiness.service;

import java.util.List;

import com.mbusiness.dao.CustomerAddphotoDAO;
import com.mbusiness.dao.CustomerModifyDAO;
import com.mbusiness.dao.CustomerphotoDeleteDAO;
import com.mbusiness.dao.CustomerphotoListDAO;
import com.mbusiness.dao.CustomerAddDAO;
import com.mbusiness.dao.CustomerDeleteDAO;
import com.mbusiness.dao.CustomerListDAO;
import com.mbusiness.dao.CustomeronlineAddDAO;
import com.mbusiness.impl.CustomerAddphotoImpl;
import com.mbusiness.impl.CustomerModifyImpl;
import com.mbusiness.impl.CustomerphotoDeleteImpl;
import com.mbusiness.impl.CustomerphotoListImpl;
import com.mbusiness.impl.CustomerAddImpl;
import com.mbusiness.impl.CustomerDeleteImpl;
import com.mbusiness.impl.CustomerListImpl;
import com.mbusiness.impl.CustomeronlineAddImpl;
import com.mbusiness.model.Customerphoto;
import com.mbusiness.model.Customer;
import com.mbusiness.model.Usersession;

public class CustomerService {

	private List<Customer> customers;
	private CustomerListDAO customerListDAO = new CustomerListImpl();
	
	public List<Customer> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		customers = customerListDAO.list(usersession, idtype, typeid, start, limit, page);
		return customers;
	}

	private String result;
	private CustomerAddDAO customerAddDAO = new CustomerAddImpl();
	
	public String add(Usersession usersession, Customer customer) {
		// TODO Auto-generated method stub
		result = customerAddDAO.add(usersession, customer);
		return result;
	}

	private CustomerDeleteDAO customerDeleteDAO = new CustomerDeleteImpl();
	
	public String delete(Usersession usersession, int customerid) {
		// TODO Auto-generated method stub
		result = customerDeleteDAO.delete(usersession, customerid);
		return result;
	}

	private CustomeronlineAddDAO customeronlineAddDAO = new CustomeronlineAddImpl();
	
	public String onlineadd(Usersession usersession, Customer customer) {
		// TODO Auto-generated method stub
		result = customeronlineAddDAO.add(usersession, customer);
		return result;
	}
	
	private CustomerAddphotoDAO customerAddphotoDAO = new CustomerAddphotoImpl();

	public String addphoto(Usersession usersession, Customerphoto customerphoto) {
		// TODO Auto-generated method stub
		result = customerAddphotoDAO.add(usersession, customerphoto);
		return result;
	}
	
	private CustomerphotoDeleteDAO customerphotoDeleteDAO = new CustomerphotoDeleteImpl();

	public String deletephoto(Usersession usersession, int customerphotoid) {
		// TODO Auto-generated method stub
		result = customerphotoDeleteDAO.delete(usersession, customerphotoid);
		return result;
	}
	
	private List<Customerphoto> customerphotos;
	private CustomerphotoListDAO customerphotoListDAO = new CustomerphotoListImpl();

	public List<Customerphoto> listphoto(Usersession usersession,	String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		customerphotos = customerphotoListDAO.list(usersession, idtype, typeid, start, limit, page);
		return customerphotos;
	}

	private CustomerModifyDAO customerModifyDAO = new CustomerModifyImpl();

	public String modify(Usersession usersession, Customer customer, String idtype) {
		// TODO Auto-generated method stub
		result = customerModifyDAO.modify(usersession, customer, idtype);
		return result;
	}

}
