import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

import { routes } from './plants.routing';

import { PlantsComponent } from './components/plants/plants.component';
import { PlantContainerComponent } from './components/plant-detail/plant-container.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { UpdatePlantComponent } from './components/update-plant/update-plant.component';
import { FilterPipe } from './pipes/filter.pipe';
import { JobStatusPipe } from './pipes/job-status.pipe';
import { PlantsService } from './services/plants';
import { DetailComponent } from './components/plant-detail/detail/detail.component';
import { ExpensesComponent } from './components/plant-detail/expenses/expenses.component';
import { ExpenseService } from './services/expense';
import { TodoService } from './services/todo';
import { NoteService } from './services/note';
import { TodoComponent } from './components/plant-detail/todo/todo.component';
import { NotesComponent } from './components/plant-detail/notes/notes.component';
import { KanbanComponent } from './containers/kanban/kanban.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { SaleComponent } from './containers/sale/sale.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [
    PlantsComponent,
    AddPlantComponent,
    UpdatePlantComponent,
    PlantContainerComponent,
    FilterPipe,
    JobStatusPipe,
    DetailComponent,
    ExpensesComponent,
    TodoComponent,
    NotesComponent,
    KanbanComponent,
    PlantCardComponent,
    SaleComponent
  ],
  providers: [PlantsService, ExpenseService, TodoService, NoteService],
  exports: []
})
export class PlantsModule {}
