package com.mbusiness.util;

public class Inputverify {
	
	private String s = "insert _update _drop _delete _select _exec _cmdshell ";
	int result = 1;

	public int check(String inputstr){
		if(inputstr == null){
			result = -1;
		}else if(inputstr.equalsIgnoreCase("")){
			result = 1;
		}else{
			String[] al = s.split("_");
			for(int i=0;i<al.length;i++){
				if(inputstr.indexOf(al[i]) != -1){
					System.err.println(inputstr +"=="+ al[i]);
					result = 0;//º¬ÓÐ·Ç·¨×Ö·û
					break;
				}
			}
		}
		return result;
	}
}
