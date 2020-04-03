package util;

import MySql.bean.Card_Id;
import MySql.bean.Code;
import MySql.dao.CodeDao;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * Created by hubo on 2017/11/15
 */
public class AccessCodeList extends HttpServlet{

    ArrayList<Code> CodeList = new CodeDao().getList();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        PrintWriter out = resp.getWriter(); //返回数据到前台
        JSONObject jsonObject = new JSONObject();
        for (Code ar : CodeList
                ) {
            jsonObject.put(ar.getCardId(),ar.getCode());
        }
        out.print(jsonObject.toString());
    }
}
