//Listen for form submit

document.querySelector("#myForm").addEventListener('submit',saveBookmark);
document.querySelector("#add-category").addEventListener('submit',addCategory);
//Save Bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.querySelector("#siteName").value;
    var siteURL = document.querySelector("#siteURL").value;
    var siteCategory = document.querySelector("#mySelect").value;

    if(!validateForm(siteName,siteURL,siteCategory)){
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
                                            '<h3>' + name + " " +
                                            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                            ' <a onclick="delateBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delate</a> ' +
                                            '</h3>'+
                                            '</div>';
        }
    }
    //Validate Form
    function validateForm(siteName, siteURL,siteCategory){
        if(!siteName || !siteURL || siteCategory == "choose"){
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

    // Add Category
    function addCategory(e){
        var newCategory = document.querySelector("#category").value;
        var category = {
            name: newCategory
        }

        if(localStorage.getItem('categories') === null){
            //Init array
            var categories = [];
            //Add to array
            categories.push(category);
            //set to local storage
            localStorage.setItem('categories',JSON.stringify(categories));
        } else {
            // Get bookmarks from localStorage
            var categories = JSON.parse(localStorage.getItem('categories'));
            // ADd bookmark to array
            categories.push(category);
            // Re-set back to local storage
            localStorage.setItem('categories',JSON.stringify(categories));
        }
        //Clear form
        document.querySelector("#add-category").reset();
        //Re-fetch bookmarks
        updateCategories();
        e.preventDefault();

    }
function fetchCategories(){
    var categories = JSON.parse(localStorage.getItem('categories'));

    // Get output id
    var x = document.getElementById("mySelect");


    // Build output
    for(var i=0;i<categories.length;i++){
        var name= categories[i].name;
        var option = document.createElement("option");
        option.text = name;
        x.add(option,x[categories.length]);
    }
}
function updateCategories() {
    var categories = JSON.parse(localStorage.getItem('categories'));

    // Get output id
    var x = document.getElementById("mySelect");


    // Build output
        var name= categories[categories.length-1].name;
        var option = document.createElement("option");
        option.text = name;
        x.add(option,x[categories.length]);

}

function showCategories(){
    var categories = JSON.parse(localStorage.getItem('categories'));
    var bookmarksResults = document.querySelector("#bookmarksResults");
    bookmarksResults.innerHTML = '';
    for(var i=0;i<categories.length;i++){
        var name= categories[i].name;
        bookmarksResults.innerHTML +=   '<div class="well">'+
                                        '<h3>'+name+'</h3>'+
                                        '<button onclick="bookmarksInCategory(\''+name+'\')" type="button">ZOBACZ</button> '
                                        '</div>'
    }
}
function bookmarksInCategory(categoryname){
    console.log("dziala");
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.querySelector("#bookmarksResults");
    bookmarksResults.innerHTML = '';
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].cat == categoryname){
            var name= bookmarks[i].name;
            var url = bookmarks[i].url;
            bookmarksResults.innerHTML += '<div class="well">'+
                                           '<h3>' + name + " " +
                                           ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                           ' <a onclick="delateBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delate</a> ' +
                                           '</h3>'+
                                           '</div>';
        }
    }
    return true;

}