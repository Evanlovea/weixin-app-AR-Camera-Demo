package util;

import MySql.bean.Code;
import MySql.bean.Open_Id;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by hubo on 2017/11/10
 *微信卡券的解密Code
 */
public class AccessCode extends HttpServlet{

    private static final String Url = "https://api.weixin.qq.com/card/code/decrypt?access_token=TOKEN"; //解密code的地址

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String reqCode = req.getParameter("code"); //获取加密的code参数 和之前获取Openid的Code不一样


        String token = Open_Id.getToken();   //获取Token值

        String url = Url.replace("TOKEN",token);    //替换Url中的Token

        JSONObject code = new JSONObject(); //创建一个JSON对象

        code.put("encrypt_code",reqCode);

        JSONObject jsonObject = WeixinUtil.doPostStr(url,code.toString());  //post提交数据

        PrintWriter out = resp.getWriter(); //前台返回数据
        Code.setCode(jsonObject.getString("code"));
        out.print(jsonObject.getString("code"));

//        System.out.println(code.toString());
//        System.out.println(jsonObject);
    }
}
