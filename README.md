# Morgan Aw's Blackbird Coding Challenge

This is my submission for Blackbird's coding challenge. 

## How to Run
**Note:** Make sure to have [Node.js](https://nodejs.org/en/) installed (developed on v6.2.1)

 1. Get the app
    - Clone the repository `git clone https://github.com/MorganCAw/blackbird-challenge.git`
   - or download it here `https://github.com/MorganCAw/blackbird-challenge/archive/master.zip`
 2. Install the dependencies
   - `npm install`
 3. Transpile and run client-side application
   - `npm run client`
 4. Transpile and run server-side application
   - `npm run server`
 5. Direct your browser to `127.0.0.1:8080`
 6. Have fun!


### Given Prompt
Write an app that works like google's image search: a text input which takes a query, hits our Blackbird API, and paints a grid of results! The back and forward buttons should work (so make sure you handle routing!)

### Implemented Features
 - Back and Forward buttons can go back and forwards
 - Search bar
   - Implemented typeahead feature
   - Most standard key functions work
     - Esc - will close potential typeahead container
     - Enter - will initiate the search and close typeahead container
   - Mouse click outside of typeahead container closes typeahead container
 - Result Grid
   - Infinite scrolling works
     - API is called before end of screen for good user experience
   - Clicking on a result will bring up a detailed view
 - Server-side Rendering
 - Relatively responsive styling

### Missing Functionality
 - Search Bar
   - Esc key in search bar only closes typeahead container but does not execute search
     - Google search executes search on typeahead container close
   - Up and down arrow keys will not highlight typeahead container
 - Did not implement a button to initiate search
 - Could not find 'Corrected Query' field in API response
 - Search calls are largely copy-pasted
 - Did not really 404 page (it's ugly)