describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      // cy.get('.error').contains('Wrong credentials')
      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      // cy.contains('logged in')
      cy.get('html').should('contain', 'Matti Luukkainen logged in')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function () {
        cy.contains('new note').click()
        cy.get('#title').type('a note created by cypress')
        cy.get('#author').type('note author')
        cy.get('#url').type('note url')
        cy.get('#submit').click()
        cy.contains('a note created by cypress')
      })

      describe('When a blog created', function () {
        beforeEach(function () {
          cy.contains('new note').click()
          cy.get('#title').type('a note created by cypress')
          cy.get('#author').type('note author')
          cy.get('#url').type('note url')
          cy.get('#submit').click()
          cy.contains('a note created by cypress')
        })

        it('can be liked', function () {
          cy.get('.view-btn').click()
          cy.get('.like-btn').click()
          cy.contains('likes: 1')
        })
      })
    })
  })
})