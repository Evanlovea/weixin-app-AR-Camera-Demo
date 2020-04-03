package database;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by hubo on 2017/11/11
 */
public class Token {
    private static String sql; //sql语句



    public static void main(String[] args){

        sql = "SELECT * FROM Token";  //sql语句
        Statement stmt = MySql1.MYSQL();
        try {
            ResultSet rs = stmt.executeQuery(sql);  // 查询数据结果
            while(rs.next()){
                String code = rs.getString("code");
                System.out.println(code);
            }
            MySql1.MYSQLCLOSE();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }



}
