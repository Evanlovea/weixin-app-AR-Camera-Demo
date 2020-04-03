package database;

/**
 * Created by hubo on 2017/11/11
 */
import java.sql.*;

public class mysql {
    /*
     * java链接数据库
     * 1.加载驱动程序
     * 2.数据库链接字符串URL
     * 3.数据库登陆账号 密码
     */
    private static final String URL = "jdbc:mysql://localhost:3306/Weixin";
    private static final String USER = "root";
    private static final String PASSWORD = "123123";
    public Connection con = null;//声明Connection对象
    public PreparedStatement pst = null;
    public Statement stmt = null;
    public void TheSqlConnection(String sql) {
        //1.加载驱动
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("未能成功加载驱动程序，请检查是否导入驱动程序！");
            // 添加一个printl，如果加载驱动异常，检查添加驱动，驱动字符串
            e.printStackTrace();
        }
        try {
            //getConnection链接数据库
            con = DriverManager.getConnection(URL,USER,PASSWORD);
            //System.out.println("数据库链接成功！");

            pst = con.prepareStatement(sql);//准备执行语句

        } catch (SQLException e) {
            System.out.println("数据库链接失败!");
            //检查链接的用户名密码
            e.printStackTrace();
        }
    }

    public void TheSqlQuery(){
        //加载驱动
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("未能成功加载驱动程序，请检查是否导入驱动程序！");
            e.printStackTrace();
        }
        try {
            con = con = DriverManager.getConnection(URL,USER,PASSWORD);

            //执行查询
            stmt = con.createStatement();

            //ResultSet re = stmt.executeQuery(sql);
        } catch (SQLException e) {
            System.out.println("数据库链接失败!");
            //检查链接的用户名密码
            e.printStackTrace();
        }

    }
}