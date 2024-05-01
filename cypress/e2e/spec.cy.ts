// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:4200/home-client')
//   })
// })
describe('Test pentru încărcarea datelor serviciilor primare', () => {
  it('Verifică dacă serviciile primare sunt încărcate corect', () => {
    cy.visit('http://localhost:4200/home-client'); // Accesează pagina de start

    // Verifică dacă pagina s-a încărcat complet
    cy.get('.homeForm').should('be.visible');

    // Așteaptă ca serviciile să fie încărcate
    cy.wait(2000); // Poți ajusta timpul de așteptare în funcție de viteza de încărcare a datelor

    // Verifică dacă există cel puțin un serviciu în listă
    cy.get('.services-list .service').should('have.length.gt', 0);
    
    // Verifică dacă numele serviciului este afișat corect
    cy.get('.services-list .service:first-child').should('contain', 'Deratizare');
  });
});
