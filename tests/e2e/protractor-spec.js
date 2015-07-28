describe('The default paginator', function() {

  beforeEach(function() {
    browser.get('http://localhost:8888/example/');
  });

  it('should have all the default pagination elements', function() {
    expect(element(by.id('paginator')).isPresent()).toBe(true);
    expect(element(by.id('firstPageButton')).isPresent()).toBe(true);
    expect(element(by.id('previousPageButton')).isPresent()).toBe(true);
    expect(element(by.id('nextPageButton')).isPresent()).toBe(true);
    expect(element(by.id('lastPageButton')).isPresent()).toBe(true);
    expect(element(by.id('pageSizeSelector')).isPresent()).toBe(true);
    expect(element(by.id('pageNumberSelector')).isPresent()).toBe(true);

    element.all(by.repeater('navButton in navButtons')).count()
      .then(function(count) {
        expect(count).toEqual(7);
      });

  });

  it('should have a default page size to 10', function() {
    element(by.model('pageSize')).$('option:checked').getText()
      .then(function(value) {
        expect(value).toEqual('10');
      });
  });

  it('should be placed by default to page 1', function() {
    element(by.id('pageNumberSelector')).getAttribute('value')
      .then(function(text) {
        expect(text).toEqual('1');
      });
  });

  it('should have 10 elements in the table', function() {
    element.all(by.repeater('item in myResults'))
      .then(function(array) {
        expect(array.length).toEqual(10);
      });
  });

  it('should contain element 1 and 10 in the first page', function() {
    element(by.id('tableElement1')).getText()
      .then(function(value) {
          expect(value).toEqual('1');
      });
    element(by.id('tableElement10')).getText()
      .then(function(value) {
          expect(value).toEqual('10');
      });
  });

  it('should not contain element 11 in the first page', function() {
    expect(element(by.id('tableElement11')).isPresent()).toBe(false);
   });

  it('should decrease the page size according to the dropdown selection', function() {
    element(by.model('pageSize')).$('[value="number:5"]').click()
      .then(function() {
        element.all(by.repeater('item in myResults'))
            .then(function(array) {
              expect(array.length).toEqual(5);
            });
      });
  });

  it('should increase the page size according to the dropdown selection', function() {
    element(by.model('pageSize')).$('[value="number:50"]').click()
      .then(function() {
        element.all(by.repeater('item in myResults'))
            .then(function(array) {
              expect(array.length).toEqual(50);
            });
      });
  });

  it('should refresh table when navigating to the second page', function() {
    element(by.id('nextPageButton')).click()
      .then(function() {
          expect(element(by.id('tableElement1')).isPresent()).toBe(false);
          expect(element(by.id('tableElement10')).isPresent()).toBe(false);
          element(by.id('tableElement11')).getText()
            .then(function(value) {
                expect(value).toEqual('11');
            });
      });
  });

  it('should refresh table when navigating to the second page and back to first page', function() {
    element(by.id('nextPageButton')).click()
      .then(function() {
          element(by.id('pageNumberSelector')).getAttribute('value')
            .then(function(text) {
              expect(text).toEqual('2');
            });
            element(by.id('previousPageButton')).click()
              .then(function() {
                expect(element(by.id('tableElement1')).isPresent()).toBe(true);
                expect(element(by.id('tableElement10')).isPresent()).toBe(true);
                expect(element(by.id('tableElement11')).isPresent()).toBe(false);
              });
            element(by.id('pageNumberSelector')).getAttribute('value')
              .then(function(text) {
                expect(text).toEqual('1');
              });
      });
  });

  it('should refresh table when pressing on second page button', function() {
    element(by.id('pageNavigator2')).click()
      .then(function() {
        element(by.id('pageNumberSelector')).getAttribute('value')
          .then(function(text) {
            expect(text).toEqual('2');
          });
          expect(element(by.id('tableElement1')).isPresent()).toBe(false);
          expect(element(by.id('tableElement10')).isPresent()).toBe(false);
          element(by.id('tableElement11')).getText()
            .then(function(value) {
              expect(value).toEqual('11');
            });
      });
  });

  it('should go to next page chunk when pressing triple dots button', function() {
    element(by.id('pageNavigator...')).click()
      .then(function() {
          expect(element(by.id('tableElement1')).isPresent()).toBe(false);
          expect(element(by.id('tableElement10')).isPresent()).toBe(false);
          element(by.id('tableElement61')).getText()
              .then(function(value) {
                expect(value).toEqual('61');
              });
          element(by.id('pageNumberSelector')).getAttribute('value')
              .then(function(text) {
                expect(text).toEqual('7');
                });
      });
  });

  it('should go to last page when last page button is pressed', function() {
    element(by.id('lastPageButton')).click()
      .then(function() {
        expect(element(by.id('tableElement1')).isPresent()).toBe(false);
        expect(element(by.id('tableElement10')).isPresent()).toBe(false);
        element(by.id('tableElement211')).getText()
          .then(function(value) {
            expect(value).toEqual('211');
          });
          element(by.id('pageNumberSelector')).getAttribute('value')
            .then(function(text) {
              expect(text).toEqual('22');
            });
      });
  });

  it('should be on last page when increasing page size on the last page', function() {
    element(by.id('lastPageButton')).click()
      .then(function() {
        element(by.model('pageSize')).$('[value="number:100"]').click()
          .then(function() {
            element.all(by.repeater('item in myResults'))
              .then(function(array) {
                expect(array.length).toEqual(13);
              });
            element(by.id('pageNumberSelector')).getAttribute('value')
              .then(function(text) {
                expect(text).toEqual('3');
            });
        });
    });
  });

});
