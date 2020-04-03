package MySql.dao;

import MySql.bean.Card_Id;
import MySql.bean.Code;
import MySql.bean.Open_Id;
import MySql.util.BaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by hubo on 2017/11/15
 */
public class CodeDao {
    public void update(String sql){ //存入数据
        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;

        try {
            ps = conn.prepareStatement(sql);
            int a = ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(ps,conn);
        }

    }
    //读取数据库中code的数据
    public ArrayList<Code>getList(){

        ArrayList<Code> ar = new ArrayList<>();

        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;

        String sql = "select * from code where openid=" + "'" + Open_Id.getOpenId() + "'";

        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                Code ne = new Code();
                ne.setId(rs.getInt("id"));  //这里的ID需要改为前面领取的id
                //ne.(rs.getString("card"));
                ne.setCode(rs.getString("code"));
                ne.setCardId(rs.getString("cardid"));
                ar.add(ne);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(rs,ps,conn);
        }
        return ar;
    }
}
