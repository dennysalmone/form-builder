import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from 'src/app/modules/site-form/form-page/form-page.component';
import { SiteLayoutComponent } from 'src/app/modules/site-form/site-layout/site-layout.component';
import { ResolverService } from 'src/app/shared/services/resolver.service';

const routes: Routes = [
  {
      path: "", component: SiteLayoutComponent, 
      resolve: {userName: ResolverService},
      children: [
          { path: "main", component: FormPageComponent },
          { path: "", redirectTo: "main", pathMatch: 'full' },
          { path: '**', redirectTo: 'main' }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormSiteRoutingModule {
}