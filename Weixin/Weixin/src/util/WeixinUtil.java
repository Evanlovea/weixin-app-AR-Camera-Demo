package util;

import MySql.bean.Open_Id;
import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class WeixinUtil {

    private static final String APPID = "wx84805a565ca92443";   //微信公众号
    private static final String APPSECRET = "864418fe938a83217652fabb9cb1ffdd"; //公众号
    private static final String CARD_ID = "p-TKW0kXEaTB0PRCjxUsgQqhnOAc";
    private static final String ACCECC_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
    private static final String API_TICKET = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card";
    //public static String Token;
    /**
     * get请求
     * @param url
     * @return
     */
    public static JSONObject doGetStr(String url){

        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpGet httpGet = new HttpGet(url);

        JSONObject jsonObject = null;

        try {
            HttpResponse response = httpClient.execute(httpGet);

            HttpEntity entity = response.getEntity();   //接受结果
            if(entity != null){
                String result = EntityUtils.toString(entity,"UTF-8");
                jsonObject = JSONObject.fromObject(result);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonObject;
    }

    /**
     * post请求
     * @param url
     * @param outStr
     * @return
     */
    public static JSONObject doPostStr(String url,String outStr){
        DefaultHttpClient  httpClient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost(url);
        JSONObject jsonObject = null;
        httpPost.setEntity(new StringEntity(outStr,"UTF-8"));
        try {
            HttpResponse response = httpClient.execute(httpPost);
            String result = EntityUtils.toString(response.getEntity(),"UTF-8");
            jsonObject = JSONObject.fromObject(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
    /**
     * 获取access_token
     * @return
     */
    public static void getAcceccToken(){

        AccessToken token = new AccessToken();
        String sqltoken = token.getSqlToken();  //得到数据库中存储的token

        Accesstime time = new Accesstime();
        String oldTime = time.getSqlTime(); //数据库中的时间
        if(oldTime == null)
            oldTime = "0";
        String newTime = time.timestamp();  //当前时间戳
        int sum = (Integer.parseInt(newTime))-(Integer.parseInt(oldTime));  //时间戳转换为int
//        System.out.println(sqltoken);
//        System.out.println(sum);
        if((sqltoken != null)&&(sum<7200))  //判断数据库中的token 以及获取的时间
        {
            Open_Id.setToken(sqltoken);
        }
        else {
            String url = ACCECC_TOKEN_URL.replace("APPID", APPID).replace("APPSECRET", APPSECRET);
            JSONObject jsonObject = doGetStr(url);  //调用get方法
            if (jsonObject != null) {

                Open_Id.setToken(jsonObject.getString("access_token")); //获取得到的token 存入静态token常量中

                token.setSqlToken(Open_Id.getToken());  //将token存入数据库中

                time.setSqlTime();  //将获取的time存入数据库中
            }
        }
    }
    /**
     * 获取api_ticket
     * @return
     */
    public static void getApiTicket(){

        AccessApiTicket apiTicket = new AccessApiTicket();
        String ticket = apiTicket.getSqlticket();
        //Open_Id.setApiTicket(apiTicket.getSqlticket()); //数据库中是不是有ticket
        Accesstime time = new Accesstime(); //获取时间
        String oldTime = time.getSqlTimeTicket(); //数据库中apiticket的时间
        if(oldTime == null)
            oldTime = "0";
        String newTime = time.timestamp();  //当前时间戳
        int sum = (Integer.parseInt(newTime))-(Integer.parseInt(oldTime));  //时间戳转换为int
        if((ticket != null)&&(sum<7200)) {
            Open_Id.setApiTicket(ticket);
        }
        else{
            String url = API_TICKET.replace("ACCESS_TOKEN",Open_Id.getToken());
            JSONObject jsonObject = doGetStr(url);
            if(jsonObject != null){
                Open_Id.setApiTicket(jsonObject.getString("ticket"));
                apiTicket.setSqlticket(jsonObject.getString("ticket"));
                time.setSqlTimeTicket();
            }
        }
    }
}
