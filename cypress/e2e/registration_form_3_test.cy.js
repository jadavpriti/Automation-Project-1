beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

describe('Section 1: visual tests', ()=> {
    //radio buttons and its content
    it('Check that radio button list and its content is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    //dropdown and dependencies between 2 dropdowns
    it('Country dropdown and dependencies is correct', () => {
        // Get the length of array of elements in Country dropdown
        cy.get('#country').children().should('have.length', 4)
        
        const optionsMapping = {
            '': '',
            'Spain': 'object:3',
            'Estonia': 'object:4',
            'Austria': 'object:5'
          };

        // Advanced level how to check the content of the Country dropdown
        cy.get('#country').find('option').each(($option) => {
            const label = $option.text().trim();
            const expectedValue = optionsMapping[label];
            
        // Assert the option's value
        cy.wrap($option).should('have.value', expectedValue);
        
        const countryOptionsMapping = {
            '': [],
            'Spain': ['Malaga', 'Madrid', 'Valencia'],
            'Estonia': ['Corralejo'],
            'Austria': []
          };
          
          // Select a country and verify the options in the city dropdown
          cy.get('#country').select('Spain');
          cy.get('#city').find('option').each(($option) => {
            const label = $option.text().trim();
            const expectedOptions = countryOptionsMapping['Spain'];
          }); 
        })
    })

    //checkboxes, their content and links
    it('Check that checkbox list, their content and links are correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').next().eq(0).and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).and('not.be.checked')
        
        // Selecting more than one check box is possible
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.contains('Accept our cookie policy').click();
        cy.url().should('contain', '/cookiePolicy.html')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })

    // email format
    it('invalid email format', () => {
      cy.get('[type="email"]').type('fjkshj')
      cy.get('#emailAlert').should('contain', 'Invalid email address')
  })
})

//BONUS TASK: add functional tests for registration form 3

describe('Section 2: Functional tests', () => {
  
  //all fields are filled in + validation
  it('validation when all fields are filled', ()=>{
      cy.get('#name').type('priti')
      cy.get('[name="email"]').type('priti@gmail.com')
      cy.get('#country').select('Spain')
      cy.get('#city').select('Malaga')
      cy.contains('Date of birth').next().type('1996-08-02')
      cy.get('input[type="radio"]').eq(1).check().should('be.checked')
      cy.get('#birthday').type('1996-08-02')
      cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
      cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

      cy.get('input[type="submit"]').should('be.enabled')
      })

  //only mandatory fields are filled in + validations
  it('validation when mandatory fields are filled', ()=>{
    cy.get('[name="email"]').type('priti@gmail.com')
    cy.get('#birthday').type('1996-08-02')
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

    cy.get('input[type="submit"]').should('be.enabled')
    })

  //mandatory fields are absent + validations (try using function)
  it('validation when mandatory fields are not filled', ()=>{
    cy.get('[name="email"]').type('priti@gmail.com').clear()
    cy.get('#birthday').clear()
    cy.get('input[type="checkbox"]').next().eq(0).and('not.be.checked')
    cy.get('input[type="checkbox"]').next().eq(1).and('not.be.checked')

    cy.get('input[type="submit"]').should('be.disabled')
    })

  //If city is already chosen and country is updated, then city choice should be removed
  it('chosen city should beremoved when country is updated', ()=>{
    cy.get('#country').select('Spain')
    cy.get('#city').select('Malaga')
    cy.get('#country').select('Estonia')
    cy.get('[lable="Malaga"]').should('not.exist')
    })

  //add file (google yourself for solution)
  it('should upload a file', () => {
  // Attach the file to the file input element
    cy.fixture('Assignment1.png').then((fileContent) => {
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const testFile = new File([blob], 'Assignment1.png');
      
    cy.get('input[type="file"]').then((input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
        
      input[0].files = dataTransfer.files;
        
    // Assert that the file has been attached
      expect(input[0].files.length).to.equal(1);
      });
    });
  });

    })