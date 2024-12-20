describe('Users API E2E Tests', () => {
  const apiUrl = 'http://localhost:3000/users';

  it('Créer un utilisateur', () => {
    cy.request('POST', apiUrl, {
      username: 'nouvelutilisateur',
      email: 'utilisateur@example.com',
      password: 'motdepasse123',
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('username', 'nouvelutilisateur');
      expect(response.body).to.have.property(
        'email',
        'utilisateur@example.com',
      );
    });
  });

  it('Récupérer tous les utilisateurs', () => {
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('Récupérer un utilisateur par email', () => {
    cy.request('POST', apiUrl, {
      username: 'utilisateurrecup',
      email: 'recup@example.com',
      password: 'motdepasse123',
    }).then((postResponse) => {
      const email = postResponse.body.email;

      cy.request('GET', `${apiUrl}/${email}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('email', email);
        expect(getResponse.body).to.have.property(
          'username',
          'utilisateurrecup',
        );
      });
    });
  });

  it('Mettre à jour un utilisateur', () => {
    cy.request('POST', apiUrl, {
      username: 'utilisateuràmettreàjour',
      email: 'update@example.com',
      password: 'motdepasse123',
    }).then((postResponse) => {
      const userId = postResponse.body._id;

      cy.request('PUT', `${apiUrl}/${userId}`, {
        username: 'utilisateurmisàjour',
        email: 'misajour@example.com',
      }).then((putResponse) => {
        expect(putResponse.status).to.eq(200);
        expect(putResponse.body).to.have.property(
          'username',
          'utilisateurmisàjour',
        );
        expect(putResponse.body).to.have.property(
          'email',
          'misajour@example.com',
        );
      });
    });
  });

  it('Supprimer un utilisateur', () => {
    cy.request('POST', apiUrl, {
      username: 'utilisateuràsupprimer',
      email: 'supprimer@example.com',
      password: 'motdepasse123',
    }).then((postResponse) => {
      const userId = postResponse.body._id;

      cy.request('DELETE', `${apiUrl}/${userId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);

        cy.request({
          method: 'GET',
          url: `${apiUrl}/${userId}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(404);
        });
      });
    });
  });

  it("Gérer les erreurs lors de la création d'un utilisateur sans email", () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        username: 'sansemail',
        password: 'motdepasse123',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message');
    });
  });
});
