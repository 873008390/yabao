package com.mbusiness.util;

import java.util.List;

import org.hibernate.Session;

public class SynConfirm {

	public int check(String tablename, Session session){
		int result = 0;//ͬ����
		
		List<Object> o = session.createSQLQuery("select enddate from synrecord where tname='"+ tablename +"'").list();
		if(o.isEmpty()){
			result = 1;//��һ��ͬ��
		}else{
			if(o.get(0) != null){
				result = 2;//�ڶ��λ�����ͬ��
			}
		}
		
		return result;
	}
}
