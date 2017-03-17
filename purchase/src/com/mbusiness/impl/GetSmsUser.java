package com.mbusiness.impl;

import java.util.List;

import org.hibernate.Session;

import com.mbusiness.model.Usersession;

public class GetSmsUser {

	private String phonenos = "";
	
	public String get(Usersession usersession, Session session, String table, int id){
		List<Object[]> o = session.createSQLQuery("select cityid,smstype from "+ table +" where fromdate>=now() and id="+ id).list();
		if(!o.isEmpty()){
			int smstype = Integer.parseInt(o.get(0)[1].toString());
			GetmyAgent ga = new GetmyAgent();
			String salerids = ga.get(session, usersession.getUsername());
			GetmyDoctor gd = new GetmyDoctor();
			String doctorids = gd.get(session, salerids);
			GetmyPatient gp = new GetmyPatient();
			String patientids = gp.get(session, doctorids, salerids);
			if(smstype > 0){
				//ʡ��
				List<Object> o1 = session.createSQLQuery("select phoneno from users where status=1 and salestatus=1 and phoneno<>''").list();
				if(!o1.isEmpty()){
					for(int i=0;i<o1.size();i++){
						if(phonenos.equalsIgnoreCase("")){
							phonenos = o1.get(i).toString();
						}else{
							phonenos = phonenos +","+ o1.get(i).toString();
						}
					}
				}
				if(smstype == 1){//�ٰ�ش����ٰ��ҽ�����ٰ�ػ���
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1,2,4) and cityid="+ o.get(0)[0].toString()).list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						if(sql.equalsIgnoreCase("")){
							sql = doctorids;
						}else{
							sql = sql +","+ doctorids;
						}
						if(sql.equalsIgnoreCase("")){
							sql = patientids;
						}else{
							sql = sql +","+ patientids;
						}
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 2){//�ٰ�ش����ٰ��ҽ��
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1,2) and cityid="+ o.get(0)[0].toString()).list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						if(sql.equalsIgnoreCase("")){
							sql = doctorids;
						}else{
							sql = sql +","+ doctorids;
						}
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 3){//�ٰ�ش����ٰ�ػ���
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1,4) and cityid="+ o.get(0)[0].toString()).list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						if(sql.equalsIgnoreCase("")){
							sql = patientids;
						}else{
							sql = sql +","+ patientids;
						}
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 4){//�ٰ�ش���
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1) and cityid="+ o.get(0)[0].toString()).list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 5){//ȫ������ȫ��ҽ����ȫ������
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1,2,4)").list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						if(sql.equalsIgnoreCase("")){
							sql = doctorids;
						}else{
							sql = sql +","+ doctorids;
						}
						if(sql.equalsIgnoreCase("")){
							sql = patientids;
						}else{
							sql = sql +","+ patientids;
						}
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 6){//ȫ������ȫ������
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1,4)").list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						if(sql.equalsIgnoreCase("")){
							sql = patientids;
						}else{
							sql = sql +","+ patientids;
						}
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 7){//ȫ������ȫ��ҽ��
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1,2)").list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						if(sql.equalsIgnoreCase("")){
							sql = doctorids;
						}else{
							sql = sql +","+ doctorids;
						}
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 8){//ȫ������
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(1)").list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = salerids;
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 9){//ȫ��ҽ��
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(2)").list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = doctorids;
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}else if(smstype == 10){//ȫ������
					List<Object> o2 = session.createSQLQuery("select id from customer where status=1 and type in(4)").list();
					String cids = "";
					if(!o2.isEmpty()){
						for(int i=0;i<o2.size();i++){
							if(cids.equalsIgnoreCase("")){
								cids = o2.get(i).toString();
							}else{
								cids = cids +","+ o2.get(i).toString();
							}
						}
						String sql = patientids;
						List<Object> o3 = session.createSQLQuery("select phoneno from customer where status=1 and id in("+ cids +") and id in(select customerid from users where status=1 and id in("+ sql +"))").list();
						if(!o3.isEmpty()){
							for(int i=0;i<o3.size();i++){
								if(phonenos.equalsIgnoreCase("")){
									phonenos = o3.get(i).toString();
								}else{
									phonenos = phonenos +","+ o3.get(i).toString();
								}
							}
						}
					}
				}
			}
		}
		return phonenos;		
	}
}
