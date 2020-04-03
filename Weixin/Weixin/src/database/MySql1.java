package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;


/**
 * Created by hubo on 2017/11/11
 * 数据库链接操作
 */
public class MySql1 {
    //JDBDC 驱动名称及数据库URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/WeiXin";

    //数据库的用户名密码
    static final String USER = "root";
    static final String PASS = "123123";

    static Connection conn = null;
    static Statement stmt = null;

    public static Statement MYSQL(){

        try {
            //注册JDBC驱动
            Class.forName(JDBC_DRIVER);

            //打开链接
            //System.out.println("链接数据库");
            conn = DriverManager.getConnection(DB_URL,USER,PASS);

            //执行查询
            //System.out.println("实例化");
            stmt = conn.createStatement();

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return stmt;
    }
    public static void MYSQLCLOSE(){
        try {
            //完成后关闭
            stmt.close();
            conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

}
