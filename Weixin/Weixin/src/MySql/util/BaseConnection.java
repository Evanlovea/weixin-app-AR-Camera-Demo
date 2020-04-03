package MySql.util;

import java.sql.*;

/**
 * Created by hubo on 2017/11/12
 * 链接数据库
 */
public class BaseConnection {

    public static Connection getConnection(){

        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver"); //加载驱动包
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/WeiXin","root","123123");   // 链接数据库
        }   catch (Exception e){
            e.printStackTrace();
        }
        return conn;
    }
    //关闭数据库
    public static void closeRes(ResultSet rs, PreparedStatement ps,Connection conn){
        try {
            if(rs!=null)
                rs.close();
            if(ps!=null)
                ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if(conn!=null)
                conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static void closeRes(PreparedStatement ps,Connection conn){
        try {
            if(ps!=null)
                ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if(conn!=null)
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
