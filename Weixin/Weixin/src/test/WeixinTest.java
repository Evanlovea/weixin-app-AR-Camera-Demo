package test;

import MySql.bean.Open_Id;
import Wx.WeixinSignature;
import util.*;

//public class WeixinTest {
//    public static void main(String[] args) {
//        //AccessToken token = Open_Id.getToken();    //获取AcceccToken
//        AccessApiTicket api = WeixinUtil.getApiTicket();    //获取ApiTicket
//        Accesstime time = new Accesstime(); //创建一个获取时间
//        Accessnonce_str nonce = new Accessnonce_str();
//        AccessTextFile text = new AccessTextFile(); //创建一个文本输出
//        //text.writeFromBuffer(token.getToken(),"token.txt");
//        //text.writeFromBuffer(token.getExpiresIN(),"token.txt");
////        System.out.println("Token："+token.getToken());
////        System.out.println("有效时间："+token.getExpiresIN());
////        System.out.println("获取时间："+time.time());
////        System.out.println("ticket："+api.getApiticket());
////        System.out.println("timestamp："+time.timestamp());
////        System.out.println("nonce："+nonce.nonce_str());
//        WeixinSignature signature = new WeixinSignature(api.getApiticket(),time.timestamp(),"123",nonce.nonce_str());
//        System.out.println("signature："+signature.sign());
//        System.currentTimeMillis();
//    }
//
//}
