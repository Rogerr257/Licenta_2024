describe('Teste pentru formularul de informații personale', () => {
  beforeEach(() => {
    // Accesăm pagina web înainte de fiecare test
    cy.visit('http://localhost:4200/client-details');
  });

  it('Verifică validarea câmpurilor obligatorii', () => {
    // Nu completăm niciun câmp și încercăm să trimitem formularul
    cy.get('.button-container').contains('Continuați').click();

    // Verificăm dacă se afișează mesajul de eroare pentru câmpurile obligatorii
    cy.contains('Te rugăm să completezi toate câmpurile!').should('exist');
  });

  it('Verifică prezența și corectitudinea elementelor HTML', () => {
    // Verificăm dacă există elementul cu clasa 'homeForm'
    cy.get('.homeForm').should('exist');

    // Verificăm dacă există câmpurile de nume, prenume, telefon și email
    cy.get('.clientDetailsForm').within(() => {
      cy.get('[placeholder="Nume"]').should('exist');
      cy.get('[placeholder="Prenume"]').should('exist');
      cy.get('[placeholder="Telefon"]').should('exist');
      cy.get('[placeholder="Email"]').should('exist');
    });

    // Verificăm dacă există butoanele "Înapoi" și "Continuați"
    cy.get('.button-container').within(() => {
      cy.contains('Înapoi').should('exist');
      cy.contains('Continuați').should('exist');
    });
  });

  it('Completează și trimite formularul', () => {
    // Completați câmpurile formularului
    cy.get('[placeholder="Nume"]').type('Nume de test');
    cy.get('[placeholder="Prenume"]').type('Prenume de test');
    cy.get('[placeholder="Telefon"]').type('1234567890');
    cy.get('[placeholder="Email"]').type('test@example.com');

    cy.wait(2000);
    // Trimiteți formularul
    cy.get('.button-container').contains('Continuați').click();

    // Verificăm dacă suntem redirecționați către pagina următoare
    cy.url().should('include', '/service-request-details');
  });

  it('Interacționează cu butonul de "Înapoi"', () => {
    // Facem clic pe butonul "Înapoi" și verificăm dacă suntem redirecționați la pagina anterioară
    cy.contains('Înapoi').click();
    // Verificăm dacă suntem pe pagina anterioară
    cy.url().should('include', '/additional-details');

  });
});

