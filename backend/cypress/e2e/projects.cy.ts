describe('Projects API E2E Tests', () => {
  const apiUrl = 'http://localhost:3000/projects';

  it('Créer un projet', () => {
    cy.request('POST', apiUrl, {
      name: 'Nouveau Projet',
      description: 'Description du projet',
      ownerId: 'valid-user-id',
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Nouveau Projet');
      expect(response.body).to.have.property(
        'description',
        'Description du projet',
      );
      expect(response.body).to.have.property('ownerId');
    });
  });

  it('Récupérer tous les projets', () => {
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('Récupérer un projet par ID', () => {
    cy.request('POST', apiUrl, {
      name: 'Projet pour récupération',
      description: 'Description pour récupération',
      ownerId: 'valid-user-id',
    }).then((postResponse) => {
      const projectId = postResponse.body._id;

      cy.request('GET', `${apiUrl}/${projectId}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('_id', projectId);
        expect(getResponse.body).to.have.property(
          'name',
          'Projet pour récupération',
        );
        expect(getResponse.body).to.have.property(
          'description',
          'Description pour récupération',
        );
      });
    });
  });

  it('Mettre à jour un projet', () => {
    cy.request('POST', apiUrl, {
      name: 'Projet à mettre à jour',
      description: 'Description initiale',
      ownerId: 'valid-user-id',
    }).then((postResponse) => {
      const projectId = postResponse.body._id;

      cy.request('PUT', `${apiUrl}/${projectId}`, {
        name: 'Projet mis à jour',
        description: 'Description mise à jour',
      }).then((putResponse) => {
        expect(putResponse.status).to.eq(200);
        expect(putResponse.body).to.have.property('name', 'Projet mis à jour');
        expect(putResponse.body).to.have.property(
          'description',
          'Description mise à jour',
        );
      });
    });
  });

  it('Supprimer un projet', () => {
    cy.request('POST', apiUrl, {
      name: 'Projet à supprimer',
      description: 'Description à supprimer',
      ownerId: 'valid-user-id',
    }).then((postResponse) => {
      const projectId = postResponse.body._id;

      cy.request('DELETE', `${apiUrl}/${projectId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);

        cy.request({
          method: 'GET',
          url: `${apiUrl}/${projectId}`,
          failOnStatusCode: false,
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(404);
        });
      });
    });
  });

  it("Gérer les erreurs lors de la création d'un projet sans nom", () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        description: 'Description sans nom',
        ownerId: 'valid-user-id',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.include('Le nom du projet est requis.');
    });
  });
});
