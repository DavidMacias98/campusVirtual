import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { PublicServicesService } from 'src/app/services/public-services.service';
import { ModalColabsComponent } from '../components/modal-colabs/modal-colabs.component';

@Component({
  selector: 'app-cursos-materias',
  templateUrl: './cursos-materias.component.html',
  styleUrls: ['./cursos-materias.component.css']
})
export class CursosMateriasComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'precio', 'docente', 'activo'];
  CurrentUser :any
  cursos:any
  docente:any
  constructor(private adminService : AdminService, public publicServices: PublicServicesService,public dialog: MatDialog){
    this.CurrentUser= localStorage.getItem("sesion")
    this.CurrentUser=JSON.parse(this.CurrentUser)
  this.getCursos()
  }  

  getCursos(){
    this.adminService.getAllCursos().subscribe((data:any)=>{
      this.cursos = new MatTableDataSource(data);
     
      this.cursos.paginator=this.paginator
      console.log(  this.cursos);
    }
    );
  }


 
  openDialogDocente(LocalCurso:any) {
    const dialogRef = this.dialog.open(ModalColabsComponent, { 
      data: {idCurso: LocalCurso},
      panelClass: 'custom-dialog-container' });
      dialogRef.componentInstance.eventoHijo.subscribe(() => {
        // Llamar al método o proceso en el componente padre
        this. getCursos();
      });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cursos.filter = filterValue.trim().toLowerCase();
  }
}
