var doc = window.document;
var toString = Object.prototype.toString;
var typeArr = ['Number', 'Boolean', 'Object', 'String', 'Array', 'Function', 'Regxp', 'Date'];


//扩展原生JS
if (typeof String.prototype.trim === 'undefined') {
    String.prototype.trim = function () {
        var str = this.replace(/^\s+/, ""),
            end = str.length - 1;
        ws = /\s/;

        while (ws.test(str.charAt(end))) {
            end--;
        }

        return str.slice(0, end + 1);
    };
}

//工具类

//把old数组push进new数组
var pushAllArr = function (newArr, oldArr) {
    for (var i = 0; i < oldArr.length; i++) {
        newArr.push(oldArr[i]);
    }
    return newArr;
};

//跨浏览器获取Style
function getStyle(element, attr) {
    if (typeof window.getComputedStyle != 'undefined') {//W3C
        return window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'undeinfed') {//IE
        return element.currentStyle[attr];
    }
}

//为type函数做准备
var class2type = {}, i = 0, len = typeArr.length;

for (; i < len; i++) {
    class2type['[object ' + typeArr[i] + ']'] = typeArr[i].toLowerCase();
}


var type = function (obj) {
    return class2type[toString.call(obj)];
};


var $ = function (obj) {
    return new Base(obj);
};


var Base = function (obj) {
    this.elements = [];

    if (type(obj) === 'string') {
        if (obj.trim().indexOf(' ') !== -1) {
            var selectors = obj.trim().split(' ');
            for (var i = 0; i < selectors.length; i++) {
                var s = selectors[i];
                this.find(s);
            }
        } else {
            this.find(obj);
        }
    } else if (type(obj) == 'function') {
        //onDOMContentLoaded!!!!!
    }

};

//ID选择器
Base.prototype.getId = function (id, parent) {
    var parent = parent || doc;
    this.elements[0] = parent.getElementById(id);
    return this;
};

//class选择器
Base.prototype.getElementsByClassName = function (className, parent) {
    var parent = parent || doc;

    if (parent.getElementsByClassName) {
        this.elements = parent.getElementsByClassName(className);
    } else {


        var all = parent.getElementsByTagName('*'), i = 0, len = all.length, ele;

        for (; i < len; i++) {
            ele = all[i];

            if (ele.className === className) {
                this.elements.push(ele);
            }
        }
    }
    return this;
};

//标签选择器
Base.prototype.getTagName = function (tag, parent) {

    var parent = parent || doc;

    this.elements = parent.getElementsByTagName(tag);

    return this;
};

//属性选择器,形如<div title="abc"> <input type="text">
// div[title=abc] input[type=text]
Base.prototype.getAttr = function (tag,parent) {
   // var parent = parent || doc;

    //TODO::::::



};


Base.prototype.css = function (attr, value) {

    for (var i = 0; i < this.elements.length; i++) {
        if (typeof value === 'undefined') {

            return getStyle(this.elements[i]);
        }

        this.elements[i].style[attr] = value;
    }

    return this;

};

Base.prototype.html = function (value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (typeof value === 'undefined') {

            return this.elements[i].innerHTML;
        }

        this.elements.innerHTML = value;
    }


    return this;
};

Base.prototype.size = function () {
    return this.elements.length;
};

Base.prototype.eq = function (num) {
    if (num >= this.size()) {
        throw new Error('num more than size!!!!');
    }
    var temp = this.elements[num];
    this.elements = [];
    this.elements[0] = temp;
    return this;
};

Base.prototype.get = function (num) {
    if (num >= this.size()) {
        throw new Error('num more than size!!!!');
    }

    return this.elements[num];

};

Base.prototype.attr = function (attr, value) {

    for (var i = 0; i < this.elements.length; i++) {
        if (typeof value === 'undefined') {

            return this.elements[0].attributes[attr].nodeValue;
        }

        this.elements[i].attributes[attr].nodeValue = value;
    }

    return this;

};

Base.prototype.val = function () {
    return this.attr('value');
};


Base.prototype.find = function (selector) {

    var temp = this.elements, newArr = [], firstLetter = selector.substring(0, 1), otherLetter = selector.substring(1);

    if (temp.length == 0) {
        if (firstLetter === '#') {
            this.getId(otherLetter);
        } else if (firstLetter === '.') {
            this.getElementsByClassName(selector.substring(1));
        } else {
            this.getTagName(selector);
        }
        return this;
    }

    for (var i = 0; i < temp.length; i++) {
        var ele = temp[i];
        if (firstLetter === '#') {
            this.getId(otherLetter, ele);
            pushAllArr(newArr, this.elements);
        } else if (firstLetter == '.') {
            this.getElementsByClassName(otherLetter, ele);
            pushAllArr(newArr, this.elements);
        } else {
            this.getTagName(selector, ele);
            pushAllArr(newArr, this.elements);
        }

    }
    this.elements = newArr;
    return this;
};
