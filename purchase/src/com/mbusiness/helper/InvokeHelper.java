package com.mbusiness.helper;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import com.mbusiness.util.VariableUtil;


public class InvokeHelper {


        // K3 Cloud WebSite URL Example "http://192.168.1.115/K3Cloud/"
        public static String POST_K3CloudURL = VariableUtil.POST_K3CloudURL;

        // Cookie 值
        private static String CookieVal = null;

        private static Map map = new HashMap();
        static {
                map.put("Save",
                                "ZK.K3.Supplier.ApiService.PlugIn.DataService.AddOrModifySupplierData,ZK.K3.Supplier.ApiService.PlugIn.common.kdsvc");
                map.put("View",
                                "ZK.K3.Supplier.ApiService.PlugIn.DataService.GetData,ZK.K3.Supplier.ApiService.PlugIn.common.kdsvc");
                map.put("Submit",
                                "Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Submit.common.kdsvc");
                map.put("Audit",
                                "Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Audit.common.kdsvc");
                map.put("UnAudit",
                                "Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.UnAudit.common.kdsvc");
                map.put("StatusConvert",
                                "Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.StatusConvert.common.kdsvc");
        }

        /**
         * 登录 初始化连接url
         * @param url 路径
         * @param paras 登录传入的参数
         * @return
         * @throws Exception
         */
        private static HttpURLConnection initUrlConn(String url, JSONArray paras)
                        throws Exception {
                URL postUrl = new URL(POST_K3CloudURL.concat(url));
                HttpURLConnection connection = (HttpURLConnection) postUrl
                                .openConnection();
                if (CookieVal != null) {
                        connection.setRequestProperty("Cookie", CookieVal);
                }
                if (!connection.getDoOutput()) {
                        connection.setDoOutput(true);
                }
                connection.setRequestMethod("POST");
                connection.setUseCaches(false);
                connection.setInstanceFollowRedirects(true);
                connection.setRequestProperty("Content-Type", "application/json");
                DataOutputStream out = new DataOutputStream(
                                connection.getOutputStream());

                UUID uuid = UUID.randomUUID();
                int hashCode = uuid.toString().hashCode();

                JSONObject jObj = new JSONObject();

                jObj.put("format", 1);
                jObj.put("useragent", "ApiClient");
                jObj.put("rid", hashCode);
                jObj.put("parameters", chinaToUnicode(paras.toString()));
                jObj.put("timestamp", new Date().toString());
                jObj.put("v", "1.0");

                out.writeBytes(jObj.toString());
                out.flush();
                out.close();

                return connection;
        }
        
        /**
         * 查询   添加  修改 删除 请求连接url
         * @param url 路径
         * @param paras 参数
         * @return
         * @throws Exception
         */
        private static HttpURLConnection operation(String url, String paras)
                throws Exception {
        	
	        URL postUrl = new URL(POST_K3CloudURL.concat(url));
	        HttpURLConnection connection = (HttpURLConnection) postUrl
	                        .openConnection();
	        if (CookieVal != null) {
	                connection.setRequestProperty("Cookie", CookieVal);
	        }
	        if (!connection.getDoOutput()) {
	                connection.setDoOutput(true);
	        }
	        connection.setRequestMethod("POST");
	        connection.setUseCaches(false);
	        connection.setInstanceFollowRedirects(true);
	        connection.setRequestProperty("Content-Type", "application/json");
	        DataOutputStream out = new DataOutputStream(
	                        connection.getOutputStream());
	
	        UUID uuid = UUID.randomUUID();
	        int hashCode = uuid.toString().hashCode();
	
	        JSONObject jObj = new JSONObject();
	
	        jObj.put("format", 1);
	        jObj.put("useragent", "ApiClient");
	        jObj.put("rid", hashCode);
	        jObj.put("parameters", chinaToUnicode(paras));
	        jObj.put("timestamp", new Date().toString());
	        jObj.put("v", "1.0");
	
	        out.writeBytes(jObj.toString());
	        out.flush();
	        out.close();
	
	        return connection;
        }
        /**
         * 登录 
         * @param dbId 帐套Id
         * @param user 用户名
         * @param pwd 密码
         * @param lang 语言
         * @return
         * @throws Exception
         */
        public static boolean Login(String dbId, String user, String pwd, int lang)
                        throws Exception {

                boolean bResult = false;
                String sUrl = "Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc";

                JSONArray jParas = new JSONArray();
                jParas.put(dbId);// 帐套Id
                jParas.put(user);// 用户名
                jParas.put(pwd);// 密码
                jParas.put(lang);// 语言

                HttpURLConnection connection = initUrlConn(sUrl, jParas);
                // 获取Cookie
                String key = null;
                for (int i = 1; (key = connection.getHeaderFieldKey(i)) != null; i++) {
                        if (key.equalsIgnoreCase("Set-Cookie")) {
                                String tempCookieVal = connection.getHeaderField(i);
                                if (tempCookieVal.startsWith("kdservice-sessionid")) {
                                        CookieVal = tempCookieVal;
                                        break;
                                }
                        }
                }

                BufferedReader reader = new BufferedReader(new InputStreamReader(
                        connection.getInputStream(),"utf-8"));
                String line;
                while ((line = reader.readLine()) != null) {
                    bResult = line.contains("\"LoginResultType\":1");
                }
                reader.close();

                connection.disconnect();

                return bResult;
        }

        /**
         * 供应商保存
         * @param message
         * @param params
         * @return
         * @throws Exception
         */
        public static String Save(String message,List<String> params) throws Exception {
        	return SaveInvoke("Save", message, params);
        }
        private static String SaveInvoke(String deal,String message,List<String> params)
                throws Exception {

	        String sUrl = map.get(deal).toString();
	        JSONObject jParas = new JSONObject();
	        jParas.put("message",message);
	        jParas.put("FName",params.get(0));
	        jParas.put("FCreateOrgId",params.get(1));
	        jParas.put("FUseOrgId",params.get(2));
	        jParas.put("FPayCurrencyId",params.get(3));
	        jParas.put("FNumber",params.get(4));
	        jParas.put("FLocNumber",params.get(5));
	        jParas.put("FDOCUMENTSTATUS", params.get(6));
	        String str = "["+jParas.toString()+"]";
	
	        HttpURLConnection connectionInvoke = operation(sUrl, str);
	
	        BufferedReader reader = new BufferedReader(new InputStreamReader(
	                        connectionInvoke.getInputStream(),"utf-8"));
	
	        String line;
	        String sResult = "";
	        while ((line = reader.readLine()) != null) {
	        	sResult = line;
	        	System.err.println(sResult);
	        }
	        reader.close();
	
	        connectionInvoke.disconnect();
	        return sResult;
        }
        
        /**
         * 供应商修改
         * @param message
         * @param params
         * @param modifyParam
         * @return
         * @throws Exception
         */
        public static String Update(String message,Map<String,String> params,String modifyParam) throws Exception {
        	return UpdateInvoke("Save", message, params,modifyParam);
        }
        private static String UpdateInvoke(String deal,String message,Map<String,String> params,String modifyParam)
                throws Exception {

        	String sUrl = map.get(deal).toString();
	        JSONObject jParas = new JSONObject();
	        jParas.put("message",message);
	        jParas.put("Id", params.get("Id"));
	        String[] cloNames= modifyParam.split(",");
	        for(String cloName:cloNames){
	        	if(cloName.equalsIgnoreCase("Name")){
	        		jParas.put("Name", params.get("Name"));
	        	}else if(cloName.equalsIgnoreCase("Number")){
	        		jParas.put("Number", params.get("Number"));
	        	}else if(cloName.equalsIgnoreCase("CreateOrgId_Id")){
	        		jParas.put("CreateOrgId_Id", params.get("CreateOrgId_Id"));
	        	}else if(cloName.equalsIgnoreCase("UseOrgId_Id")){
	        		jParas.put("UseOrgId_Id", params.get("UseOrgId_Id"));
	        	}else if(cloName.equalsIgnoreCase("FDOCUMENTSTATUS")){
	        		jParas.put("FDOCUMENTSTATUS", params.get("FDOCUMENTSTATUS"));
	        	}
	        }
	        jParas.put("modifyParam",modifyParam);
	        String str = "["+jParas.toString()+"]";
	
	        HttpURLConnection connectionInvoke = operation(sUrl, str);
	
	        BufferedReader reader = new BufferedReader(new InputStreamReader(
	                        connectionInvoke.getInputStream(),"utf-8"));
	
	        String line;
	        String sResult = "";
	        while ((line = reader.readLine()) != null) {
	        	sResult = line;
	        	System.err.println(sResult);
	        }
	        reader.close();
	
	        connectionInvoke.disconnect();
	        return sResult;
        }
        
        
        
        /**
         * 查询，删除
         * @param message
         * @param sql
         * @return
         * @throws Exception
         */
        public static String View(String message, String sql) throws Exception {
                return ViewInvoke("View", message, sql);
        }
        
        private static String ViewInvoke(String deal,String message,String sql)
                throws Exception {

	        String sUrl = map.get(deal).toString();
	        
	        JSONObject jParas = new JSONObject();
	        jParas.put("message",message);
	        jParas.put("sql",sql);
	        String str = "["+jParas.toString()+"]";
	
	        HttpURLConnection connectionInvoke = operation(sUrl, str);
	
	        BufferedReader reader = new BufferedReader(new InputStreamReader(
	                        connectionInvoke.getInputStream(),"utf-8"));
	        String line;
	        String sResult = "";
	        while ((line = reader.readLine()) != null) {
	                sResult = line;
	        }
	        reader.close();
	
	        connectionInvoke.disconnect();
	        return sResult;
        }
        
        
        /**
         * 提交
         * @param formId
         * @param content
         * @throws Exception
         */
        public static void Submit(String formId, String content) throws Exception {
                Invoke("Submit", formId, content);
        }

        /**
         * 审核
         * @param formId
         * @param content
         * @throws Exception
         */
        public static void Audit(String formId, String content) throws Exception {
                Invoke("Audit", formId, content);
        }

        /**
         * 反审核
         * @param formId
         * @param content
         * @throws Exception
         */
        public static void UnAudit(String formId, String content) throws Exception {
                Invoke("UnAudit", formId, content);
        }

        /**
         * 状态转换
         * @param formId
         * @param content
         * @throws Exception
         */
        public static void StatusConvert(String formId, String content)
                        throws Exception {
                Invoke("StatusConvert", formId, content);
        }
        private static void Invoke(String deal, String formId, String content)
                throws Exception {

	        String sUrl = map.get(deal).toString();
	        JSONArray jParas = new JSONArray();
	        jParas.put(formId);
	        jParas.put(content);
	
	        HttpURLConnection connectionInvoke = initUrlConn(sUrl, jParas);
	
	        BufferedReader reader = new BufferedReader(new InputStreamReader(
	                        connectionInvoke.getInputStream(),"utf-8"));
	
	        String line;
	        
	        while ((line = reader.readLine()) != null) {
	                String sResult = line;
	                System.out.println(sResult);
	        }
	        connectionInvoke.disconnect();
        }
       

        /**
         * 把中文转成Unicode码
         * @param str
         * @return
         */
        public static String chinaToUnicode(String str) {
                String result = "";
                for (int i = 0; i < str.length(); i++) {
                        int chr1 = (char) str.charAt(i);
                        if (chr1 >= 19968 && chr1 <= 171941) {// 汉字范围 \u4e00-\u9fa5 (中文)
                                result += "\\u" + Integer.toHexString(chr1);
                        } else {
                                result += str.charAt(i);
                        }
                }
               
                return result;
        }
        

}
