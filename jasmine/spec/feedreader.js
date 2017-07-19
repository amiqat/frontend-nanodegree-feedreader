/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    describe('The menu', function() {

        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('menu toggles when clicked', function() {
            //trigger menu click
            $('.menu-icon-link').trigger('click');
            //check if menu is visable
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            //click on menu again
            $('.menu-icon-link').trigger('click');
            //check if menu is hidden
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done){
            //loads request
            loadFeed(0, function(){
                //callback for once request is loaded
                done();
            });
        });
        it('feed should contain at least one entry', function(done) {
            //checks to see if data is received
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var old_title = '';
        var old_entry = '';
        var new_title = '';
        var new_entry = '';
        //stores old title and entry information before making a request
        beforeEach(function(done) {
            //load feed 0
            loadFeed(0, function() {
                //save title and entry from load
                old_title = $('.header-title').text();
                old_entry = $('.entry').text();
                //load feed 1
                loadFeed(1, function(){
                    //save title and entry from load
                    new_title = $('.header-title').text();
                    new_entry = $('.entry').text();
                    done();
                });
            });
        });
        it('Content changes when new feed loads', function(done) {
            //compares content after a request with content from before a request
            expect(old_title).not.toBe(new_title);
            expect(old_entry).not.toBe(new_entry);
            done();
        });
    });
}());