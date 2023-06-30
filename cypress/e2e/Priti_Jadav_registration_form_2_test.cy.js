beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

import { faker } from '@faker-js/faker';


/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {
    //Generate reandom data using faker
    let FirstName = faker.person.firstName();
    let LastName = faker.person.lastName();
    let password = faker.internet.password();

    const username = 'Priti'
    const Email = 'priti@email.com'

    it('User can use only same both first and validation passwords', ()=>{
        
        // Add test steps for filling in only mandatory fields
        cy.get('#username').type(username)
        cy.get('#email').type(Email)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('input[name="lastName"]').type(LastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type(password)

        //uncomment relevent part to run the test by removing "/*...*/" and add the same again to already tested part to test another block

       // Type confirmation password which is different from first password
        cy.get('[name="confirm"]').type('Priti123')
        cy.get('h2').contains('Password').click()
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Assert that error message is visible
        cy.get('#password_error_message').should('have.css', 'display', 'block')

       /* //Confirmation password that matches main password
        cy.get('[name="confirm"]').type(password)
        cy.get('h2').contains('Password').click()
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        // Assert that successful message is visible
        cy.get('#success_message').should('have.css', 'display', 'none')
        // Assert that error message is not visible
        cy.get('#password_error_message').should('not.be.visible') */
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('#username').type(username)
        cy.get('#email').type(Email)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('input[name="lastName"]').type(LastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)
        cy.get('#htmlFavLanguage').check()
        cy.get('#vehicle2').check()
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('snake')
        // Assert that submit button is enabled and clicked
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username').type(username)
        cy.get('#email').type(Email)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('input[name="lastName"]').type(LastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)
        // Assert that submit button is enabled and clicked
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('have.css', 'display', 'block')
    })

    it('Input valid data to the page', () => {
        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username').type(username)
        cy.get('#email').type(Email)
        cy.get('input[name="name"]').type(FirstName)
        cy.get('input[name="lastName"]').type(LastName)
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)

        // absence of username
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear().type('  ')

       //absence of email
       cy.get('#email').scrollIntoView()
       cy.get('#email').clear().type('  ')
       cy.get('h2').contains('Password').click()

       // Assert that submit button is not enabled
       cy.get('.submit_button').should('be.disabled')
       // Assert that successful message is not visible
       cy.get('#success_message').should('not.be.visible')
       // Assert that error message is visible
       cy.get('#input_error_message').should('have.css', 'display', 'block')

    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture
    it('Check that cypress logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter width, to be equal 116
        cy.get('img[src="cypress_logo.png"]').invoke('width').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')
        
        // Selecting more than one check box is possible
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one
    it('Animal dropdown is correct', () => {
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('animal drop-down')
        cy.screenshot('Full page screenshot')

        // get the length of array of elements in animal dropdown
        cy.get('#animal').find('option').should('have.length', 6)
        
        //Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Check the content of the animalss dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })

})