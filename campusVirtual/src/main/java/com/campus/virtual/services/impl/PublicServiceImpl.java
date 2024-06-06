package com.campus.virtual.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus.virtual.models.AdminUser;
import com.campus.virtual.models.CatalogoCursos;
import com.campus.virtual.models.OrdenPago;
import com.campus.virtual.repository.CatalogoCursosRepository;
import com.campus.virtual.repository.CuentaAdminRepository;
import com.campus.virtual.repository.MateriasRepository;
import com.campus.virtual.repository.RepositoryOrder;
import com.campus.virtual.repository.TipActRepository;
import com.campus.virtual.services.PublicService;

@Service
public class PublicServiceImpl implements PublicService {
	
	@Autowired
	private CatalogoCursosRepository cursoRepo;

	@Autowired
	private CuentaAdminRepository AdminUserRepo;
	
	@Autowired
	private MateriasRepository materiaRepo;;
	
	@Autowired
	private TipActRepository tipActRepo;;
	
	
///////////////////////////////SERVICIOS CATALOGOS//////////////////////////////
	@Override
	public Object addCurso(CatalogoCursos newCurso) throws Exception {
		// TODO Auto-generated method stub
		return this.cursoRepo.save(newCurso);
	}

	@Override
	public Object getAllCursos() throws Exception {
		// TODO Auto-generated method stub
		return this.cursoRepo.getAllCurso();
	}
	
	
	@Override
	public Object getCursoToMatricula(int orde) throws Exception {
		// TODO Auto-generated method stub
		return this.cursoRepo.getCursoToMatricula(orde);
	}

	
	

	@Override
	public Object ColabXcurso(Long idColab, Long idCurso) throws Exception {
		
		CatalogoCursos curso = new CatalogoCursos();
		AdminUser docente = new AdminUser();
		docente =this.AdminUserRepo.findById(idColab).get();
		curso= this.cursoRepo.findById(idCurso).get();
		
		curso.setDocente(docente);
		docente.setIdCurso(idCurso);
		docente.setNameCurso(curso.getName());
//		docente.setCurso(curso);
		this.AdminUserRepo.save(docente);
		this.cursoRepo.save(curso);
		return "ok";
	}
	
	
	@Override
	public Object getActiveMateriaByCurso(Long idCurso)throws Exception {
		return this.materiaRepo.getByActiveXCurso(idCurso);
	}

	@Override
	public Object geTipActByActive() throws Exception {
		// TODO Auto-generated method stub
		return this.tipActRepo.getByActive();
	}

	
	
	
	
	

///////////////////////////////SERVICIOS ORDEN DE PAGOS//////////////////////////////	
	
	


}
