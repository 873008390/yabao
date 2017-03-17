package com.mbusiness.dao;

import java.io.File;

import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;

public interface SupplierAddfileDAO {

	public String add(Usersession usersession, Supplierfile supplierfile, File file, String path, String oldfilename);
}
