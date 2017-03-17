package com.mbusiness.dao;

import java.util.List;

import com.mbusiness.model.Town;
import com.mbusiness.model.Usersession;

public interface TownListDAO {

	public List<Town> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page);
}
