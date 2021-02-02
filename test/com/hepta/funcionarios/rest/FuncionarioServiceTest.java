package com.hepta.funcionarios.rest;



import static io.restassured.RestAssured.*;

import org.junit.jupiter.api.Test;

public class FuncionarioServiceTest {


	
	@Test
	public void testFuncionarioRead() {
		given().
		when().get("/funcionarios").then().log().all();
		
	}

}
