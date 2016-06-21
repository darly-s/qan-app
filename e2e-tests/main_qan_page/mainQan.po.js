'use strict';  
  
module.exports = {  
  mainPage: {  
    managementButton: element(by.xpath('//*[contains(@title,"Manage mysql instances & agents")]')),  
    timeRange1h: element(by.xpath('//label[contains(text(), "1h")]')),
    timeRange3h: element(by.xpath('//label[contains(text(), "3h")]')),
    timeRange6h: element(by.xpath('//label[contains(text(), "6h")]')),
    timeRange12h: element(by.xpath('//label[contains(text(), "12h")]')),
    timeRange1d: element(by.xpath('//label[contains(text(), "1d")]')),
    timeRange5d: element(by.xpath('//label[contains(text(), "5d")]')),
    totalLink: element(by.linkText('TOTAL')),
    metricCounters: element(by.buttonText('METRIC COUNTERS')),
    metricRates: element(by.buttonText('METRIC RATES')),
    serverSummary: element(by.xpath('//*[contains(text(), "Server Summary")]')),
    timeRangeDspl: element(by.xpath('//p[@class="well navbar-text ng-binding"]')),  
    selectQuery: element(by.linkText('SELECT sbtest'))  
  },  
      
  get: function() {  
    browser.get('/qan/');   
    browser.waitForAngular();  
  },  
      
  clickManagement: function() {  
    var mainPage = this.mainPage;  
          
    mainPage.managementButton.isDisplayed();  
    mainPage.managementButton.click();  
  }, 

  clickTotal: function() {
    var mainPage = this.mainPage;

    mainPage.totalLink.isDisplayed();
    mainPage.totalLink.click();
  },

  clickMetricCounters: function() {
    var mainPage = this.mainPage;

    mainPage.metricCounters.isDisplayed();
    mainPage.metricCounters.click();
  },

  clickMetricRates: function() {
    var mainPage = this.mainPage;

    mainPage.metricRates.isDisplayed();
    mainPage.metricRates.click();
  },

  clickSelectQuery: function() {
    var mainPage = this.mainPage;

    mainPage.selectQuery.isDisplayed();
    mainPage.selectQuery.click();
  },

  returnTimeRangeDisplayed: function() {
    this.mainPage.timeRangeDispl.isDisplayed();
  },
};