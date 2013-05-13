EasyPattern [![NPM version](https://badge.fury.io/js/easyPattern.png)](http://badge.fury.io/js/rekuire)
=========
EasyPattern is a readable alternative to regular expressions

It is great to match urls with ease, and keep is super readable!

installation
-------------
to install, type
> ```npm install easypattern```


Few examples
-----------------
- - -
**Basic testings**

    var pattern = easyPattern("{file}.js"); 
    pattern.test("archive.zip"); // false
    pattern.test("index.js"); // true
    
- - -
**Basic matching**

    var pattern = easyPattern("{folder}/{filename}.js"); 
    var result = pattern.match("foo/bar.js");
    
    //result = {folder: "foo", filename: "bar"}

- - -
**Wildcard matching**

    var pattern = easyPattern("*.{extension}"); 
    var result = pattern.match("/root/folder/file.exe");
    
    //result = {extension:"exe"}

- - -
**Advance matching**

    var pattern = easyPattern("{*}/{filename}?{*}"); 
    var result = pattern.match("www.site.com/home/hello.js?p=1");
    
    //result = {1:"www.site.com/home", 2:"p=1", filename:"hello.js"}
    