package util;

import MySql.bean.Card_Id;
import MySql.bean.Open_Id;
import MySql.dao.Card_IdDao;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * Created by hubo on 2017/11/9
 */
public class AccessCardId extends HttpServlet{

    Card_IdDao CardList = new Card_IdDao();

    public ArrayList<Card_Id> en = CardList.getList(); //公众的获取数据库中卡券列表

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        PrintWriter out = resp.getWriter(); //返回数据到前台
        JSONObject jsonObject = new JSONObject();
        for (Card_Id ar : en
             ) {
            jsonObject.put(ar.getId(),ar.getCardid());
        }
        out.print(jsonObject.toString());
    }

}
