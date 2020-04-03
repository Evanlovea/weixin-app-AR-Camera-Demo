package util;

import MySql.bean.Open_Id;
import MySql.dao.Open_IdDao;
import database.mysql;

import java.sql.SQLException;

public class AccessToken {
    /**
     * 数据库存取token值的操作
     */

    //将token存入数据库中
    public void setSqlToken(String token) {

        String sql = "update Open_Id set token="+"'"+token+"'"+" where openid = "+"'"+Open_Id.getOpenId()+"'";

        Open_IdDao Token = new Open_IdDao();

        Token.update(sql);
    }
    //读取数据库中是否有token值
    public String getSqlToken(){

        String sql = "select token from Open_Id where openid = " + "'" + Open_Id.getOpenId() + "'";

        Open_IdDao en = new Open_IdDao();

        return en.select(sql,"token");
    }
}
