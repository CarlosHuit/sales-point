import { Component, OnInit } from '@angular/core';

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

  items = [
    {
      title: 'Ventas',
      opts: [
        new Option('Registrar venta', 'sales/register' ),
        new Option('Ver ventas',      'sales/consult'  ),
        new Option('Modificar venta', 'sales/update'   ),
      ]
    },
    {
      title: 'Compras',
      opts: [
        new Option('Registrar compra',  'purchases/register' ),
        new Option('Actualizar compra', 'purchases/update'   ),
        new Option('Revisar Ingresos',  'purchases/ckeck'    ),
      ]
    },
    {
      title: 'Devoluciones',
      opts: [
        new Option('Registrar devolución',  'devolutions/register' ),
        new Option('Modificar devolución',  'devolutions/update'   ),
        new Option('Revisar devoluciónes',  'devolutions/check'    ),
      ]
    },
    {
      title: 'Productos',
      opts: [
        new Option('Registrar producto',  'product/register' ),
        new Option('Modificar producto',  'product/update'   ),
        new Option('Revisar producto',    'product/check'    ),
        new Option('Buscar producto',     'product/search'    ),
      ]
    },
    {
      title: 'Clientes',
      opts: [
        new Option('Registrar cliente',  'client/register' ),
        new Option('Modificar cliente',  'client/update'   ),
      ]
    },
    {
      title: 'Proveedores',
      opts: [
        new Option('Registrar proveedor',    'providers/register' ),
        new Option('Modificar proveedores',  'providers/update'   ),
      ]
    },
    {
      title: 'Existencias',
      opts: [
        new Option('Consultar existencias',  'inventory/existences' ),
        new Option('Inventario general',     'inventory/to-require' ),
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  redirectTo = (url: string) => {
    console.log(url);
  }

}
