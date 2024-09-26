import { Component } from '@angular/core';
import { Lista } from '../lista';
import { Producto } from '../producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService } from '../list.service';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listas: Lista[] = [];
  listaSeleccionada: Lista | null = null;
  listaEditando: Lista | null = null;
  creandoNuevaLista: boolean = false;
  nombreNuevaLista: string = '';
  descripcionNuevaLista: string = '';
  nuevoProducto: Producto = new Producto('', 1);
  mostrarProductos: boolean = false;

  constructor(private listService: ListService, private router: Router) {}

  cargarLista(lista: Lista) {
    this.listaSeleccionada = lista;
    this.mostrarProductos = false; // Oculta la sección de productos al cargar una lista
  }

  crearNuevaLista() {
    this.creandoNuevaLista = true;
    this.listaSeleccionada = null; // Deselect the current list
    this.listaEditando = null; // Stop editing any list
    this.mostrarProductos = false; // Oculta la sección de productos al iniciar la creación de una nueva lista
  
  }

  guardarNuevaLista() {
    if (this.nombreNuevaLista.trim() && this.descripcionNuevaLista.trim()) {
      const nuevaLista = new Lista(
        this.listas.length + 1,
        this.nombreNuevaLista,
        this.descripcionNuevaLista,
        [],
        []
      );
      this.listas.push(nuevaLista);
      this.creandoNuevaLista = false;
      this.nombreNuevaLista = '';
      this.descripcionNuevaLista = '';

      this.listService.guardarLista(nuevaLista).subscribe(
        (response) => {
          console.log('Lista guardada con éxito:', response);
        },
        (error) => {
          console.error('Error al guardar la lista:', error);
        }
      );
    }
  }

  editarLista(lista: Lista) {
    if (this.listaEditando !== lista) {
      this.listaEditando = lista;
    } else {
      this.listaEditando = null;
    }
  }

  dejarDeEditarLista() {
    this.listaEditando = null;
  }

  eliminarLista(lista: Lista) {
    this.listas = this.listas.filter(l => l !== lista);
    if (this.listaSeleccionada === lista) {
      this.listaSeleccionada = null;
      this.mostrarProductos = false;
    }
  }

  mostrarSeccionProductos(lista: Lista) {
    this.listaSeleccionada = lista;
    this.mostrarProductos = true;
  }

  agregarProducto() {
    if (this.listaSeleccionada && this.nuevoProducto.nombre.trim()) {
      this.listaSeleccionada.productos.push(new Producto(this.nuevoProducto.nombre, this.nuevoProducto.cantidad));
      this.nuevoProducto = new Producto('', 1);
    }
  }

  editarProducto(producto: Producto) {
    // Lógica para editar el producto
  }

  eliminarProducto(producto: Producto) {
    if (this.listaSeleccionada) {
      this.listaSeleccionada.productos = this.listaSeleccionada.productos.filter(p => p !== producto);
    }
  }

  agregarMiembro(lista: Lista) {
    // Lógica para agregar un miembro a la lista
  }
}
