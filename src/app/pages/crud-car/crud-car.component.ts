import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';
import { Car } from '../../service/models/Car';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-car',
  templateUrl: './crud-car.component.html',
  styleUrls: ['./crud-car.component.css']
})
export class CrudCarComponent implements OnInit{

  datos: Car[] = [];

  agregarDialog : boolean = false;
  modificarDialog : boolean = false;

  createCarForm:FormGroup;
  car: Car = {id:0,marca:'',modelo:'',users_id:0};

  constructor(private apiservice:ApiService, private messageService: MessageService, private router: Router){
    this.createCarForm = new FormGroup({
      id:new FormControl(this.car.id, [Validators.required]),
      marca:new FormControl(this.car.marca, [Validators.required]),
      modelo:new FormControl(this.car.modelo, [Validators.required]),
      users_id:new FormControl(this.car.users_id, [Validators.required])
    });
   }

  ngOnInit(): void {
    this.apiservice.getCars().subscribe((resultados) => {
      this.datos = resultados;
      console.log(this.datos); // Muestra los datos obtenidos en la consola
    });
    console.log(this.apiservice.getToken());

  }

  irUSer() {
    this.router.navigate([`crud-user`]);
  }

  salir() {
    this.apiservice.logout();
    this.router.navigate([`login`]);
  }

  agregarCar() {
    this.agregarDialog = true;
    console.log('dialog');
  }

  editarCar(car: Car) {
    this.modificarDialog = true;
    this.createCarForm.setValue(car);
    this.messageService.add({
      severity: 'success',
      summary: 'Se guardo correctamente ',
      detail: `Marca: ${car.marca}`
    });
  }

  crear(){
    if (this.createCarForm.valid) {
      this.car = this.createCarForm.value;
      console.log(this.car);
      this.createCar(this.car);
      this.agregarDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Se agrego correctamente ',
        detail: `Car: ${this.car.id}`,
      });
      this.createCarForm.reset();
    }

  }

  modificar(){
    if (this.createCarForm.valid) {
      this.car = this.createCarForm.value;
      console.log(this.car);
      this.updateCar(this.car);
      this.modificarDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Se modifico correctamente ',
        detail: `Car: ${this.car.id}`,
      });
      this.createCarForm.reset();
    }
  }

  // Crear un nuevo usuario
  createCar(car: Car): void {
    this.apiservice.createCar(car).subscribe(newCar => {
      this.datos.push(newCar);
    });
  }

  // Actualizar un usuario existente
  updateCar(car: Car): void {
    this.apiservice.updateCar(car.id, car).subscribe(updatedCar => {
      const index = this.datos.findIndex(u => u.id === updatedCar.id);
      this.datos[index] = updatedCar;
    });
  }

  // Eliminar un usuario
  deleteCar(id: number): void {
    this.apiservice.deleteCar(id).subscribe(() => {
      this.datos = this.datos.filter(u => u.id !== id);
    });
    this.messageService.add({
      severity: 'warn',
      summary: 'Eliminado correctamente',
      detail: `Car id: ${id}`,
    });
  }
}
