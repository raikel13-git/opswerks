describe('User is able to drag and drop objects', () => {
  beforeEach(()=> {
    // Visit heroku
    cy.visit('/');
    // Click "Drag and Drop" link to redirect to page
    cy.get('a[href="/drag_and_drop"]').click()
    // Wait for page to load: url containes /drag_and_drop
    cy.url().should('include', '/drag_and_drop');
  });

  it('should be able to drag A and drop to B', () => {
    // Drag A onto B
    dragAndDrop(leftBox, rightBox);
    // Verify successful swapping of A and B
    verifySuccessfulSwapping('B', 'A');
  })

  it('should be able to drag A and drop to B', () => {
    // Drag B onto A
    dragAndDrop(rightBox, leftBox);
    // Verify successful swapping of B and A
    verifySuccessfulSwapping('B', 'A');
  })

  it('should be able to drag A and drop to B and swap places again', () => {
    // Drag A onto B then back
    dragAndDrop(rightBox, leftBox);
    // Verify successful swapping of A and B
    verifySuccessfulSwapping('B', 'A');

    // Drag back
    dragAndDrop(rightBox, leftBox);
    // Verify successful swapping of A and B
    verifySuccessfulSwapping('A', 'B');
  })

  // TODO: UI styling verification
  
})

// Locators
const leftBox = '#column-a';
const rightBox = '#column-b';

const dragAndDrop = (draggableFrom, dropTo) => {
  // Define a mock DataTransfer object
  const dataTransfer = new DataTransfer();

  cy.get(draggableFrom).trigger('dragstart', {dataTransfer});
  cy.get(dropTo).trigger('drop', {dataTransfer});
};

const verifySuccessfulSwapping = (expectedLeftBoxContent, expectedRightBoxContent) => {
  cy.get(leftBox).should('have.text', expectedLeftBoxContent);
  cy.get(rightBox).should('have.text', expectedRightBoxContent);
};