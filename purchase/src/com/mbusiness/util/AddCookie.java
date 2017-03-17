package com.mbusiness.util;

import java.net.URLEncoder;

import javax.servlet.http.Cookie;

import org.apache.struts2.ServletActionContext;

public class AddCookie {

	public void add(String name,String value){
        //����Cookie
         Cookie cookie = new Cookie(name, URLEncoder.encode(value));
         //����Cookie����������
         cookie.setMaxAge(60*60*24*365);
         cookie.setPath("/");
        ServletActionContext.getResponse().addCookie(cookie);
    }
}
