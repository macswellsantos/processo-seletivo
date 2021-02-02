package com.hepta.funcionarios.rest;


import org.junit.Test;

import static io.restassured.RestAssured.*;

public class FuncionarioServiceTest {


	
	@Test
	public void testFuncionarioRead() {
		given().
		when().get("https://pokeapi.co/api/v2/pokemon/1").then().log().all();
		
	}

}
