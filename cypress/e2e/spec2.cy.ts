describe('Test pentru funcționalitatea onItemClick()', () => {
  it('Verifică funcționarea corectă a funcției onItemClick()', () => {
    cy.visit('http://localhost:4200/home-client'); // Accesează pagina de start

    // Simulează clicul pe primul serviciu din listă
    cy.get('.services-list .service:first-child').click();
    cy.url().should('include', '/home-client');

  });
});
