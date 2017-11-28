describe('Protractor Demo App', function () {
  it('should have a title', function () {
    browser.get('http://localhost:9000/');
    expect(browser.getTitle()).toEqual('VASS&You 3.0');
  });

  it('should change the language to english', function () {
    element(by.css('.idioma_cont')).click();
    element(by.css('.flag2')).click();
    expect(element(by.css('.form-signin-heading ')).getText()).toBe('Authentication');
  });

  it('should change the language to spanish', function () {
    element(by.css('.idioma_cont')).click();
    element(by.css('.flag1')).click();
    expect(element(by.css('.form-signin-heading ')).getText()).toContain('Por favor introduzca sus datos');
  });
  
  it('should login in the app', function(){
      var userInput = element(by.model('loginCtrl.username'));
      userInput.sendKeys('sami.baki');
      var passInput = element(by.model('loginCtrl.password'));
      passInput.sendKeys('99543');
      element(by.css('.boton_general')).click();
  });
});