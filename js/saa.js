document.querySelector("#myForm").addEventListener('submit',saveBookmark);
function saveBookmark(e) {
    //Get form values
    var siteName = document.querySelector("#siteName").value;
    var siteURL = document.querySelector("#siteURL").value;
    var siteCategory = document.querySelector("#category").value;

    if(!validateForm(siteName,siteURL)){
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteURL,
        cat: siteCategory
    }
    /*
        //Local Storage Test
        localStorage.setItem('test','Hello world');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */
    //Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //set to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // ADd bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    //Clear form
    document.querySelector("#myForm").reset();
    //Re-fetch bookmarks
    fetchBookmarks();

    //Prevent form from submiting
    e.preventDefault();
}
//Function delete bookmark
function delateBookmark(url){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop throught bookmarks
    for(var i=0;i < bookmarks.length;i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i,1);
        }
    }
    // Re-set back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Re-fetch bookmarks
    fetchBookmarks();

}

// Fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.querySelector("#bookmarksResults");

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i=0;i<bookmarks.length;i++){
        var name= bookmarks[i].name;
        var url = bookmarks[i].url;
        var CAT = bookmarks[i].cat;

        bookmarksResults.innerHTML +=   '<div class="well">'+
            '<h3>' + name + " " + CAT +
            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            ' <a onclick="delateBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delate</a> ' +
            '</h3>'+
            '</div>';
    }
}
//Validate Form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert("Please fill in the form");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert("Please use a valid URL! For example  http://google.com");
        return false;
    }
    return true;
}