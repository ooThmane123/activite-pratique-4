import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!:FormGroup;
  errorMessage:string="";

  constructor(private fb:FormBuilder,private router : Router,private authService:AuthService) {
  }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control(""),
    })
  }

  handleLogin() {
    /*console.log(this.formLogin.value)
    if(this.formLogin.value.username=="admin" && this.formLogin.value.password=="1234")
      this.router.navigateByUrl("/admin");*/
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    // il ya deux fçons pour faire la programation asyncrone dans Js :  soit vous utilisez les promesses ou bien les observaible
    // j'ai utiliser then car il return des promesses et non pas des observiable(subscribe)
    this.authService.login(username,password).then(resp=>{
      this.router.navigateByUrl("/admin");
    }).catch(error=>{
      this.errorMessage=error; // Bad credentials
    })
  }
}
