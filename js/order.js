$(document).ready(function() {
       if(typeof(Storage) !== "undefined") {
			  order_json=JSON.parse(sessionStorage.ord);
			 	console.log(order_json);
			 	var i=0;
			 	var good_box=$('.order_good_box');
			 	var all_money=$('.big_money');
			 	var all_num=$('.goods_num');

			 for ( i=0; i<order_json.data.length; i++) {
			 	var good_string="<div class='car_food clear'><span class='float_l'>"+order_json.data[i].name+"</span><div class='all_money_box'><sapn>￥</sapn><span class='chose_all_money'>"+order_json.data[i].allmoney+"</span></div><div class='order_add_cut'><input type='text' disabled='disabled' name='food_num_input' class='input_food_num' value='"+order_json.data[i].num+"'></div></div>";
					good_box.append(good_string);	
				}

				all_money.html(order_json.cost_money+9);
				all_num.html(order_json.all_num);
			 }
		else {
			 	alert("该浏览器不支持H5存储");
			 }	
});
