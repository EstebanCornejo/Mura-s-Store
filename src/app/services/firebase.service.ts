import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc,doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth : AngularFireAuth,
              private firestore : AngularFirestore,
              private utilsSvc : UtilsService){

              }


// ====================== Autenticación =====================

  getAuth() {
    this.auth.currentUser
    return getAuth().currentUser;
  }

      // ============== Acceder ===============

  async signIn(user: User) {
    return await this.auth.signInWithEmailAndPassword(user.email, user.password);
  }


      // ============== crear Usuario ===============

  async signUp(user: User) {
    return await this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }


      // ============== update Usuario ===============

  async updateUser(displayName: string) {
    return await updateProfile(getAuth().currentUser, {displayName});
  }

      // ============== enviar email para restablecer contraseña ===============

  async sendRecoveryEmail(email: string){
    return await this.auth.sendPasswordResetEmail(email);
    //return await sendPasswordResetEmail(getAuth(), email);
  }

  signOut() {
    this.auth.signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }




// ============== Base de Datos ===============

      // ============== crear documento ===============
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

      // ============== obtener documento ===============
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
