package com.hepta.funcionarios.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.hepta.funcionarios.entity.Funcionario;
import com.hepta.funcionarios.entity.Setor;
import com.hepta.funcionarios.persistence.SetorDAO;

@Path("/setores")
public class SetorService {

	@Context
	private HttpServletRequest request;

	@Context
	private HttpServletResponse response;
	
	private SetorDAO dao;
	
	public SetorService() {
		dao = new SetorDAO();
	}

	protected void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	
	
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@POST
	public Response SetorCreate(Setor setor) {
		
		try {
			dao.save(setor);
		} catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao cadastrar setor").build();
		}
		
		return Response.status(Status.CREATED).build();
	}
	
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	public Response SetorRead() {
		List<Setor> setor = new ArrayList<>();
		try {
			setor = dao.getAll();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar setores").build();
		}

		GenericEntity<List<Setor>> entity = new GenericEntity<List<Setor>>(setor) {
		};
		
		
		return Response.status(Status.OK).entity(entity).build();
	}
	
}
