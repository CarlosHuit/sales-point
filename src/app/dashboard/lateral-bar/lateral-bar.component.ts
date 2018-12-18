import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material';

class Option {
  constructor(
    public title: string,
    public url:   string,
  ) {}
}

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.css']
})
export class LateralBarComponent implements OnInit {

  @Output() evsLateralBar = new EventEmitter<boolean>();
  @Input() mobile: boolean;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  multi: boolean;

  items = [
    {
      title:   'Ventas',
      keyword: 'sales',
      opts: [
        new Option('Registrar venta', 'sales/register' ),
        new Option('Ver ventas',      'sales/orders'  ),
        new Option('Modificar venta', 'sales/update'   ),
      ]
    },
    {
      title: 'Compras',
      keyword: 'purchases',
      opts: [
        new Option('Registrar compra',  'purchases/register' ),
        new Option('Actualizar compra', 'purchases/update'   ),
        new Option('Revisar Ingresos',  'purchases/ckeck'    ),
      ]
    },
    {
      title: 'Devoluciones',
      keyword: 'devolutions',
      opts: [
        new Option('Registrar devolución',  'devolutions/register' ),
        new Option('Modificar devolución',  'devolutions/update'   ),
        new Option('Revisar devoluciónes',  'devolutions/check'    ),
      ]
    },
    {
      title: 'Productos',
      keyword: 'products',
      opts: [
        new Option('Registrar producto',  'products/register'     ),
        new Option('Modificar producto',  'products/update'       ),
        new Option('Buscar producto',     'products/search'       ),
        new Option('Actualizar precio',   'products/update-price' ),
      ]
    },
    {
      title: 'Clientes',
      keyword: 'clients',
      opts: [
        new Option('Registrar cliente',  'clients/register' ),
        new Option('Modificar cliente',  'clients/update'   ),
      ]
    },
    {
      title: 'Proveedores',
      keyword: 'providers',
      opts: [
        new Option('Registrar proveedor',    'providers/register' ),
        new Option('Modificar proveedores',  'providers/update'   ),
      ]
    },
    {
      title: 'Existencias',
      keyword: 'inventory',
      opts: [
        new Option('Consultar existencias',  'inventory/existences' ),
        new Option('Inventario general',     'inventory/to-require' ),
      ]
    },
  ];

  constructor(
    public _router: Router,
    ) { }

  ngOnInit() { }

  redirectTo = (url: string) => {

    if (this.mobile) {
      this.closeAllExpansion();
    }

    this.evsLateralBar.emit(true);
    this._router.navigateByUrl(url);
  }

  isCurrentUrl = (url: string) => {
    if (this._router.url === `/${url}`) {
      return true;
    }
    return false;
  }

  isActiveUrl = (keyword: string) => {
    if ( this._router.url.includes(keyword) ) {
      return true;
    }

    return false;
  }

  closeAllExpansion = () => {
    this.multi = true;
    setTimeout(() => (this.accordion.closeAll(), this.multi = false), 0);
  }

}
