// this.serviciu = {
//     locatie: "",
//     numeClient: '',
//     tipeServiciu: 'IT',
//     detalii: ""
//   };

// const output = `
// <h2>You paid a total of ${price}$ for this order.</h2>
// <h2>Here is the list with the rooms you booked: </h2>
// <h3>${text}</h3>
// <h2>  ${discount} </h2>
// <h2>Thank you for choosing Ambiance!</h2>
// `;


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



const judeteRef = this.firebaseService.collection('judete')

// for (const judet of this.judete) {
//   judeteRef.add({ nume: judet });
// }


private fetchUsersFromFirestore(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'users');

    // Use collectionData to get an Observable of the documents
    return collectionData(usersCollection).pipe(
      switchMap((users) => {
        // Update the local array
        this.users = users;
        return this.users$;
      })
    );
  }