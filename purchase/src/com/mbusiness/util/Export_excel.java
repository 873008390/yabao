package com.mbusiness.util;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;

/**
 * ����excel
 * @author 
 *
 */
public class Export_excel {
	
	public static String execute(String prefileName, List<String> titles, List<String> filedNames, List<Map<String,String>> filedValues){
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
				
		workbook.setSheetName(0,"����");
		HSSFRow row;
		HSSFCell cell;
		sheet.setColumnWidth(0, 4000);
		//д������ֶε�����  
		row = sheet.createRow(0);
		row.setHeight((short) 400);
		for(int i=1; i<=titles.size(); i++){
			cell = row.createCell(i-1);  
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			cell.setCellValue(titles.get(i-1)); 
		}
		//д�������¼��ÿ����¼��ӦExcel�е�һ�� 
		for(int i=1; i<=filedValues.size(); i++){
			//����һ��
			row= sheet.createRow(i); 
			row.setHeight((short) 450);
			for(int j=0 ;j<titles.size() ;j++){
				cell = row.createCell(j);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				//�����ֶ���ȡ��ֵ��������
				cell.setCellValue(filedValues.get(i-1).get(filedNames.get(j)));	
			}
			
		}
		SimpleDateFormat df=new SimpleDateFormat("yyyyMMddHHmmss");
		String path = ServletActionContext.getServletContext().getRealPath("download");
		String fileName = df.format(new Date())+".xls";
		String filePath = path+"\\"+ prefileName + fileName;
		FileOutputStream fOut;
		File file;
		try {
			file = new File(filePath);
			if(!file.exists()){
				file.createNewFile();
			}
			fOut = new FileOutputStream(file);
			workbook.write(fOut);
			fOut.flush();
			fOut.close();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return "download/" + prefileName + fileName;
	}
}
