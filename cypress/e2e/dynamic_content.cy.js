describe('User is able to load dynamic content upon page refresh', () => {
  beforeEach(()=> {
    // Visit heroku
    cy.visit('/');
    // Click "Dynamic Content" link to redirect to page
    cy.get('a[href="/dynamic_content"]').click()
    // Wait for page to load: url containes /dynamic_content
    cy.url().should('include', '/dynamic_content');
  });

  it('should be able to display initial set of dynamic content', () => {
    // Verify that on initial load 3 content rows are already visible
    cy.get(contentPanel).children(dynamicRow).as('dynamicRows').should('have.length', 3);

    // Save initial content for comparison after page refresh
    cy.get("@dynamicRows").each((row, rowIndex) => {
      cy.get(row).find(avatarImage).invoke('attr', 'src').then((srcValue)=> {
        //expect(srcValue).to.not.eq(staticContent[rowIndex].image);
        initialContent[rowIndex].image = srcValue;
      });
      cy.get(row).find(description).invoke('text').then((desc)=> {
        //expect(desc).to.not.eq(staticContent[rowIndex].desc);
        initialContent[rowIndex].desc = desc;
      });
    });

    // Reload page
    cy.reload();
    cy.contains('Dynamic Content', {timeout: 3000}).should('be.visible');

    cy.log(initialContent);

    // Save newly loaded content for comparison
    cy.get("@dynamicRows").each((row, rowIndex) => {
      cy.get(row).find(avatarImage).invoke('attr', 'src').then((srcValue)=> {
        //expect(srcValue).to.not.eq(staticContent[rowIndex].image);
        newContent[rowIndex].image = srcValue;
      });
      cy.get(row).find(description).invoke('text').then((desc)=> {
        //expect(desc).to.not.eq(staticContent[rowIndex].desc);
        newContent[rowIndex].desc = desc;
      });
    });

    cy.log(newContent);

    initialContent.forEach((row, rowIndex) => {
      if(initialContent[rowIndex].image != newContent[rowIndex].image) {
        hasAtLeastOneDifference = true;
      }
      if(initialContent[rowIndex].desc != newContent[rowIndex].desc) {
        hasAtLeastOneDifference = true;
      }
    });

    cy.log(hasAtLeastOneDifference);
    cy.wrap(hasAtLeastOneDifference).should('eq', true);

  })
  
})

// Locators
const contentPanel = '#content.large-centered';
const dynamicRow = '.row';
const avatarImage = 'div > img';
const description = 'div.large-10';
const staticContent = [{
  image: '/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg',
  desc: 'Accusantium eius ut architecto neque vel voluptatem vel nam eos minus ullam dolores voluptates enim sed voluptatem rerum qui sapiente nesciunt aspernatur et accusamus laboriosam culpa tenetur hic aut placeat error autem qui sunt.'
},
{
  image: '/img/avatars/Original-Facebook-Geek-Profile-Avatar-3.jpg',
  desc: 'Omnis fugiat porro vero quas tempora quis eveniet ab officia cupiditate culpa repellat debitis itaque possimus odit dolorum et iste quibusdam quis dicta autem sint vel quo vel consequuntur dolorem nihil neque sunt aperiam blanditiis.'
},
{
  image: '/img/avatars/Original-Facebook-Geek-Profile-Avatar-2.jpg',
  desc: 'Aliquid saepe voluptatem ad esse eum quis veniam ex rerum occaecati et odit error laborum illum enim nemo harum quod blanditiis architecto rerum ea qui laudantium numquam libero aliquam quis.'
}];
const initialContent = [{
  image: '',
  desc: ''
},{
  image: '',
  desc: ''
},{
  image: '',
  desc: ''
}];
const newContent = [{
  image: '',
  desc: ''
},{
  image: '',
  desc: ''
},{
  image: '',
  desc: ''
}];
let hasAtLeastOneDifference = false;
