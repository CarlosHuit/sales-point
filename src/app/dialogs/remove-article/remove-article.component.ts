import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../../classes/product';


@Component({
  selector: 'app-remove-article',
  templateUrl: './remove-article.component.html',
  styleUrls: ['./remove-article.component.css']
})

export class RemoveArticleComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public  dialogRef: MatDialogRef<RemoveArticleComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

