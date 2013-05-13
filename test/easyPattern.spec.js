"use strict";
var easyPattern = require('../lib/easyPattern');

describe("easyPattern",function(){
    describe("when .test()",function(){
        it("should match a simple pattern",function(){
            var pattern = easyPattern("*.js");
            expect(pattern.test("hello.js")).toBeTruthy();
        });
        it("should not match a simple pattern",function(){
            var pattern = easyPattern("*.zip");
            expect(pattern.test("hello.js")).toBeFalsy();
        });
    });

    describe("when .match()",function(){

        it("should return the right match object",function(){
            var pattern = easyPattern("{folder}/{filename}.js");
            expect(pattern.match("home/hello.js")).toEqual({folder:"home",filename:"hello"});
        });

        it("should match strings with . (dot) and ? (question mart) sights",function(){
            var pattern = easyPattern("{folder}/{filename}?{params}");
            expect(pattern.match("home/hello.js?p=1")).toEqual({folder:"home",filename:"hello.js","params":"p=1"});
        });

        it("should match wild cards",function(){
            var pattern = easyPattern("*/{filename}");
            expect(pattern.match("home/hello.js")).toEqual({filename:"hello.js"});
        });

        it("should tolerate *{param} syntax - it acts as */{param}",function(){
            var pattern = easyPattern("*{filename}");
            expect(pattern.match("home/hello.js")).toEqual({filename:"hello.js"});
        });

        it("should save wild cards",function(){
            var pattern = easyPattern("{*}/{filename}?{*}");
            expect(pattern.match("www.site.com/home/hello.js?p=1")).toEqual({   1:"www.site.com/home",
                                                                                2:"p=1",
                                                                                filename:"hello.js"});
        });


    });
});