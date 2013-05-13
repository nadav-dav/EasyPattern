"use strict";

module.exports = function (str){
    return new EasyPattern(str);
};


function EasyPattern(str){
    this._regex = createRegex(str);
    this._placeholders = getPlaceholdersIndex(str);
}


EasyPattern.prototype.test = function test (testee){
    return this._regex.test(testee);
};

EasyPattern.prototype.match = function test (testee){
    var match = this._regex.exec(testee) || [];
    var result = {};
    for( var holder in this._placeholders){
        result[holder] = match[this._placeholders[holder]];
    }
    return result;
};


function createRegex(str){
    str = str.replace(/\./g,"\\.")
            .replace(/\-/g,"\\-")
            .replace(/\[/g,"\\[")
            .replace(/\]/g,"\\]")
            .replace(/\*\{/g,"*/{")
            .replace(/\*/g,".*")
            .replace(/\?/g,"\\?")
            .replace(/\(/g,"{")
            .replace(/\)/g,"}")
            .replace(/\{\.\*\}/g,"(.*)")
            .replace(/\{[^\}]*\}/g,"([^\/]+)");
    return new RegExp(str);
}

function getPlaceholdersIndex(str){
    var regex = /\{([^\}]+)\}+/g;
    var results = {};

    var matches=[];
    var match;
    while (match = regex.exec(str)) {
        if (match && match[1]){
            matches.push(match[1]);
        }
    }

    var untaggedIndex = 1;
    for (var i = 0; i<matches.length; i++){
        if (matches[i] === "*"){
            results[untaggedIndex] = i+1;
            untaggedIndex++;
        }else{
            results[matches[i]] = i+1;
        }
    }
    return results;
}