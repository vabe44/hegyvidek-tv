import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  belepes(credentials) {
    this.authService.login(credentials)
    .subscribe(result => {
      if (result) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/admin']);
      } else {
        alert('Hibás felhasználói név és/vagy jelszó.');
      }
    });
  }

}
