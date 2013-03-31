//console.log($('#box').css('background', 'red').html());

var inputs = $('#form').find('.validate').find('input');


console.log($('#form').find('.validate').find('input').size());

for (var i = 0; i < inputs.size(); i++) {

    console.log(inputs.get(i));

}

console.log($('#form input').attr('placeholder'));

console.log($('input'));

console.log($('.validate').get(0).innerHTML);
console.log($('.validate').eq(0).html());