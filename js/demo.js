console.log(Sizzle('#box'));
console.log(Sizzle('*').length);
var all = Sizzle('*');

var i = 0, len = all.length;

for (; i < len; i++) {
    console.log(all[i].nodeType);  // 1
}

//console.log(typeof Node == 'undefined');

if (typeof Node == 'undefined') { //没有Node属性的兼容性代码

    console.log('donot have node'); //IE8-

    Node = {};

    Node.ELEMENT_NODE = 1;
    Node.TEXT_NODE = 3;
    Node.DOCUMENT_NODE = 9;
    Node.COMMENT_NODE = 8;
    Node.DOCUMENT_FRAGMENT_NODE = 11;
    Node.ATTRIBUTE_NODE = 2;
}


console.log(Node.ELEMENT_NODE);     //1
console.log(Node.TEXT_NODE);        //3
console.log(Node.DOCUMENT_NODE);     // 9
console.log(Node.COMMENT_NODE);      //8
console.log(Node.DOCUMENT_FRAGMENT_NODE); //11
console.log(Node.ATTRIBUTE_NODE);     //2

//说明Sizzle不选择注释元素

var doc = window.document,
    allNode = doc.getElementsByTagName('*'),
    i = 0, len = allNode.length;

for (; i < len; i++) {
    console.log(allNode[i].nodeType == Node.ELEMENT_NODE);     //all is true
}


console.log(Sizzle('html'));
console.log(Sizzle('body'));

console.log(Sizzle('#form input'));
console.log(Sizzle('#form input[name=username]'));
console.log(Sizzle('#form input[name=username]')[0].attributes['placeholder'].nodeValue);