import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth : AngularFireAuth) {
    
  }


  // ====================== Autenticación =====================

  // ============== Acceder ===============

  signIn(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }


  // ============== crear Usuario ===============

  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  // ============== crear Usuario ===============

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, {displayName});
  }

}
