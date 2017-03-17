package com.mbusiness.util;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;



import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * ����pdf�ļ�
 * @author
 *
 */
public class Export_pdf {
	Document document = new Document();// ����һ��Document����        
	    
    private static Font headfont ;// ���������С    
    private static Font keyfont;// ���������С    
    private static Font textfont;// ���������С
    
    static{    
        BaseFont bfChinese;    
        try {    
              
            bfChinese = BaseFont.createFont("STSong-Light","UniGB-UCS2-H",BaseFont.NOT_EMBEDDED);    
            headfont = new Font(bfChinese, 10, Font.BOLD);// ����ͷ���������С    
            keyfont = new Font(bfChinese, 8, Font.BOLD);// �����ֶ��������С    
            textfont = new Font(bfChinese, 8, Font.NORMAL);// �����������������С    
        } catch (Exception e) {             
            e.printStackTrace();    
        }     
    } 
    public Export_pdf(File file,int columns) {
    	document.setPageSize(PageSize.A4);
        try {    
           PdfWriter.getInstance(document,new FileOutputStream(file));    
           document.open();     
       } catch (Exception e) {    
           e.printStackTrace();    
       }     
           
           
    }
    
    /**
     * ����pfd��
     * @param colNumber
     * @return
     */
    public PdfPTable createTable(int colNumber,int columns){   
    	int maxWidth = 520;
        PdfPTable table = new PdfPTable(colNumber);
        try{ 
            table.setTotalWidth(maxWidth);
            table.setLockedWidth(true);    
            table.setHorizontalAlignment(Element.ALIGN_CENTER);         
            table.getDefaultCell().setBorder(1);
        }catch(Exception e){    
            e.printStackTrace();    
        }    
        return table;    
    } 
    /**
     * ���ñ���
     * @param value
     * @param font
     * @param align
     * @param colspan
     * @param boderFlag
     * @return
     */
    public PdfPCell createCell(String value,Font font,int align,int colspan,boolean boderFlag){    
        PdfPCell cell = new PdfPCell();    
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);    
        cell.setHorizontalAlignment(align);        
        cell.setColspan(colspan);    
        cell.setPhrase(new Phrase(value,font));    
        cell.setPadding(3.0f);    
        if(!boderFlag){    
            cell.setBorder(0);    
            cell.setPaddingTop(15.0f);    
            cell.setPaddingBottom(8.0f);    
        }    
       return cell;    
    } 
    /**
     * �����ֶ���
     * @param value
     * @param font
     * @param align
     * @return
     */
    public PdfPCell createCell(String value,Font font,int align){    
        PdfPCell cell = new PdfPCell();    
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);            
        cell.setHorizontalAlignment(align);        
        cell.setPhrase(new Phrase(value,font));
       return cell;    
    }
    /**
     * ������������
     * @param value
     * @param font
     * @return
     */
    public PdfPCell createCell(String value,Font font){    
        PdfPCell cell = new PdfPCell();    
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);    
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);     
        cell.setPhrase(new Phrase(value,font));    
       return cell;    
    } 
    /**
     * ����pdf
     * @param prefileName
     * @param titles
     * @param filedNames
     * @param filedValues
     * @throws DocumentException
     */
    public void generatePDF(String prefileName,List<String> titles,List<String> filedNames,List<Map<String,String>> filedValues) throws DocumentException{ 
    	//��ҳ
    	int recordPerPage = 20;
    	int fullPageRequired = 1;
    	if(filedValues.size() > 1){
    		fullPageRequired = filedValues.size()/recordPerPage;
    	}
		
		int remainPage = filedValues.size()%recordPerPage>1?1:0;
		int totalPage = fullPageRequired+remainPage;
		int index = 0;
    	for(int n=0; n<totalPage; n++){
    		document.newPage();
    		PdfPTable table = createTable(titles.size(),filedNames.size());
    		if(n == 0){
    			//���ñ���
    			table.addCell(createCell(prefileName+":", headfont,Element.ALIGN_LEFT,titles.size(),false));
    			//�����ֶ���
    			for(int i=0; i<titles.size(); i++){
    				 table.addCell(createCell(titles.get(i), keyfont, Element.ALIGN_CENTER)); 
    			}
    		}
    		if(n == totalPage-1){
    			int num = filedValues.size()%recordPerPage;
    			//������������
    			for(int j=0; j<num; j++){
        			for(int m=0; m<filedNames.size(); m++){
        				 table.addCell(createCell(filedValues.get(index).get(filedNames.get(m)), textfont)); 
        			}
        			index ++;
        		}
    		}else{
    			//������������
        		for(int j=0; j<recordPerPage; j++){
        			
        			for(int m=0; m<filedNames.size(); m++){
        				 table.addCell(createCell(filedValues.get(index).get(filedNames.get(m)), textfont)); 
        			}
        			index ++;
        		}
    		}
    		
    		document.add(table);
    		
    	}
    	document.close();
    }
   
    /**
     * ִ��
     * @param prefileName
     * @param titles
     * @param filedNames
     * @param filedValues
     * @return
     */
	public static String execute(String prefileName,List<String> titles,List<String> filedNames,List<Map<String,String>> filedValues){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
		String path = ServletActionContext.getServletContext().getRealPath("download");
		String fileName = sdf.format(new Date()) +".pdf";
		String filePath = path+"\\"+ prefileName + fileName;
		File file = new File(filePath); 
		
        try {
        	file = new File(filePath);
        	new Export_pdf(file,filedNames.size()).generatePDF(prefileName, titles, filedNames, filedValues);
        	if(!file.exists()){
				file.createNewFile();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "download/"+prefileName + fileName;
	}
}
