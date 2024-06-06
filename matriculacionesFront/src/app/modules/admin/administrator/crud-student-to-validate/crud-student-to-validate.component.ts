import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { PublicServicesService } from 'src/app/services/public-services.service';
import { ModalValidateStudentComponent } from '../components/modal-validate-student/modal-validate-student.component';
import { ModalDocumentsComponent } from '../components/modal-documents/modal-documents.component';

@Component({
  selector: 'app-crud-student-to-validate',
  templateUrl: './crud-student-to-validate.component.html',
  styleUrls: ['./crud-student-to-validate.component.css']
})
export class CrudStudentToValidateComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'ape', 'whatsapp', 'usser','documentos','accion'];
  newstudents:any
  CurrentUser :any
  constructor(private adminService : AdminService, public publicServices: PublicServicesService,public dialog: MatDialog){
    this.CurrentUser= localStorage.getItem("sesion")
    this.CurrentUser=JSON.parse(this.CurrentUser)
    this.getStudentByRepreToMatricula()
  }  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.newstudents.filter = filterValue.trim().toLowerCase();
  }


  getStudentByRepreToMatricula(){
    this.adminService.getStudentToValidate().subscribe((data:any)=>{
      this.newstudents=new MatTableDataSource(data);
      console.log(  this.newstudents);
    }
    );
  }


  OpenModalDocuments(student:any){
    const dialogRef = this.dialog.open(ModalDocumentsComponent, { 
      data: {student: student},
      panelClass: 'custom-dialog-container' });
   
  }

  openModalValidateStudent(idStudent:any){
    const dialogRef = this.dialog.open(ModalValidateStudentComponent, { 
      data: {idStudent: idStudent},
      panelClass: 'custom-dialog-container' });
      dialogRef.componentInstance.eventoHijo.subscribe(() => {
        // Llamar al método o proceso en el componente padre
        this.getStudentByRepreToMatricula();
      });
  }


}
