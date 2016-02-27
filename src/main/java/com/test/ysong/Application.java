package com.test.ysong;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.ysong.api.CompanyApi;
import com.test.ysong.api.OwnerApi;
import freemarker.template.Configuration;
import org.avaje.agentloader.AgentLoader;
import spark.ResponseTransformer;
import spark.template.freemarker.FreeMarkerEngine;

import java.util.logging.Logger;

import static spark.Spark.*;
import static spark.Spark.post;

/**
 * Main class
 */
public class Application {
    private static Logger log = Logger.getGlobal();
    private static String apiVersion = "/api/v1";

    public static void main(String[] args) {
        //web server settings
        port(9000);
        staticFileLocation("/client/public");
        threadPool(/* maxThreads */ 8, /* minThreads */ 2, /* timeOutMillis */ 30000);
        dbMigration();

        before((req, res) -> {
            //FIXME do auth here
        });

        //serve routes
        site();
        api();
    }
    private static void dbMigration() {
        if (!AgentLoader.loadAgentFromClasspath(
                "avaje-ebeanorm-agent",
                "debug=0;packages=com.test.ysong.models.**"))
            log.warning("Db migration fall");
    }

    public static final ResponseTransformer withJsonFormat = new ResponseTransformer() {
        public String render(Object o) throws Exception {
            return new ObjectMapper().writeValueAsString(o);
        }
    };




    private static void api() {
        get(apiVersion + "/company"         , "application/json", CompanyApi::get    , withJsonFormat);
        get(apiVersion + "/company/:id"     , "application/json", CompanyApi::get    , withJsonFormat);
        post(apiVersion + "/company"        , "application/json", CompanyApi::post   , withJsonFormat);
        put(apiVersion + "/company"         , "application/json", CompanyApi::put    , withJsonFormat);
        delete(apiVersion + "/company/:id"  , "application/json", CompanyApi::delete , withJsonFormat);

        get(apiVersion + "/owner/:id"           , "application/json", OwnerApi::all      , withJsonFormat);
        post(apiVersion + "/owner"              , "application/json", OwnerApi::post     , withJsonFormat);
        delete(apiVersion + "/owner/:id"        , "application/json", OwnerApi::delete   , withJsonFormat);
    }

    private static void site() {
        Configuration c = new Configuration();
        c.setClassForTemplateLoading(Application.class, "/client/public");
        FreeMarkerEngine isWeb = new FreeMarkerEngine(c);
        // for now nothing
    }
}
