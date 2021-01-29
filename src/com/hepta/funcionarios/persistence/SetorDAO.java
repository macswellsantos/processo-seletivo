package com.hepta.funcionarios.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.hepta.funcionarios.entity.Funcionario;
import com.hepta.funcionarios.entity.Setor;

public class SetorDAO {
	
	public void save(Setor setor) throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(setor);
			em.getTransaction().commit();
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Setor> getAll() throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		List<Setor> setor = new ArrayList<>();
		try {
			Query query = em.createQuery("FROM Setor");
			setor = query.getResultList();
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}
		return setor;
	}
	
}
