import { Component, OnInit } from '@angular/core';
import { Lista } from '../lista';
import { Producto } from '../producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService } from '../list.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Miembro } from '../user';
import { forkJoin } from 'rxjs';
import { Invitation } from '../invitation';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listasMiembro: Lista[] = [];
  listasPropietario: Lista[] = [];
  listaSeleccionada: Lista | null = null;
  listaEditando: Lista | null = null;
  productoSeleccionado: Producto | null = null; // Producto en edición
  creandoNuevaLista: boolean = false;
  nombreNuevaLista: string = '';
  descripcionNuevaLista: string = '';
  nuevoProducto: Producto = new Producto(0, '', 1, new Lista(0, '', '', [], [], [], '')); // Asocia la lista correctamente
  mostrarProductos: boolean = false;
  mostrarMiembros: boolean = false;
  miembros: Miembro[] = [];
  token: string = localStorage.getItem('token') || '';
  userPanelOpen: boolean = false;
  emailInvitacion: string = '';

  constructor(private listService: ListService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.obtenerListasPropietarioUsuario()
    this.obtenerListasMiembroUsuario()

  }

  toggleUserPanel() {
    this.userPanelOpen = !this.userPanelOpen;
  }

  obtenerListasPropietarioUsuario() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.obtenerUsuarioPorToken(token).subscribe(
        (response) => {
          const email = response.email;
          console.log('Email:', email);

          if (email) {
            // Obtener listas donde el usuario es propietario
            this.listService.obtenerListasPropietarioPorUsuario(email).subscribe(
              (listasPropietario) => {
                this.listasPropietario = listasPropietario;
                console.log('Listas como propietario:', this.listasPropietario);
              },
              (error) => {
                console.error('Error al obtener las listas como propietario:', error);
              }
            );
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

  obtenerListasMiembroUsuario() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.obtenerUsuarioPorToken(token).subscribe(
        (response) => {
          const email = response.email;
          console.log('Email:', email);

          if (email) {

            // Obtener listas donde el usuario es miembro
            this.listService.obtenerListasMiembroPorUsuario(email).subscribe(
              (listasMiembro) => {

                this.listasMiembro = listasMiembro;
                console.log('Listas como miembro:', this.listasMiembro);
              },
              (error) => {
                console.error('Error al obtener las listas como miembro:', error);
              }
            );
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

  cargarLista(lista: Lista) {
    this.listaSeleccionada = lista;
    this.mostrarProductos = false;
    this.mostrarMiembros = false;
  }

  crearNuevaLista() {
    this.creandoNuevaLista = true;
    this.listaSeleccionada = null; // Deseleccionar la lista actual
    this.listaEditando = null; // Detener la edición
    this.mostrarProductos = false; // Ocultar productos
    this.mostrarMiembros = false;
  }

  guardarNuevaLista() {
    // Verificar que el nombre y la descripción no estén vacíos
    if (this.nombreNuevaLista.trim() && this.descripcionNuevaLista.trim()) {
      const token = localStorage.getItem('token');

      if (token) {
        // Obtener el usuario a partir del token
        this.userService.obtenerUsuarioPorToken(token).subscribe(
          (user) => {
            const email = user.email;
            console.log('Email:', email);

            // Verificar si el usuario es no premium
            if (user.premium === false) {
              this.listService.obtenerListasPropietarioPorUsuario(email).subscribe(
                (listasPropietario) => {
                  if (listasPropietario.length >= 2) {
                    window.alert('No puedes crear más de 2 listas con una cuenta gratuita');
                    return;  // Detener ejecución si ha alcanzado el límite
                  }

                  // Si no ha alcanzado el límite, proceder a crear la lista
                  this.crearLista(email);
                },
                (error) => {
                  console.error('Error al obtener las listas del propietario:', error);
                }
              );
            } else {
              // Si el usuario es premium, permitir la creación directamente
              this.crearLista(email);
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
  }

  // Método separado para crear la lista
  crearLista(email: string) {
    const nuevaLista = new Lista(0, this.nombreNuevaLista, this.descripcionNuevaLista, [], [], [], email);

    // Guardar lista en el backend
    this.listService.guardarLista(nuevaLista).subscribe(
      (response) => {
        console.log('Lista guardada con éxito:', response);
        // Verifica que 'response.lista' contenga la lista
        if (response) {
          this.listasPropietario.push(response);
          console.log('Listas del propietario actualizadas:', this.listasPropietario);
          this.creandoNuevaLista = false;
          this.nombreNuevaLista = '';
          this.descripcionNuevaLista = '';
        } else {
          console.error('No se recibió la lista en la respuesta:', response);
        }
      },
      (error) => {
        console.error('Error al guardar la lista:', error);
      }
    );
  }



  editarLista(lista: Lista) {
    // Si ya se está editando esta lista, guarda los cambios
    if (this.listaEditando === lista) {
      // Guardar los cambios en la lista
      this.listService.guardarLista(lista).subscribe(
        (response) => {
          console.log('Lista guardada con éxito:', response);
          this.listaEditando = null;  // Salir del modo de edición
        },
        (error) => {
          console.error('Error al guardar la lista:', error);
        }
      );
    } else {
      this.listaEditando = lista;
      this.mostrarProductos = false;
      this.mostrarMiembros = false;
    }
  }

  dejarDeEditarLista() {
    this.listaEditando = null;
  }

  eliminarLista(lista: Lista) {
    // Mostrar un mensaje de confirmación antes de eliminar la lista
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la lista "${lista.nombre}"?`);

    if (confirmacion) {
      // Si el usuario confirma, proceder con la eliminación
      this.listasPropietario = this.listasPropietario.filter(l => l !== lista);

      if (this.listaSeleccionada === lista) {
        this.listaSeleccionada = null;
        this.mostrarProductos = false;
        this.mostrarMiembros = false;
      }

      this.listService.eliminarLista(lista).subscribe(
        (response) => {
          console.log('Lista eliminada con éxito:', response);
        },
        (error) => {
          console.error('Error al eliminar la lista:', error);
        }
      );
    } else {
      // Si el usuario cancela, no se hace nada
      console.log('Eliminación de lista cancelada');
    }
  }

  mostrarSeccionProductos(lista: Lista) {
    this.listaSeleccionada = lista;
    this.mostrarProductos = true;
    this.productoSeleccionado = null;
    this.listaEditando = null;
    this.mostrarMiembros = false;
  }

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
  }

  agregarProducto() {
    const token = localStorage.getItem('token');

    if (token) {
      // Obtener el usuario a partir del token
      this.userService.obtenerUsuarioPorToken(token).subscribe(
        (user) => {
          const email = user.email;
          console.log('Email:', email);

          // Verificar si el usuario es no premium
          if (user.premium === false) {
            this.listService.obtenerListasPropietarioPorUsuario(email).subscribe(
              (listasPropietario) => {
                // Buscar la lista seleccionada entre las listas del propietario
                const listaPropietarioSeleccionada = listasPropietario.find((lista: Lista) => lista.id === this.listaSeleccionada?.id);
                console.log('Lista propietario seleccionada:', listaPropietarioSeleccionada);
                if (listaPropietarioSeleccionada && listaPropietarioSeleccionada.productos.length >= 10) {
                  window.alert('No puedes añadir más de 10 productos con una cuenta gratuita');
                  return; // Detener ejecución si ha alcanzado el límite
                }

                // Si no ha alcanzado el límite, proceder a agregar el producto
                this.guardarProductoEnLista();
              },
              (error) => {
                console.error('Error al obtener las listas del propietario:', error);
              }
            );
          } else {
            // Si el usuario es premium, permitir añadir el producto sin restricción
            this.guardarProductoEnLista();
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

  guardarProductoEnLista() {
    if (this.listaSeleccionada) {
      // Inicializar productos si es necesario
      if (!this.listaSeleccionada.productos) {
        this.listaSeleccionada.productos = [];
      }

      this.nuevoProducto.lista = this.listaSeleccionada;

      // Guardar el producto en el backend
      this.listService.guardarProducto(this.nuevoProducto, this.listaSeleccionada).subscribe(
        (response) => {
          if (response.producto) {
            console.log('Producto guardado con éxito:', response.message);
            this.listaSeleccionada?.productos.push(response.producto);
            // Resetear campos de nuevoProducto
            this.nuevoProducto.nombre = '';
            this.nuevoProducto.cantidad = 1;
          }
        },
        (error) => {
          console.error('Error al guardar el producto:', error);
        }
      );
    } else {
      console.error('No hay ninguna lista seleccionada.');
    }
  }

  modificarProducto(producto: Producto) {
    if (this.listaSeleccionada) {  // Asegúrate de que hay una lista seleccionada
      this.listService.modificarProducto(producto, this.listaSeleccionada).subscribe(
        (response) => {
          console.log('Producto modificado con éxito:', response);
          this.productoSeleccionado = null;  // Deseleccionar después de la modificación
        },
        (error) => {
          console.error('Error al modificar el producto:', error);
        }
      );
    } else {
      console.error('No hay lista seleccionada');
    }
  }

  eliminarProducto(producto: Producto) {
    if (this.listaSeleccionada) {
      this.listService.eliminarProducto(producto, this.listaSeleccionada).subscribe(
        (response) => {
          if (this.listaSeleccionada && this.listaSeleccionada.productos) {
            this.listaSeleccionada.productos = this.listaSeleccionada.productos.filter(p => p !== producto);
          }
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }

  mostrarSeccionMiembros(lista: Lista) {
    this.listaSeleccionada = lista;
    this.listaEditando = null;
    this.mostrarMiembros = true;
    this.mostrarProductos = false;
    this.miembros = lista.miembros || [];

  }


  generarInvitacion() {
    if (!this.listaSeleccionada || !this.emailInvitacion) {
      console.error('No hay lista seleccionada o email de invitación.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }
  
    // Verificar si el email al que se quiere invitar existe
    this.userService.validarEmail(this.emailInvitacion).subscribe(
      (emailValido) => {
        if (!emailValido) {
          window.alert('El usuario con este email no existe en la aplicación.');
          return;
        }
  
        // Si el email es válido, proceder con la lógica de invitación
        this.userService.obtenerUsuarioPorToken(token).subscribe(
          (user) => {
            console.log('Email del usuario:', user.email);
  
            if (!this.listaSeleccionada?.id) {
              console.error('La lista seleccionada no tiene un ID válido.');
              return;
            }
  
            if (!user.premium) {
              this.validarInvitacion(user.email, this.listaSeleccionada.id);
            } else {
              this.enviarInvitacion();
            }
          },
          (error) => console.error('Error al obtener el usuario:', error)
        );
      },
      (error) => console.error('Error al validar el email:', error)
    );
  }
  
  private validarInvitacion(email: string, lista_id: number) {
    this.listService.obtenerInvitacion(lista_id).subscribe(
      (data) => {
        console.log('Listas recibidas:', data.listas[0]?.id );
        console.log('ID de la lista seleccionada:', this.listaSeleccionada?.id);
  
        const invitacionExistente = data.listas.some(
          (lista: any) => data.listas[0]?.id === this.listaSeleccionada?.id
        );
  
        if (invitacionExistente) {
          window.alert('No puedes invitar a más de 1 persona para la misma lista con una cuenta gratuita.');
        } else {
          this.enviarInvitacion();
        }
      },
      (error) => console.error('Error al obtener las invitaciones:', error)
    );
  }
  
  private enviarInvitacion() {
    if (!this.listaSeleccionada) {
      console.error('No hay lista seleccionada.');
      return;
    }
    this.listService.generarEnlaceInvitacion(this.listaSeleccionada, this.emailInvitacion).subscribe(
      (response) => {
        console.log('Invitación enviada con éxito:', response);
        alert('Enlace de invitación enviado.');
      },
      (error) => {
        const mensajeError = error.error?.error || 'Error desconocido.';
        if (error.status === 403 || error.status === 409) {
          window.alert(mensajeError);
        } else {
          console.error('Error al enviar la invitación:', error);
        }
      }
    );
  }

  eliminarMiembro(miembro: Miembro) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al miembro "${miembro.email}"?`);

    if (confirmacion) {
      if (this.listaSeleccionada) {
        this.listService.eliminarMiembro(this.listaSeleccionada, miembro).subscribe(
          (response) => {
            if (this.listaSeleccionada && this.listaSeleccionada.miembros) {
              this.listaSeleccionada.miembros = this.listaSeleccionada.miembros.filter(m => m !== miembro);
            }
          },
          (error) => {
            console.error('Error al eliminar el miembro:', error);
          }
        );
      }
    }
  }

  dejarDeSerMiembro(lista: Lista) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas dejar de ser miembro de la lista "${lista.nombre}"?`);

    if (confirmacion) {
      const token = localStorage.getItem('token');

      if (token) {
        this.userService.obtenerUsuarioPorToken(token).subscribe(
          (response) => {
            const email = response.email;
            console.log('Email:', email);

            if (email) {
              this.listService.dejarDeSerMiembro(lista.id, email).subscribe(
                (response) => {
                  if (this.listasMiembro) {
                    this.listasMiembro = this.listasMiembro.filter(l => l !== lista);
                  }
                },
                (error) => {
                  console.error('Error al dejar de ser miembro:', error);
                }
              );

            }
          }
        );
      }
    }
  }

  irListas() {
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
