import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { User } from '../../service/models/User';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit {

  users: User[] = [];

  agregarDialog : boolean = false;
  modificarDialog : boolean = false;

  createUserForm:FormGroup;
  user: User = {id:0,name:'',email:'',password:''};

  constructor(private apiservice:ApiService, private messageService: MessageService, private router: Router){
    this.createUserForm = new FormGroup({
      id:new FormControl(this.user.id, [Validators.required]),
      name:new FormControl(this.user.name, [Validators.required]),
      email:new FormControl(this.user.email, [Validators.required]),
      password:new FormControl(this.user.password, [Validators.required])
    });
  }

  irCars() {
    this.router.navigate([`crud-car`]);
  }

  salir() {
    this.apiservice.logout();
    this.router.navigate([`login`]);
  }

  ngOnInit(): void {
    this.getUsers();
    this.getUser();
  }

  crear(){
    if (this.createUserForm.valid) {
      this.user = this.createUserForm.value;
      console.log(this.user);
      this.createUser(this.user);
      this.agregarDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Se agrego correctamente ',
        detail: `Usuario: ${this.user.name}`,
      });
      this.createUserForm.reset();
    }

  }

  modificar(){
    if (this.createUserForm.valid) {
      this.user = this.createUserForm.value;
      console.log(this.user);
      this.updateUser(this.user);
      this.modificarDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Se modifico correctamente ',
        detail: `Usuario: ${this.user.name}`,
      });
      this.createUserForm.reset();
    }
  }

  agregarUsuario() {
    this.agregarDialog = true;
    console.log('dialog');
  }

  editarUsuario(usuario: User) {
    this.modificarDialog = true;
    this.createUserForm.setValue(usuario);
  }

  eliminarUsuario(usuario: User) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Eliminado correctamente',
      detail: `Usuario: ${usuario.name}`,
    });
  }

  // Obtener todos los usuarios
  getUsers(): void {
    this.apiservice.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // Obtener un usuario
  getUser(): void {
    this.apiservice.getUser(3).subscribe(user => {
      console.log(user);
    });
  }

  // Crear un nuevo usuario
  createUser(user: User): void {
    this.apiservice.createUser(user).subscribe(newUser => {
      this.users.push(newUser);
    });
  }

  // Actualizar un usuario existente
  updateUser(user: User): void {
    this.apiservice.updateUser(user.id, user).subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      this.users[index] = updatedUser;
    });
  }

  // Eliminar un usuario
  deleteUser(id: number): void {
    this.apiservice.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
    this.messageService.add({
      severity: 'warn',
      summary: 'Eliminado correctamente',
      detail: `Usuario id: ${id}`,
    });
  }
}
