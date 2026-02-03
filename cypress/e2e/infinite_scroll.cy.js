describe('User is able to scroll thru the page', () => {
  beforeEach(()=> {
    // Visit heroku
    cy.visit('/');
    // Click "Infinite Screoll" link to redirect to page
    cy.get('a[href="/infinite_scroll"]').click()
    // Wait for page to load: url containes /infinite_scroll
    cy.url().should('include', '/infinite_scroll');
  });

  it('should be able to scroll down infinitely', () => {
    // Verify that on page load some content is already visible
    cy.get(addedContent).should('have.length', 1);
    // Scroll and check that additional content is loaded dynamically
    cy.scrollTo('bottom');
    cy.get(addedContent).should('have.length.at.least', 2);
  });

  it('should be able to scroll to footer programmatically', () => {
    // Scroll footer into view
    cy.get(pageFooter).scrollIntoView({ easing: 'linear' });
  });
  
})

// Locators
const pageFooter = '#page-footer';
const addedContent = '.jscroll-added';
