package MySql.bean;

/**
 * Created by hubo on 2017/11/12
 */
public class Open_Id {
    private static String OpenId = null;
    private static String Token = null;
    private static String Time = null;
    private static String ApiTicket = null;

    public static String getApiTicket() {
        return ApiTicket;
    }

    public static void setApiTicket(String apiTicket) {
        ApiTicket = apiTicket;
    }
    public static String getOpenId() {
        return OpenId;
    }

    public static void setOpenId(String openId) {
        OpenId = openId;
    }

    public static String getToken() {
        return Token;
    }

    public static void setToken(String token) {
        Token = token;
    }

    public static String getTime() {
        return Time;
    }

    public static void setTime(String time) {
        Time = time;
    }
}
