package Wx;

import MySql.bean.Card_Id;
import MySql.bean.Open_Id;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by hubo on 2017/11/7
 */
public class WeixinAddCard extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Card_Id.setCardid(req.getParameter("card")); //获取领取的卡券id
        WeixinUtil.getAcceccToken();        //获取AcceccToken
        WeixinUtil.getApiTicket();    //获取ApiTicket
        Accesstime time = new Accesstime(); //创建一个获取时间

        Accessnonce_str Nonce = new Accessnonce_str();  //随机数值

        Open_Id.setTime(time.timestamp());
        String nonce = Nonce.nonce_str();
        WeixinSignature signature = new WeixinSignature(Open_Id.getApiTicket(),Open_Id.getTime(), Card_Id.getCardid(),nonce);   //获取signature

        PrintWriter out = resp.getWriter(); //返回网页请求的数据
        JSONObject jsonObject = new JSONObject();   //返回JSON格式数据
        //jsonObject.put("apitick",Open_Id.getApiTicket());

//        System.out.println("时间："+Open_Id.getTime());
//        System.out.println("随机串："+nonce);
//        System.out.println("加密字符："+signature.sign());
//        System.out.println("cardid："+Card_Id.getCardid());

        jsonObject.put("timestamp", Open_Id.getTime());
        jsonObject.put("nonce_str", nonce);
        jsonObject.put("signature",signature.sign());
        jsonObject.put("card_id",Card_Id.getCardid());
        out.print(jsonObject.toString());
    }
}
