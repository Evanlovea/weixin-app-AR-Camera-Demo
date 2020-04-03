package util;

import MySql.bean.Open_Id;
import MySql.dao.Open_IdDao;
import database.mysql;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

/**
 * Created by hubo on 2017/11/10
 * openid数据库的操作指令
 */
public class AccessOpenId extends HttpServlet{
    /**
     * 获取用户登陆openid方法
     */
    private static final String APPID = "wxfeb671d46a9754f1";   //小程序的APPID
    private static final String APPSECRET = "db2c806f8f43f4c59acbde4dfc9199a6"; //小程序的appsecret
    private static final String OPENID_URL = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret" +
                                            "=SECRET&js_code=JSCODE&grant_type=authorization_code";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String Code = req.getParameter("code"); //获取前台传入的参数

        String url = OPENID_URL.replace("APPID",APPID).replace("SECRET",APPSECRET).replace("JSCODE",Code);

        JSONObject jsonObject = WeixinUtil.doGetStr(url);   //调取Get提交方法

        String OpenId = jsonObject.getString("openid"); //获取openid

        Open_Id ne = new Open_Id(); //静态变量存储openid

        Open_Id.setOpenId(OpenId);

        //这里需要判断一下openid是否存在过
        String sqlopenid = "select openid from Open_Id where openid = " + "'" + Open_Id.getOpenId() + "'";
        Open_IdDao oldopenid = new Open_IdDao();
        String reslult =  oldopenid.select(sqlopenid,"openid");

        //如果不存在 将token存入数据库
        if(reslult==null){
            String sql = "INSERT INTO Open_Id (openid)" + "values(?)";  //数据库命令

            Open_IdDao open_id = new Open_IdDao();

            open_id.insert(ne,sql);
        }
    }

}
