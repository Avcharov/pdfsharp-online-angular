import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerPageComponent } from './pages/explorer-page/explorer-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ExplorerRoutingModule } from './explorer.routing.module';
import { ExplorerProjectsComponent } from './components/explorer-projects/explorer-projects.component';
import { ExplorerSidebarComponent } from './components/explorer-sidebar/explorer-sidebar.component';
import { StoreModule } from '@ngrx/store';
import { AUTH_ACTION_KEY } from 'src/app/core/store/auth.store';
import { EXPLORER_ACTION_KEY } from './store/explorer.store';
import { explorerReducer } from './store/explorer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExplorerEffects } from './store/explorer.effects';
import { ProjectService } from './services/project.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    SharedModule,
    FormsModule,
    ExplorerRoutingModule,
    StoreModule.forFeature(EXPLORER_ACTION_KEY, explorerReducer),
    EffectsModule.forFeature([ExplorerEffects]),
  ],
  declarations: [ExplorerPageComponent, ExplorerProjectsComponent, ExplorerSidebarComponent],
  providers: [
    ProjectService
  ]
})
export class ExplorerModule { }
