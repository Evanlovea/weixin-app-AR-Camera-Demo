package MySql.dao;

import MySql.bean.Open_Id;
import MySql.util.BaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by hubo on 2017/11/12
 */
public class Open_IdDao {
    //读取数据库中的数据
    public ArrayList<Open_Id> getList(){

        ArrayList<Open_Id> ar = new ArrayList<>();

        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;    //SQL执行器对象，另一个执行器对象Statment,使用这个防止SQL注入，并且效率比statment效率高
        ResultSet rs = null;    //结果及对象

        String sql = "select * from Open_ID";
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery(); //执行数据库查询的方法
            while(rs.next()){
                Open_Id ne = new Open_Id();
                ne.setOpenId(rs.getString("openid"));
                ne.setTime(rs.getString("time"));
                ar.add(ne); //信息
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {  //一定要关闭
            BaseConnection.closeRes(rs,ps,conn);
        }
        return ar;
    }
    //读取数据库中的数据,s为读取数据的参数
    public String select(String sql,String s){
        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String result = null;
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next())  //必须获取下一个数值
            result = rs.getString(s);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(ps,conn);
        }
        return result;
    }
    //改方法将传递过来的对象传入数据库中
    public void insert(Open_Id ne,String sql){
        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;

        //String sql = "insert into Open_Id (openid,token,code,time,cardid)" + "values
        // ('"+ne.getOpenId()+"','"+ne.getTime()+"','"+ne.getToken()+"','11','11')";
        //String sql = "INSERT INTO Open_Id (openid,token,code)" + "values(?,?,?)";   //占位符操作
        //System.out.println(ne.getOpenId());
        try {

            ps = conn.prepareStatement(sql);    //将sql语句传入数据库
            ps.setString(1,ne.getOpenId());
            int a = ps.executeUpdate(); //用于改变数据库数据 a代表改变数据库的条数

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(ps,conn);
        }
    }

    //本方法用于将传递过来的对象，根据，改变数据库中的值
    public boolean update(Open_Id ne){
        boolean b = false;
        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;

        String sql = "update Open_Id set openid = ?"+"where token= ?"; //占位符修改

        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1,ne.getToken());
            ps.setString(2,ne.getToken());
            int a = ps.executeUpdate();
            if(a>0)
                b = true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(ps,conn);
        }
        return b;
    }
    public boolean update(String sql){
        boolean b = false;
        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps = null;

        try {
            ps = conn.prepareStatement(sql);
            int a = ps.executeUpdate();
            if(a>0)
                b = true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(ps,conn);
        }
        return b;
    }
    //删除操作
    public boolean delete(int id){
        boolean b = false;
        Connection conn = BaseConnection.getConnection();
        PreparedStatement ps  = null;
        String sql = "delete from Open_Id where openid = ?";

        try {
            ps = conn.prepareStatement(sql);
            ps.setInt(1,id);

            int a = ps.executeUpdate();
            if(a>0)
                System.out.println("删除成功");
            else
                System.out.println("删除失败");
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            BaseConnection.closeRes(ps,conn);
        }
        return b;
    }
//    public static void main(String[] args) {
//        Open_Id ne = new Open_Id();
//        ne.setOpenId("66666");
//        //ne.setTime("1111");
//        ne.setToken("111");
//        Open_IdDao neda = new Open_IdDao();
//        neda.delete(111);
////        ArrayList<Open_Id> ar = new Open_IdDao().getList();
////        for(Open_Id ne : ar){
////            System.out.println(ne.getOpenId());
////        }
//    }
}
