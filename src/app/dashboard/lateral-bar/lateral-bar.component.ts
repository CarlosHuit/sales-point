import { Component, OnInit } from '@angular/core';

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
        {
          title: 'Registrar venta',
        },
        {
          title: 'Ver ventas',
        },
        {
          title: 'Modificar venta'
        }
      ]
    },
    {
      title: 'Compras',
      opts: [
        {
          title: 'Registrar compra',
        },
        {
          title: 'Ingresar mercadería',
        },
        {
          title: 'Revisar Ingresos'
        }
      ]
    },
    {
      title: 'Devoluciones',
      opts: [
        {
          title: 'Registrar devolución',
        },
        {
          title: 'Modificar devolución'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
