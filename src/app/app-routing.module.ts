import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  { path: "signup", loadChildren: "./signup/signup.module#SignupPageModule" },
  { path: "new-look/:id",
    resolve: {
      image: DataResolverService
    },
    loadChildren: "./new-look/new-look.module#NewLookPageModule"
  },
  { path: 'view-look/:id',
    resolve: {
      look: DataResolverService
    },
    loadChildren: './view-look/view-look.module#ViewLookPageModule'
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
