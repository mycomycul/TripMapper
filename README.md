# TripMapper
Web Interface for attaching text sections to google map locations

This project was initially built for creating trip log websites where scrolling through the text moves google maps to the location specified for that section of text. I ended up using it as a test system for manually creating HTML elements with js, implementing Drag-n-Drop, and interfacing with the Google Maps and Quill API. I spent a fair amount of time implementing the framework that would have been simplified significantly if I'd know React at the time.
* Sections can be added, edited, moved around, attached to map locations, and deleted. 
* The map sticks to the top if you create enough sections that you can still see the map when creating large documents.
* The dark\light theme icon is a custom built svg and transitions to a night time theme.
* Exporting a new HTML file with code for autoscrolling has yet to be implemented. THe button exports a new static document



Because it's a static website, for security reason it doesn't implement an API key but the map still works in developer mode. Eventually the map data will be fed through a server to secure the API connection


To test the website you can view it live. If the interface loads with a map covering the entire background, refresh the page.

[TripMapper](http://www.strunktech.com/TripMapper)
