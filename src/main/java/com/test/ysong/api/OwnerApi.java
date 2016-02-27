package com.test.ysong.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.ysong.Application;
import com.test.ysong.Cache;
import com.test.ysong.models.Owner;
import spark.Request;
import spark.Response;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by ysong on 16/2/25.
 */
public class OwnerApi {

    static final Logger log = Logger.getGlobal();
    public static Object post(Request request, Response response) {
        HashMap<String,Object> ret = new HashMap<String,Object>();

        try {
            JsonNode data = new ObjectMapper().readTree(request.body());

            String name = data.get("name").asText();
            Owner o  = new Owner();
            o.setName(name);
            o.save();
            ret.put("id",o.getId());
            log.log(Level.INFO,"new owner saved: id="+o.getId());
        } catch (IOException e) {
            e.printStackTrace();
            log.log(Level.WARNING,"Exception:"+e.getMessage());
        }
        return ret;
    }

    public static Object all(Request request, Response response) {

        return null;
    }

    public static Object delete(Request request, Response response) {
        String id = request.params("id");

        if( "".equals(id) || id == null) {
            log.log(Level.WARNING,"Exception: remove null id owner");

        }else{
            Long tid = Long.parseLong(id);
            Owner.find.byId(tid).delete();
            log.log(Level.INFO,"owner deleted: id="+tid);

        }
        return "ok";

    }

}
