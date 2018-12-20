import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

const products = {
  '_id':          '5c1c126ce505486169ed99e5',
  'registerBy':   '5c121201d2ce3b77ee662604',
  'barcode':      '13245-verde',
  'sku':          '13245-verde',
  'description':  'MARCADOR PERMANENTE VERDE CASTELL',
  'price':        '5c1c126ce505486169ed99e6',
};

const prices = {
  '_id':        '5c1c126ce505486169ed99e6',
  'changedBy':  '5c121201d2ce3b77ee662604',
  'product':    '5c1c126ce505486169ed99e5',
  'date':       '2018-12-20T22:06:36.128Z',
  'costPrice':  1.25,
  'salesPrice': 3,
};

const orders = {
  '_id':        '5c1c12d3e505486169ed99ed',
  'billedBy':   '5c121201d2ce3b77ee662604',
  'client':     '5c1c12bbe505486169ed99ec',
  'dateBilled': '2018-12-20T22:08:19.433Z',
  'total':      300,
  'received':   300,
  'articles': [
    {
      '_id':        '5c1c12d3e505486169ed99ee',
      'product':    '5c1c126ce505486169ed99e5',
      'quantity':   100,
      'date':       '2018-12-20T22:08:14.311Z',
      'priceSale':  3
    }
  ],
};

const existences = {
  '_id':          '5c1c126ce505486169ed99e9',
  'product':      '5c1c126ce505486169ed99e5',
  'existences':   -100,
  'transactions': [
    {
      '_id':              '5c1c12d3e505486169ed99ef',
      'order':            '5c1c12d3e505486169ed99ed',
      'quantity':         100,
      'typeTransaction':  'SAVEN'
    }
  ],
};

