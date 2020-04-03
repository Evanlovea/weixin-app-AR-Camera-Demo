package MySql.bean;

import MySql.dao.Card_IdDao;

import java.util.ArrayList;

/**
 * Created by hubo on 2017/11/15
 */
public class Card_Id {
    private int id;
    private static String cardid;
    //Card_IdDao CardList = new Card_IdDao();

    //public ArrayList<Card_Id> en = CardList.getList(); //公众的获取数据库中卡券列表

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public static String getCardid() {
        return cardid;
    }

    public static void setCardid(String Cardid) {
        cardid = Cardid;
    }
}
