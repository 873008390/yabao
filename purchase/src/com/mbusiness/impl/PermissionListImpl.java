package com.mbusiness.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.PermissionListDAO;
import com.mbusiness.model.Permission;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class PermissionListImpl implements PermissionListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Permission> permissions;
	private HasPermission hasPermission = new HasPermission();
	private Inputverify inputverify = new Inputverify();
	
	@Override
	public List<Permission> list(Usersession usersession, String idtype, String typeid) {
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
		permissions = new ArrayList<Permission>();
		int flag = 1;
		if(idtype != null){
			if(inputverify.check(idtype) != 1){
				flag = 0;
			}
		}
		if(typeid != null){
			if(inputverify.check(typeid) != 1){
				flag = 0;
			}
		}
		if(flag == 0){
			Permission a = new Permission();
			a.setZdy3(mmessage.stringillegal);
			a.setZdy2("");
			a.setId(0);
			permissions.add(a);
		}else{
			if(!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if (hasPermission.hasPermission(usersession.getUsername(), "permission", "searchdata", ss) == 1){
						flag = 1;						
					}
				}
				if(flag == 1){	
					if(idtype.equalsIgnoreCase("user")){
						String typeidname = "";
						List<Object> o1 = ss.createSQLQuery("select name from users where id="+ typeid).list();
						if(!o1.isEmpty()){
							typeidname = o1.get(0).toString();
						}
						permissions = ss.createSQLQuery("select * from permission where status=1 and userid="+ typeid +" order by id").addEntity(Permission.class).list();
						if(!permissions.isEmpty()){
							for(int i=0;i<permissions.size();i++){
								permissions.get(i).setZdy2(typeidname);
							}
						}
						List<Object[]> o = new ArrayList<Object[]>();
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							o = ss.createSQLQuery("select name,shortname from catalog where status=1 and upperid<>0 order by upperid,orderid").list();
						}else{
							List<Object> o0 = ss.createSQLQuery("select type from users where status=1 and account='"+ usersession.getUsername() +"'").list();
							if(!o0.isEmpty()){
								if(Integer.parseInt(o0.get(0).toString()) == 0){
									o = ss.createSQLQuery("select shortname,name from catalog where status=1 and type=1 and upperid<>0 order by upperid,orderid").list();
								}else if(Integer.parseInt(o0.get(0).toString()) == 1){
									o = ss.createSQLQuery("select shortname,name from catalog where status=1 and type=2 and upperid<>0 order by upperid,orderid").list();
								}
							}
						}
						if(!o.isEmpty()){
							for(int i=0;i<o.size();i++){
								int in = 0;
								for(int j=0;j<permissions.size();j++){
									if(o.get(i)[1].toString().equalsIgnoreCase(permissions.get(j).getPermission()) && permissions.get(j).getType().equalsIgnoreCase("catalog")){
										in = 1;
										permissions.get(j).setZdy3(o.get(i)[0].toString());
									}
								}
								if(in == 0){
									Permission a = new Permission();
									a.setZdy2(typeidname);
									a.setZdy3(o.get(i)[0].toString());
									a.setPermission(o.get(i)[1].toString());
									a.setType("catalog");
									a.setStatus(0);
									a.setAdddata(0);
									a.setDeletedata(0);
									a.setModifydata(0);
									a.setSearchdata(0);
									a.setUploaddata(0);
									a.setId(10000001+i);
									permissions.add(a);
								}
							}
						}
					}else if(idtype.equalsIgnoreCase("permission")){
						String typeidname = "";
						String typeidshortname = "";
						List<Object[]> o1 = ss.createSQLQuery("select name,shortname from catalog where id="+ typeid).list();
						if(!o1.isEmpty()){
							typeidname = o1.get(0)[0].toString();
							typeidshortname = o1.get(0)[1].toString();
						}
						permissions = ss.createSQLQuery("select * from permission where status=1 and userid in(select id from users where status=1) and permission='"+ typeidshortname +"' order by id").addEntity(Permission.class).list();
						if(!permissions.isEmpty()){
							for(int i=0;i<permissions.size();i++){
								List<Object> o = ss.createSQLQuery("select name from users where status=1 and id="+ permissions.get(i).getUserid()).list();
								if(!o.isEmpty()){
									permissions.get(i).setZdy2(o.get(0).toString());
								}
								permissions.get(i).setZdy3(typeidname);
							}
						}else{
							Permission a = new Permission();
							a.setZdy3(mmessage.nodata);
							a.setZdy2("");
							a.setId(0);
							permissions.add(a);
						}
					}else if(idtype.equalsIgnoreCase("searchwithlimit")){
						String sql1 = "";
						if(!typeid.equalsIgnoreCase("0")){
							int len = typeid.split("_").length;
							for(int i=0;i<len;i++){
								if(typeid.split("_")[i].indexOf("name")>-1){
									String name = "";
									try {
										name = URLDecoder.decode(typeid.split("_")[i].split("=")[1],"UTF-8");
									} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
									}
									sql1 += " and name like '%"+ name +"%'";
								}
								
							}
						}
						permissions = ss.createSQLQuery("select * from permission where status=1 " + sql1 +" order by -id").addEntity(Permission.class).list();
						if(!permissions.isEmpty()){
							permissions.get(0).setZdy1(""+ permissions.size());
						}
					}
					if(permissions.isEmpty()){
						Permission a = new Permission();
						a.setZdy3(mmessage.nodata);
						a.setZdy2("");
						a.setId(0);
						permissions.add(a);
					}
				}else{
					Permission a = new Permission();
					a.setZdy3(mmessage.nopermission);	
					a.setZdy2("");
					a.setId(0);
					permissions.add(a);
				}
			}else{
				Permission a = new Permission();
				a.setZdy3(mmessage.notlogin);	
				a.setZdy2("");
				a.setId(0);
				permissions.add(a);
			}
		}
		HibernateUtil_new.closeSession();
		return permissions;
	}

}
