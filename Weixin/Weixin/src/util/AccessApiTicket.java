package util;

import MySql.bean.Open_Id;
import MySql.dao.Open_IdDao;
import net.sf.json.JSONObject;

public class AccessApiTicket {
    private String apiticket;

    public String getApiticket() {
        return apiticket;
    }
    public void setApiticket(String apiticket) {
        this.apiticket = apiticket;
    }

    //将apitick存入数据库中
    public void setSqlticket(String token) {

        String sql = "update Open_Id set apiticket="+"'"+Open_Id.getApiTicket()+"'"+" where openid = "+"'"+ Open_Id.getOpenId()+"'";

        Open_IdDao ApiTicket = new Open_IdDao();
        ApiTicket.update(sql);
    }
    //读取数据库中是否有token值
    public String getSqlticket(){

        String sql = "select apiticket from Open_Id where openid = " + "'" + Open_Id.getOpenId() + "'";

        Open_IdDao en = new Open_IdDao();
        return en.select(sql,"apiticket");
    }
}
