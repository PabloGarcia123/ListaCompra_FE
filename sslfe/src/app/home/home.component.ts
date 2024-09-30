import { Component, OnInit } from '@angular/core';
import { Lista } from '../lista';
import { Producto } from '../producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService } from '../list.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listas: Lista[] = [];
  listaSeleccionada: Lista | null = null;
  listaEditando: Lista | null = null;
  productoSeleccionado: Producto | null = null; // Producto en edición
  creandoNuevaLista: boolean = false;
  nombreNuevaLista: string = '';
  descripcionNuevaLista: string = '';
  nuevoProducto: Producto = new Producto(0, '', 1, new Lista(0, '', '', [], [], '')); // Asocia la lista correctamente
  mostrarProductos: boolean = false;
  token: string = localStorage.getItem('token') || '';

  constructor(private listService: ListService, private userService: UserService) { }

  ngOnInit() {
    this.obtenerListasUsuario();  // Cargar las listas del usuario al iniciar
  }

  obtenerListasUsuario() {
    this.listService.obtenerListas().subscribe(
      (listas) => {
        this.listas = listas;
      },
      (error) => {
        console.error('Error al obtener las listas:', error);
      }
    );
  }

  cargarLista(lista: Lista) {
    this.listaSeleccionada = lista;
    this.mostrarProductos = false; // Ocultar productos hasta que se seleccione
  }

  crearNuevaLista() {
    this.creandoNuevaLista = true;
    this.listaSeleccionada = null; // Deseleccionar la lista actual
    this.listaEditando = null; // Detener la edición
    this.mostrarProductos = false; // Ocultar productos
  }

  guardarNuevaLista() {
    if (this.nombreNuevaLista.trim() && this.descripcionNuevaLista.trim()) {
      // Primero obtener el propietario (usuario autenticado)
      this.listService.obtenerPropietarioLista(this.token).subscribe(
        (propietario) => {
          // Crear una nueva lista con datos del propietario
          const nuevaLista = new Lista(
            0,  // El id será generado por la base de datos
            this.nombreNuevaLista,
            this.descripcionNuevaLista,
            [],  // Productos vacíos
            [],  // Miembros vacíos
            propietario.email  // Propietario autenticado
          );

          // Guardar la lista en la base de datos
          this.listService.guardarLista(nuevaLista).subscribe(
            (response) => {
              console.log('Lista guardada con éxito:', response);
              // Agregar la lista con el ID generado por la base de datos
              this.listas.push(response);

              // Resetear campos del formulario
              this.creandoNuevaLista = false;
              this.nombreNuevaLista = '';
              this.descripcionNuevaLista = '';
            },
            (error) => {
              console.error('Error al guardar la lista:', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener el propietario de la lista:', error);
        }
      );
    }
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
      // Si no se está editando, activar el modo de edición
      this.listaEditando = lista;
      this.mostrarProductos = false;  // Ocultar la sección de productos mientras se edita la lista
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
      this.listas = this.listas.filter(l => l !== lista);

      if (this.listaSeleccionada === lista) {
        this.listaSeleccionada = null;
        this.mostrarProductos = false;
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
  }

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
  }

  agregarProducto() {
    if (this.listaSeleccionada) {
      // Inicializar productos si es necesario
      if (!this.listaSeleccionada.productos) {
        this.listaSeleccionada.productos = [];
      }
      this.nuevoProducto.lista = this.listaSeleccionada;

      this.listService.guardarProducto(this.nuevoProducto, this.listaSeleccionada).subscribe(
        (response) => {
          // Actualiza los productos de la lista seleccionada localmente
          if (this.listaSeleccionada && this.listaSeleccionada.productos) {
            console.log('Producto guardado con éxito:', response.message);
            this.listaSeleccionada.productos.push(response.producto);
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

  agregarMiembro(lista: Lista) {
    // Lógica para agregar un miembro a la lista
  }
}
