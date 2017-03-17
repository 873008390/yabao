package com.mbusiness.util;

import java.net.URLEncoder;

import javax.servlet.http.Cookie;

import org.apache.struts2.ServletActionContext;

public class AddCookie {

	public void add(String name,String value){
        //创建Cookie
         Cookie cookie = new Cookie(name, URLEncoder.encode(value));
         //设置Cookie的生命周期
         cookie.setMaxAge(60*60*24*365);
         cookie.setPath("/");
        ServletActionContext.getResponse().addCookie(cookie);
    }
}
