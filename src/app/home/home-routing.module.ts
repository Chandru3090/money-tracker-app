
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { UpdateTransactionComponent } from './components/update-transaction/update-transaction.component';

export const TransactionsComponents = [
  HomePage,
  NewTransactionComponent,
  UpdateTransactionComponent
];

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'new',
        component: NewTransactionComponent,
      },
      {
        path: 'update/:id',
        component: UpdateTransactionComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
