import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'heroesApp';

  /*
    aquí no debe aplicarse este checkAuthentication(), ya que primero carga la data y después revisa la 
    sesión, cargando primero info que posiblemente no debería ver el usuario activo
  */
  
  // constructor( private authService: AuthService ) { }
  
  // ngOnInit(): void {
  //   this.authService.checkAuthentication().subscribe( () => {
  //     console.log('checkAuthentication finished');
  //   })
  // }
}
