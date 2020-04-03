package util;

import MySql.bean.Open_Id;
import MySql.dao.Open_IdDao;
import database.mysql;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by hubo on 2017/11/7
 * 获取时间和时间戳的方法
 * 数据库存读时间戳的操作
 */
public class Accesstime {

    /**
     * 获取时间
     * @return
     */
    public String time(){
        Date d = new Date();
        //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(d);
    }

    /**
     * 获取时间戳
     * @return
     */
    public String timestamp(){
        String time = String.valueOf(System.currentTimeMillis()/1000);   //获取一个时间戳 转换为String类型
        return time;
    }
    //token的存取时间
    public void setSqlTime(){

        String sql = "update Open_Id set time="+"'"+timestamp()+"'"+" where openid = "+"'"+ Open_Id.getOpenId()+"'";

        Open_IdDao Time = new Open_IdDao();

        Time.update(sql);
    }
    public String  getSqlTime(){
        String sqltime = "select time from Open_Id where openid = " + "'" + Open_Id.getOpenId() + "'";

        Open_IdDao Time = new Open_IdDao();

        return Time.select(sqltime,"time");
    }

    //apiticket的存取时间
    public void setSqlTimeTicket(){
        String sql = "update Open_Id set timeticket="+"'"+timestamp()+"'"+" where openid = "+"'"+ Open_Id.getOpenId()+"'";

        Open_IdDao Time = new Open_IdDao();

        Time.update(sql);

    }
    public String getSqlTimeTicket(){
        String sqltimeticket = "select timeticket from Open_Id where openid = "+"'"+ Open_Id.getOpenId()+"'";

        Open_IdDao Time = new Open_IdDao();

        return Time.select(sqltimeticket,"timeticket");
    }
}
