package MySql.bean;

/**
 * Created by hubo on 2017/11/15
 */
public class Code {
    private static String Code;
    private String CardId;  //数据库中已经领取的卡券ID

    public String getCardId() {
        return CardId;
    }

    public void setCardId(String cardId) {
        CardId = cardId;
    }

    private int Id;

    public int getId() {
        return Id;
    }

    public void setId(int n) {
        this.Id = n;
    }

    public static String getCode() {
        return Code;
    }

    public static void setCode(String code) {
        Code = code;
    }
}
