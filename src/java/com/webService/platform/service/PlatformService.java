package com.webService.platform.service;

import java.util.List;
import java.util.Map;

public interface PlatformService {

    List<Map<String, Object>> selectAPI (Map<String, Object> commandMap) throws Exception;

    List<Map<String, Object>> selectAPISecond (Map<String, Object> commandMap) throws Exception;
}















