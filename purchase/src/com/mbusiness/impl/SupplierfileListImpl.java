package com.mbusiness.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.mbusiness.dao.SupplierfileListDAO;
import com.mbusiness.model.Supplierfile;
import com.mbusiness.model.Usersession;
import com.mbusiness.util.CommonJudgeDB;
import com.mbusiness.util.HibernateUtil_new;
import com.mbusiness.util.Inputverify;
import com.mbusiness.util.MMessage;

public class SupplierfileListImpl implements SupplierfileListDAO {
	
	private Session ss;
	private MMessage mmessage = new MMessage();
	private List<Supplierfile> supplierfiles = new ArrayList<Supplierfile>();
	private String ip = org.apache.struts2.ServletActionContext.getRequest().getRemoteAddr();
	private Inputverify inputverify = new Inputverify();
	private HasPermission hasPermission = new HasPermission();
	private String statement;
	private String msql;
	private String ssql;
	@Override
	public List<Supplierfile> list(Usersession usersession, String idtype, String typeid, int start, int limit, int page) {
		//iFlag=0 mysql; iFlag=1 sqlserver
		int iFlag = CommonJudgeDB.judgeDB();
		HibernateUtil_new.closeSession();
		ss = HibernateUtil_new.currentSession();
		ss.beginTransaction();
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
			Supplierfile a = new Supplierfile();
			a.setZdy2("");
			a.setUrl(mmessage.stringillegal);
			a.setZdy1("1");
			a.setZdy3("");
			a.setZdy4("");
			a.setId(0);
			supplierfiles.add(a);
		}else{
			if (!usersession.getUsername().equalsIgnoreCase("")){
				flag = 0;
				if(usersession.getUsername().equalsIgnoreCase("admin")){
					flag = 1;
				}else{					
					if(hasPermission.hasPermission(usersession.getUsername(), "supplier", "searchdata", ss) == 1){
						flag = 1;						
					}else if(idtype.equalsIgnoreCase("user")){
						flag = 1;
					}
				}
				if(flag == 1){
					if(idtype.equalsIgnoreCase("all")){
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							supplierfiles = ss.createSQLQuery("select * from supplierfile where status=1 order by id").addEntity(Supplierfile.class).list();
						}else{
							supplierfiles = ss.createSQLQuery("select * from supplierfile where 0=1 order by id").addEntity(Supplierfile.class).list();
						}
						if(!supplierfiles.isEmpty()){
							supplierfiles.get(0).setZdy1(supplierfiles.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("allwithlimit")){
						
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							msql = "select * from supplierfile where status=1 order by -id limit "+ start +","+ limit;
							
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
									"select * from supplierfile where status=1) M) L where L.rownumber>" + start;
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							supplierfiles = ss.createSQLQuery(statement).addEntity(Supplierfile.class).list();
						}else{
							msql = "select * from supplierfile where 0=1 order by -id limit "+ start +","+ limit;
							
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id desc) as rownumber,M.* from(" +
									"select * from supplierfile where 0=1) M) L where L.rownumber>" + start;
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							supplierfiles = ss.createSQLQuery(statement).addEntity(Supplierfile.class).list();
						}
						if(!supplierfiles.isEmpty()){
							List<Object> o = ss.createSQLQuery("select id from supplierfile where status=1 order by id ").list();
							supplierfiles.get(0).setZdy1(o.size()+"");
						}
					}else if(idtype.equalsIgnoreCase("search")){
						if(usersession.getUsername().equalsIgnoreCase("admin")){
							msql = "select * from supplierfile where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%' or cityid in(select id from city where status=1 and name like '%"+ typeid +"%')) order by id limit "+ start +","+ limit;
							
							ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
									"select * from supplierfile where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%' or cityid in(select id from city where status=1 and name like '%"+ typeid +"%'))) M) L where L.rownumber>" + start;
							if(iFlag == 0){
								statement = msql;
							}else{
								statement = ssql;
							}
							supplierfiles = ss.createSQLQuery(statement).addEntity(Supplierfile.class).list();
							if(!supplierfiles.isEmpty()){
								List<Object> o = ss.createSQLQuery("select id from supplierfile where status=1 and (title like '%"+ typeid +"%' or content like '%"+ typeid +"%')").list();
								supplierfiles.get(0).setZdy1(o.size()+"");
							}
						}
					}else if(idtype.equalsIgnoreCase("myfile")){
						supplierfiles = ss.createSQLQuery("select * from supplierfile where status=1 and supplierid=(select supplierid from users where status=1 and account='"+ usersession.getUsername() +"') order by -id").addEntity(Supplierfile.class).list();
						if(!supplierfiles.isEmpty()){					
							supplierfiles.get(0).setZdy1(""+ supplierfiles.size());
						}
					}else if(idtype.equalsIgnoreCase("supplier")){
						msql = "select * from supplierfile where status=1 and supplierid="+ typeid +" order by id limit "+ start +","+ limit;
						
						ssql = "select top "+ limit +"* from(select ROW_NUMBER() over(order by M.id) as rownumber,M.* from(" +
								"select * from supplierfile where status=1 and supplierid="+ typeid +") M) L where L.rownumber>" + start;
						if(iFlag == 0){
							statement = msql;
						}else{
							statement = ssql;
						}
						supplierfiles = ss.createSQLQuery(statement).addEntity(Supplierfile.class).list();
						if(!supplierfiles.isEmpty()){					
							List<Object> o00 = ss.createSQLQuery("select url from supplierfile where status=1 and supplierid="+ typeid).list();
							supplierfiles.get(0).setZdy1(""+ o00.size());
						}
					}
					if (supplierfiles.isEmpty()){
						Supplierfile a = new Supplierfile();
						a.setZdy2("");	
						a.setUrl(mmessage.nodata);
						a.setZdy1("1");
						a.setZdy3("");
						a.setZdy4("");					
						a.setId(0);
						supplierfiles.add(a);
					}else{
						SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd");
						for(int i=0;i<supplierfiles.size();i++){
							if(idtype.equalsIgnoreCase("file")){
								
							}else{
								if(supplierfiles.get(i).getCreatedate() != null){
									supplierfiles.get(i).setZdy2(sformat.format(supplierfiles.get(i).getCreatedate()));
								}
								if(supplierfiles.get(i).getUrl() != null && !supplierfiles.get(i).getUrl().equalsIgnoreCase("")){
									supplierfiles.get(i).setUrl("<a href='"+ supplierfiles.get(i).getUrl() +"' target='_blank'>обть</a>");
								}
								List<Object> o = ss.createSQLQuery("select keyname from keyvalue where status=1 and type=21 and value='"+ supplierfiles.get(i).getType() +"'").list();
								if(!o.isEmpty()){
									supplierfiles.get(i).setZdy3(o.get(0).toString());
								}else{
									supplierfiles.get(i).setZdy3("");
								}
								List<Object> o1 = ss.createSQLQuery("select name from supplier where status=1 and id="+ supplierfiles.get(i).getSupplierid()).list();
								if(!o1.isEmpty()){
									supplierfiles.get(i).setZdy4(o1.get(0).toString());
								}else{
									supplierfiles.get(i).setZdy4("");
								}
							}
						}
					}
				}else{
					if(idtype.equalsIgnoreCase("myfile")){
						supplierfiles = ss.createSQLQuery("select * from supplierfile where status=1 and supplierid=(select supplierid from users where status=1 and account='"+ usersession.getUsername() +"') order by -id").addEntity(Supplierfile.class).list();
						if(!supplierfiles.isEmpty()){					
							supplierfiles.get(0).setZdy1(""+ supplierfiles.size());
						}
					}else{
						Supplierfile a = new Supplierfile();
						a.setZdy2("");	
						a.setUrl(mmessage.nopermission);
						a.setZdy1("1");
						a.setZdy3("");
						a.setZdy4("");					
						a.setId(0);
						supplierfiles.add(a);
					}
				}
			}
		}
		
		HibernateUtil_new.closeSession();
		return supplierfiles;
	}

}
