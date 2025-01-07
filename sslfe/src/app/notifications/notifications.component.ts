import { Component } from '@angular/core';
import { Invitation } from '../invitation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ListService } from '../list.service';
import { Lista } from '../lista';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  invitations: Invitation[] = [];
  userPanelOpen: boolean = false;
  listas: Lista[] = [];// Para almacenar la lista recibida


  constructor( private router: Router,private userService: UserService,private listService: ListService) {}
  toggleUserPanel() {
    this.userPanelOpen = !this.userPanelOpen;
  }

  ngOnInit() {
    this.obtenerInvitaciones();
  }
  obtenerInvitaciones() {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Obtener el email del usuario a través del token
      this.userService.obtenerUsuarioPorToken(token).subscribe(
        (response) => {
          const email = response.email;
          console.log('Email:', email);
  
          if (email) {
            // Llama al servicio para obtener las invitaciones
            this.listService.obtenerInvitaciones(email).subscribe(
              (data) => {
                console.log('Datos recibidos:', data);
                
                // Verificar si 'data' y sus propiedades existen
                if (data && data.invitaciones) {
                  this.invitations = data.invitaciones;
                } else {
                  this.invitations = []; // Si no hay invitaciones, asegurarse de que la lista esté vacía
                }
                console.log('Invitaciones:', this.invitations);
                
                // Verificar si 'data.listas' existe
                if (data && data.listas) {
                  this.listas = data.listas;
                } else {
                  this.listas = []; // Si no hay listas, asegurarse de que la lista esté vacía
                }
                console.log('Listas:', this.listas);
              },
              (error) => {
                console.error('Error al obtener las invitaciones:', error);
              }
            );
          } else {
            console.error('Email no encontrado en la respuesta del token');
          }
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }
  
  
  acceptInvitation(token: string) {
    
    this.listService.aceptarInvitacion(token).subscribe(
      (response) => {
        console.log('Respuesta de aceptar invitación:', response);

        this.invitations = this.invitations.filter(inv => inv.token !== token);
        console.log('Invitación aceptada y eliminada de la vista.');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al aceptar la invitación:', error);
        
      }
    );
  }

  rejectInvitation(token: string) {
    this.listService.rechazarInvitacion(token).subscribe(
      (response) => {
        console.log('Respuesta de rechazar invitación:', response);
        this.invitations = this.invitations.filter(inv => inv.token !== token);
        console.log('Invitación rechazada y eliminada de la vista.');
      },
      (error) => {
        console.error('Error al rechazar la invitación:', error);
      }
    );
  }

  irListas(){
    this.router.navigate(['/home']);
  }
  
  irNotificaciones() {
    this.router.navigate(['/notifications']);
  }

  irMiPlan() {
    this.router.navigate(['/payment']);
    // Redirigir a la página del plan o mostrar el plan actual
  }

  cerrarSesion() {
    localStorage.removeItem('token'); // O cualquier lógica para cerrar sesión
    // Redirigir a la página de inicio o login
    this.router.navigate(['/login']);
  }
}
