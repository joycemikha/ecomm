import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MyTranslateService } from '../../../shared/services/myTranslate/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogIn : boolean = false;
  constructor(private _MyTranslateService:MyTranslateService ,  private _Router:Router ,private _AuthService:AuthService ){}
  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(  this._AuthService.userData.getValue() == null )
      {
        this.isLogIn = false
      }
      else
      {
        this.isLogIn = true
      }
    })
  }
  logout()
  {
    localStorage.removeItem("userToken");
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login'])
  }

  changeLang(lang:string)
  {
    this._MyTranslateService.changeLang(lang)
  }

}
