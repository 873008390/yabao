package com.mbusiness.service;

import java.io.File;
import java.util.List;

import com.mbusiness.dao.SuppliersynDAO;
import com.mbusiness.dao.SupplierAddfileDAO;
import com.mbusiness.dao.SupplierAuditDAO;
import com.mbusiness.dao.SupplierModifyDAO;
import com.mbusiness.dao.SuppliercatalogAddDAO;
import com.mbusiness.dao.SuppliercatalogDeleteDAO;
import com.mbusiness.dao.SupplierfileDeleteDAO;
import com.mbusiness.dao.SupplierfileListDAO;
import com.mbusiness.dao.SupplierAddDAO;
import com.mbusiness.dao.SupplierDeleteDAO;
import com.mbusiness.dao.SupplierListDAO;
import com.mbusiness.dao.SupplieronlineAddDAO;
import com.mbusiness.impl.SuppliersynImpl;
import com.mbusiness.impl.SupplierAddfileImpl;
import com.mbusiness.impl.SupplierAuditImpl;
import com.mbusiness.impl.SupplierModifyImpl;
import com.mbusiness.impl.SuppliercatalogAddImpl;
import com.mbusiness.impl.SuppliercatalogDeleteImpl;
import com.mbusiness.impl.SupplierfileDeleteImpl;
import com.mbusiness.impl.SupplierfileListImpl;
import com.mbusiness.impl.SupplierAddImpl;
import com.mbusiness.impl.SupplierDeleteImpl;
import com.mbusiness.impl.SupplierListImpl;
import com.mbusiness.impl.SupplieronlineAddImpl;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Supplier;
import com.mbusiness.model.Usersession;

public class SupplierService {

	private List<Supplier> suppliers;
	private SupplierListDAO supplierListDAO = new SupplierListImpl();
	
	public List<Supplier> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		suppliers = supplierListDAO.list(usersession, idtype, typeid, start, limit, page);
		return suppliers;
	}

	private String result;
	private SupplierAddDAO supplierAddDAO = new SupplierAddImpl();
	
	public String add(Usersession usersession, Supplier supplier) {
		// TODO Auto-generated method stub
		result = supplierAddDAO.add(usersession, supplier);
		return result;
	}

	private SupplierDeleteDAO supplierDeleteDAO = new SupplierDeleteImpl();
	
	public String delete(Usersession usersession, int supplierid) {
		// TODO Auto-generated method stub
		result = supplierDeleteDAO.delete(usersession, supplierid);
		return result;
	}

	private SupplieronlineAddDAO supplieronlineAddDAO = new SupplieronlineAddImpl();
	
	public String onlineadd(Usersession usersession, Supplier supplier) {
		// TODO Auto-generated method stub
		result = supplieronlineAddDAO.add(usersession, supplier);
		return result;
	}
	
	private SupplierAddfileDAO supplierAddfileDAO = new SupplierAddfileImpl();

	public String addfile(Usersession usersession, Supplierfile supplierfile, File file, String path, String oldfilename) {
		// TODO Auto-generated method stub
		result = supplierAddfileDAO.add(usersession, supplierfile, file, path, oldfilename);
		return result;
	}
	
	private SupplierfileDeleteDAO supplierfileDeleteDAO = new SupplierfileDeleteImpl();

	public String deletefile(Usersession usersession, int supplierfileid) {
		// TODO Auto-generated method stub
		result = supplierfileDeleteDAO.delete(usersession, supplierfileid);
		return result;
	}
	
	private List<Supplierfile> supplierfiles;
	private SupplierfileListDAO supplierfileListDAO = new SupplierfileListImpl();

	public List<Supplierfile> listfile(Usersession usersession,	String idtype, String typeid, int start, int limit, int page) {
		// TODO Auto-generated method stub
		supplierfiles = supplierfileListDAO.list(usersession, idtype, typeid, start, limit, page);
		return supplierfiles;
	}

	private SupplierModifyDAO supplierModifyDAO = new SupplierModifyImpl();

	public String modify(Usersession usersession, Supplier supplier, String idtype) {
		// TODO Auto-generated method stub
		result = supplierModifyDAO.modify(usersession, supplier, idtype);
		return result;
	}

	private SuppliercatalogAddDAO suppliercatalogAddDAO = new SuppliercatalogAddImpl();
	
	public String addcatalog(Usersession usersession, Supplier supplier) {
		// TODO Auto-generated method stub
		result = suppliercatalogAddDAO.add(usersession, supplier);
		return result;
	}

	private SuppliercatalogDeleteDAO suppliercatalogDeleteDAO = new SuppliercatalogDeleteImpl();
	
	public String deletecatalog(Usersession usersession, int supplierid, String catalogname) {
		// TODO Auto-generated method stub
		result = suppliercatalogDeleteDAO.delete(usersession, supplierid, catalogname);
		return result;
	}

	private SupplierAuditDAO supplierAuditDAO = new SupplierAuditImpl();
	
	public String audit(Usersession usersession, Supplier supplier,	String idtype) {
		// TODO Auto-generated method stub
		result = supplierAuditDAO.audit(usersession, supplier, idtype);
		return result;
	}

	private SuppliersynDAO suppliersynDAO = new SuppliersynImpl();
	
	public String syn(Usersession usersession) {
		// TODO Auto-generated method stub
		result = suppliersynDAO.syn(usersession);
		return result;
	}

}
