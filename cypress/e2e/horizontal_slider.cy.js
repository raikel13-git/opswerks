describe('User is able to use horizontal slider', () => {
  beforeEach(()=> {
    // Visit heroku
    cy.visit('/');
    // Click "Horizontal Slider" link to redirect to page
    cy.get('a[href="/horizontal_slider"]').click()
    // Wait for page to load: url containes /horizontal_slider
    cy.url().should('include', '/horizontal_slider');
  });

  it('should be able to update the slider value via mouse', () => {
    // Verify that on page load some content is already visible
    cy.get(slider)
      .realMouseDown()
      .realMouseMove(100, 0)
      .realMouseUp();
      //.trigger('mousedown', { which: 1 }) 
      //.trigger('mousemove', { clientX: 500, clientY: 100, force: true }) 
      //.trigger('mouseup', { which: 1, force: true });
    cy.wait(3000);
    cy.get(sliderValue).invoke('text').then((val) => {
      cy.wrap(val).should('not.eq', '0');
    });
  });

  it('should be able to update the slider value via keyboard arrow keys', () => {
    cy.get(slider)
      .focus({force: true})
      .realType('{rightarrow}{rightarrow}{rightarrow}');
      
    cy.get(sliderValue).should('have.text', '1.5')
  }); 

  
})

// Locators
const sliderPanel = '.sliderContainer';
const slider = 'input[type="range"]';
const sliderValue = '#range';
