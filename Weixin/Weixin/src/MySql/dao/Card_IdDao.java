package MySql.dao;

import MySql.bean.Card_Id;
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
public class Card_IdDao {
    //读取数据库中的数据
    public ArrayList<Card_Id> getList(){

        ArrayList<Card_Id> ar = new ArrayList<>();

        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;

        String sql = "select * from Card_Id";

        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                Card_Id ne = new Card_Id();
                ne.setId(rs.getInt("ID"));
                ne.setCardid(rs.getString("card"));
                ar.add(ne);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(rs,ps,conn);
        }
        return ar;
    }


//    public static void main(String[] args) {
//        ArrayList<Card_Id> en = new Card_IdDao().getList();
//        for (Card_Id ar:en
//             ) {
//            System.out.println(ar.getId());
//            System.out.println(ar.getCardid());
//        }
//    }
}
