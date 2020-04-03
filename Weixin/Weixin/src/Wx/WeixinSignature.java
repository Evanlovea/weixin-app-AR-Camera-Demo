package Wx;


import util.CheckUtil;

import java.util.Arrays;

/**
 * Created by hubo on 2017/11/7
 * 加密signature
 */
public class WeixinSignature {
    private  String api_ticket;
    private  String timestamp;
    private  String card_id;
    private  String nonce_str;

    public WeixinSignature(String api_ticket, String timestamp, String card_id, String nonce_str){
        this.api_ticket = api_ticket;
        this.timestamp = timestamp;
        this.card_id = card_id;
        this.nonce_str = nonce_str;
    }

    /**
     * 加密参数
     * @return
     */
    public String sign(){

        String[] str = {api_ticket,timestamp,card_id,nonce_str};
        Arrays.sort(str);
        String string = new String();
        for(int i=0; i<4; i++){
            string += str[i];
        }
        String signature = null;    //加密结果
        signature = CheckUtil.getSha1(string);  //Sha1加密
        return signature;
    }

}
