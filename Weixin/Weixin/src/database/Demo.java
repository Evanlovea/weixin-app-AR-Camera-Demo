package database;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by hubo on 2017/11/11
 */
public class Demo {
    static String sql = null;
    public static void main(String[] args) throws SQLException {

        sql = "insert into Token(code)"+"values(?)";

        mysql en = new mysql();
        en.TheSqlConnection(sql);


        System.out.println("执行结果如下：");
        //for(int i=1;i<=30;i++) {
            en.pst.setString(1,"xixixiixxix");

            en.pst.executeUpdate();
        //}

        sql = "SELECT * FROM Token";  //sql语句
        en.TheSqlQuery();
        ResultSet rs = en.stmt.executeQuery(sql);
        while(rs.next()){
            String code = rs.getString("code");
            System.out.println(code);
        }
        en.con.close();
    }
}
