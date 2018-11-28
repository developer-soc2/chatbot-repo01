import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AdminUiModule } from '@ngx-fire/admin-ui'
import { ToastyModule } from 'ng2-toasty'

import { CoreModule } from './core.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ToastyModule.forRoot(),
    AdminUiModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
