package com.webService.platform.controller;

import com.webService.platform.service.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class PlatformController {
    @Autowired
    PlatformService PlatformService;

    @RequestMapping(value = "/getInfo", method = RequestMethod.GET)
    public @ResponseBody Map<String, Object> getRequestInfo(@RequestBody Map<String, Object> commandMap) {
        Map<String, Object> response = new HashMap<String, Object>();
        String returnCode = "999";
        String returnMsg = "Error";
//        System.out.println("console" + commandMap);

        try {
            if(commandMap.get("param") != null) {
                response.put("list", PlatformService.selectAPI(commandMap));
                returnCode = "0";
                returnMsg = "SUCCESS";
            }
        } catch (Exception e) {
            returnMsg = "Err - " + e.getMessage();
        }
        response.put("code", returnCode);
        response.put("message", returnMsg);
        return response;
    }

    @RequestMapping(value = "/getInfoSecond", method = RequestMethod.POST)
    public @ResponseBody Map<String, Object> getRequestSecondInfo(@RequestBody Map<String, Object> commandMap) {
        Map<String, Object> response = new HashMap<String, Object>();
        String returnCode = "999";
        String returnMsg = "Error";

        try {

            if(commandMap.get("paramSecond") != null) {
                response.put("list", PlatformService.selectAPISecond(commandMap));
                returnCode = "0";
                returnMsg = "SUCCESS";
            }
        } catch (Exception e) {
            returnMsg = "Err - " + e.getMessage();
        }
        response.put("code", returnCode);
        response.put("message", returnMsg);
        return response;
    }
}
