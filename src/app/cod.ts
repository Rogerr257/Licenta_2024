// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
// https://developers.google.com/oauthplayground/


// this.serviciu = {
//     locatie: "",
//     numeClient: '',
//     tipeServiciu: 'IT',
//     detalii: ""
//   };


// trimiteMailConfirmare() {}

// trimiteMailLaProfesionist(profesionist: string) {

//   const textarea : string = this.serviciu.locatie + this.serviciu.numeClient + this.serviciu.detalii;

//   return textarea;
// }

// trimiteoferta() {
//    this.serviciu = {
//     locatie: 'timisoara',
//     numeClient: 'roger',
//     tipeServiciu: 'IT',
//     detalii: ""
//   };

//   const listaDeProf = [
//     { profesionistNume: 'razvan', listaDeServicii: ['IT', 'Constructii'] },
//     { profesionistNume: 'alin', listaDeServicii: ['IT'] },
//   ];

//   for (const profesionist of listaDeProf) {
//     for (const serviciulProfesionistului of profesionist.listaDeServicii) {

//       if(serviciulProfesionistului === serviciu.tipeServiciu){

//         this.trimiteMailLaProfesionist(profesionist.profesionistNume);

//       }
//     }
//   }



//   this.trimiteMailConfirmare();

// }


// for (const judet of this.judete) {
//   judeteRef.add({ nume: judet });
// }


// private fetchUsersFromFirestore(): Observable<any[]> {
//     const usersCollection = collection(this.firestore, 'users');

//     // Use collectionData to get an Observable of the documents
//     return collectionData(usersCollection).pipe(
//       switchMap((users) => {
//         // Update the local array
//         this.users = users;
//         return this.users$;
//       })
//     );
//   }