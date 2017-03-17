package com.mbusiness.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class IteratorObjectOfField {
	
	/**
	 * 获得对象的属性值
	 * @param obj
	 * @return 返回对象属性值的集合
	 * @throws NoSuchMethodException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 */
	public List<String> objectReflect(Object obj) throws NoSuchMethodException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
		List<String> fieldList = new ArrayList<String>();
		Field[] field = obj.getClass().getDeclaredFields();        //获取实体类的所有属性，返回Field数组  
        for(int j=0 ; j<field.length ; j++){     //遍历所有属性
                String name = field[j].getName();    //获取属性的名字
                
                //System.err.println("attribute name:"+name);     
                name = name.substring(0,1).toUpperCase()+name.substring(1); //将属性的首字符大写，方便构造get，set方法
                String type = field[j].getGenericType().toString();    //获取属性的类型
                
                if(type.equals("class java.lang.String")){   //如果type是类类型，则前面包含"class "，后面跟类名
                    Method m = obj.getClass().getMethod("get"+name);
                    String value = (String) m.invoke(obj);    //调用getter方法获取属性值
                    if(value != null){
                    	fieldList.add(value);
                        //System.err.println("attribute value:"+value);
                    }
                }
                
                if(type.equals("int")){
                	Method m = obj.getClass().getMethod("get"+name);
                    Integer  value = (Integer) m.invoke(obj);
                    if(value != null){
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value);
                    }
                }
                
                if(type.equals("class java.lang.Integer")){     
                    Method m = obj.getClass().getMethod("get"+name);
                    Integer  value = (Integer) m.invoke(obj);
                    if(value != null){
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value);
                    }
                }
                
                if(type.equals("float")){     
                    Method m = obj.getClass().getMethod("get"+name);
                    Float value = (Float) m.invoke(obj);
                    if(value != null){
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value); 
                    }
                }  
                if(type.equals("class java.lang.Float")){     
                    Method m = obj.getClass().getMethod("get"+name);
                    Float value = (Float) m.invoke(obj);
                    if(value != null){
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value);
                    }
                }   
                
                if(type.equals("long")){     
                    Method m = obj.getClass().getMethod("get"+name);
                    Long value = (Long) m.invoke(obj);
                    if(value != null){   
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value);
                    }
                }
                if(type.equals("class java.lang.Long")){     
                    Method m = obj.getClass().getMethod("get"+name);
                    Long value = (Long) m.invoke(obj);
                    if(value != null){   
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value); 
                    }
                }    
                
                if(type.equals("boolean")){
                    Method m = obj.getClass().getMethod("get"+name);    
                    Boolean value = (Boolean) m.invoke(obj);
                    if(value != null){  
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value);
                    }
                }
                if(type.equals("class java.lang.Boolean")){
                    Method m = obj.getClass().getMethod("get"+name);    
                    Boolean value = (Boolean) m.invoke(obj);
                    if(value != null){  
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value);
                    }
                }
                
                if(type.equals("class java.util.Date")){
                    Method m = obj.getClass().getMethod("get"+name);                    
                    Date value = (Date)m.invoke(obj);
                    if(value != null){
                    	fieldList.add(value.toString());
                        //System.err.println("attribute value:"+value.toString());
                    }
                }  
                
            }
        return fieldList;
    }
	
	
}
