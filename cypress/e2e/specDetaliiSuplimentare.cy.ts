describe('Teste pentru introducerea detaliilor suplimentare', () => {
  beforeEach(() => {
    // Accesăm pagina web înainte de fiecare test
    cy.visit('http://localhost:4200/additional-details');
  });

  it('Verifică prezența și corectitudinea elementelor HTML', () => {
    // Verificăm dacă există elementul cu clasa 'homeForm'
    cy.get('.homeForm').should('exist');

    // Verificăm dacă există texterea pentru introducerea detaliilor
    cy.get('#detailsInput').should('exist');

    // Verificăm dacă există butoanele "Înapoi" și "Continuați"
    cy.contains('Înapoi').should('exist');
    cy.contains('Continuați').should('exist');
  });

  it('Introduceți detalii în textarea', () => {
    // Introducem un text în textarea
    const detalii = 'Acestea sunt detaliile suplimentare';
    cy.get('#detailsInput').type(detalii);

    // Verificăm dacă textul introdus în textarea este afișat corect
    cy.get('#detailsInput').should('have.value', detalii);
  });

  it('Interacționează cu butonul de "Înapoi"', () => {
    // Facem clic pe butonul "Înapoi" și verificăm dacă suntem redirecționați la pagina anterioară
    cy.contains('Înapoi').click();
    // Verificăm dacă suntem pe pagina anterioară
    cy.url().should('include', 'location-time-details');

  });
});
