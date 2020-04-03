package util;

import MySql.bean.Card_Id;
import MySql.bean.Code;
import MySql.bean.Open_Id;
import MySql.dao.CodeDao;
import MySql.dao.Open_IdDao;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by hubo on 2017/11/15
 */
public class AccessAddCard extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String success = req.getParameter("success");
        System.out.println(req.getParameter("success"));
        if(success.equals(success)){

            Open_Id ne = new Open_Id(); //静态变量存储openid
            String sql = "INSERT INTO code (openid)" + "values(?)";  //数据库命令
            Open_IdDao open_id = new Open_IdDao();
            open_id.insert(ne,sql); //存入openid


            CodeDao code = new CodeDao();   //将code存入数据库中   ！！！！！！下面有bug 只能第一次领取 以后领取会覆盖
            sql = "update code set code=" + "'" + Code.getCode() + "'" + " where openid = " + "'" + Open_Id.getOpenId() + "'" + "and code is null";
            code.update(sql);

            sql = "update code set cardid=" + "'" + Card_Id.getCardid() + "'" + " where openid = " + "'" + Open_Id.getOpenId() + "'" + "and cardid is null";//将cardid存入数据库中
            code.update(sql);

        }

    }
}
