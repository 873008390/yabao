package com.mbusiness.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

public class GetmyAgent {

	private String salerids = "";
	
	public String get(Session session, String account){
		List<Object[]> o0 = session.createSQLQuery("select type,customerid,id,salestatus,servicestatus from users where status=1 and account='"+ account +"'").list();
		if(!o0.isEmpty()){
			if(o0.get(0)[0].toString().equalsIgnoreCase("0")){
				if(o0.get(0)[3].toString().equalsIgnoreCase("0")){
					List<Object> o10 = new ArrayList<Object>();
					if(account.equalsIgnoreCase("admin")){
						o10 = session.createSQLQuery("select id from users where status=1 and type in(1,0)").list();
					}else{
						if(o0.get(0)[4].toString().equalsIgnoreCase("1")){//客服
							o10 = session.createSQLQuery("select id from users where status=1 and type in(1,0)").list();
						}else{
							o10 = session.createSQLQuery("select id from users where status=1 and type in(1,0) and servicestatus=0").list();
						}
					}
					if(!o10.isEmpty()){
						for(int i=0;i<o10.size();i++){
							if(salerids.equalsIgnoreCase("")){
								salerids = o10.get(i).toString();
							}else{
								salerids = salerids +","+ o10.get(i).toString();
							}
						}
					}
				}else{//省总
					String downid = "";
					List<Object> o1 = session.createSQLQuery("select id from customer where status=1 and type=1 and saleuserid="+ o0.get(0)[2].toString()).list();
					if(!o1.isEmpty()){
						for(int i=0;i<o1.size();i++){
							if(downid.equalsIgnoreCase("")){
								downid = o1.get(i).toString();
							}else{
								downid = downid +","+ o1.get(i).toString();
							}
						}
						List<Object> o2 = session.createSQLQuery("select id from customer where manageruserid="+ o0.get(0)[2]).list();
						if(!o2.isEmpty()){
							for(int i=0;i<o2.size();i++){
								if(downid.equalsIgnoreCase("")){
									downid = o2.get(i).toString();
								}else{
									downid = downid +","+ o2.get(i).toString();
								}
							}
						}
						if(!downid.equalsIgnoreCase("")){
							int level = 0;
							while(true){
								List<Object> o11 = session.createSQLQuery("select id from customer where status=1 and type=1 and uppercustomerid in("+ downid +")").list();
								if(o11.isEmpty()){
									break;
								}else{
									for(int i=0;i<o11.size();i++){
										downid = downid +","+ o11.get(i).toString();
									}
									level += 1;
									if(level>3){
										break;
									}
								}
							}
							List<Object> o10 = session.createSQLQuery("select id from users where status=1 and type=1 and customerid in("+ downid +")").list();//saler
							if(!o10.isEmpty()){
								for(int i=0;i<o10.size();i++){
									if(salerids.equalsIgnoreCase("")){
										salerids = o10.get(i).toString();
									}else{
										salerids = salerids +","+ o10.get(i).toString();
									}
								}
							}
						}
						if(salerids.equalsIgnoreCase("")){
							salerids = o0.get(0)[2].toString();
						}
					}else{
						salerids = o0.get(0)[2].toString();
					}
				}
			}else{
				List<Object> o1 = session.createSQLQuery("select manageruserid from customer where id="+ o0.get(0)[1]).list();
				if(!o1.isEmpty()){
					String downid = "";
					if(o0.get(0)[2].toString().equalsIgnoreCase(o1.get(0).toString())){//manageruser
						downid = o0.get(0)[1].toString();
					}
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type=1 and manageruserid="+ o0.get(0)[2]).list();
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(downid.equalsIgnoreCase("")){
								downid = o2.get(i).toString();
							}else{
								downid = downid +","+ o2.get(i).toString();
							}
						}
					}
					if(!downid.equalsIgnoreCase("")){
						int level = 0;
						while(true){
							List<Object> o11 = session.createSQLQuery("select id from customer where status=1 and uppercustomerid in("+ downid +")").list();
							if(o11.isEmpty()){
								break;
							}else{
								for(int i=0;i<o11.size();i++){
									downid = downid +","+ o11.get(i).toString();
								}
								level += 1;
								if(level>3){
									break;
								}
							}
						}
						List<Object> o10 = session.createSQLQuery("select id from users where status=1 and type=1 and customerid in("+ downid +")").list();//saler
						if(!o10.isEmpty()){
							for(int i=0;i<o10.size();i++){
								if(salerids.equalsIgnoreCase("")){
									salerids = o10.get(i).toString();
								}else{
									salerids = salerids +","+ o10.get(i).toString();
								}
							}
						}
					}
					
					if(salerids.equalsIgnoreCase("")){
						salerids = o0.get(0)[2].toString();
					}
				}else{
					salerids = o0.get(0)[2].toString();
				}
			}
		}
		return salerids;
	}
}
