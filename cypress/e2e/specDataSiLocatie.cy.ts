describe('Teste pentru selecția locației și datei lucrării', () => {
  beforeEach(() => {
    // Accesăm pagina web înainte de fiecare test
    cy.visit('http://localhost:4200/location-time-details');
  });

  it('Verifică prezența și corectitudinea elementelor HTML', () => {
    // Verificăm dacă există elementul cu clasa 'homeForm'
    cy.get('.homeForm').should('exist');

    // Verificăm dacă există câmpurile pentru județ, oraș și selectarea datei
    cy.get('#judetSelect').should('exist');
    cy.get('#orasSelect').should('exist');
    cy.get('input[placeholder="Când?"]').should('exist');

    // Verificăm dacă există butoanele "Înapoi" și "Continuați"
    cy.contains('Înapoi').should('exist');
    cy.contains('Continuați').should('exist');
  });

  it('Interacționează cu meniurile dropdown pentru județ/oraș si selecteaza o data', () => {
    // Deschidem meniul dropdown pentru județ
    cy.get('#judetSelect').click();
    // Selectăm o opțiune din meniul dropdown pentru județ
    cy.contains('Arad').click();
    // Deschidem meniul dropdown pentru oraș
    cy.get('#orasSelect').click();
    // Selectăm o opțiune din meniul dropdown pentru oraș
    cy.contains('Ineu').click(); 

    cy.get('#dataSelect').click();
    cy.contains('30').click(); 
    cy.contains('30').click(); 
    
    cy.contains('Continuați').click();
    // Verificăm dacă suntem redirecționați către pagina următoare
    cy.url().should('include', '/additional-details');
  });

  it('Interacționează cu butonul de "Înapoi"', () => {
    // Facem clic pe butonul "Înapoi" și verificăm dacă suntem redirecționați la pagina anterioară
    cy.contains('Înapoi').click();
    // Verificăm dacă suntem pe pagina anterioară
    cy.url().should('include', '/additional-details');

  });
  
});
