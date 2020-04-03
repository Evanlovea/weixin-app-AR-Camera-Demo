package util;

/**
 * Created by hubo on 2017/11/7
 * 随机字符串
 */
public class Accessnonce_str {
    private final static String string = "0123456789";
    final private static char[] chars =  string.toCharArray();

    public String nonce_str(){
        String nonce = new String();
        for(int i=0; i<10; i++){
            int rannum = (int)(Math.random()*1000) % (chars.length);
            nonce += chars[rannum];
        }
        return nonce;
    }
}
