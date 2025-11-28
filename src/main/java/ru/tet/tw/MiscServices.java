package ru.tet.tw;

import javax.naming.Context;
import javax.naming.InitialContext;

/**
 * Разные вспомогательные сервисы.
 * 
 * @author tetsuma
 *
 */
public class MiscServices {

	private static final MiscServices instance = new MiscServices();

	private MiscServices() {
	}

	public static MiscServices getInstance() {
		return instance;
	}
	
	
  private Context envCtx=null;
  
  public Object getJNDIEnvironmentVariable(String varName) {
    
    if (envCtx==null){
      
      try {
        envCtx = new InitialContext();
        envCtx = (Context) envCtx.lookup("java:comp/env");
      } catch (Exception e) {
        throw new RuntimeException("Cannot find JNDI context!",e);
      }
    }

    try {
      return envCtx.lookup(varName);
    } catch (Exception e) {
      return null;
    }
  }	  
  
	
}
