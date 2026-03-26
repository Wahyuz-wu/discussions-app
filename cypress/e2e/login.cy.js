describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('harus menampilkan pesan error ketika login dengan kredensial salah', () => {
    cy.get('input[placeholder="Email"]').type('wrong@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button').contains('Login').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('User not found');
    });
  });

  it('harus berhasil login dan diarahkan ke halaman utama', () => {
    cy.get('input[placeholder="Email"]').type('pop@gmail.com');
    cy.get('input[placeholder="Password"]').type('pop123');
    cy.get('button').contains('Login').click();

    cy.url().should('not.include', '/login');
    cy.get('header').should('contain', 'Home');
  });
});