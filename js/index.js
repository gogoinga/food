$(document).ready(function(){
	var tab_li=$('.tab_name');
	var change_con=$('.box_left').children('div');

	tab_li.each(function(index, el) {
		tab_li.eq(index).on('click', function(event) {
			event.preventDefault();
			for (var i = 0; i < tab_li.length; i++) {
				tab_li.eq(i).removeClass('active');
				change_con.eq(i).fadeOut('fast');
			}
			$(this).toggleClass('active');
			change_con.eq(index).fadeToggle('fast');
		});
	});

	var pin_tab=$('.pin_tab');
	var change_ul=$('.change_ul');
	pin_tab.each(function(index, el) {
		pin_tab.eq(index).on('click', function(event) {
			event.preventDefault();
			
			for (var i = 0; i < tab_li.length; i++) {
				pin_tab.eq(i).removeClass('active_b');
				change_ul.eq(i).fadeOut('fast');
			}
				pin_tab.eq(index).addClass('active_b');
				change_ul.eq(index).fadeToggle('fast');
		});
	});

//购物车代码开始
	var obj={};
	obj.data=[];
	obj.all_num=0;
	obj.cost_money=0;
	console.log('初始商品对象')
	console.log(obj);
	var buy_but=$('.buy_button');
	var food_num=$('.food_num');
	var all_food_money=$('.all_food_money');
	var i=0;	//代表进入json对象的序列号，也代表有多少个商品对象
	var n=0;
	var ban=false;
buy_but.each(function(index, el) {
		buy_but.eq(index).on('click',function(event) {
		event.stopPropagation(); 
		if($(this).attr('ban')==='true'){//判断购买按钮是否已点击，点了的话不能再点
			return null;
		}
		$(this).attr('ban', false);

		$(this).attr('index', i);//判断是否点击同一个菜
		$(this).text('已加入购物车');
		$(this).css('background','#999999');
		var food_name=$(this).siblings('.food_name').text();
		var food_money=parseInt($(this).siblings('.money').text());
		
		obj.data[i]={};
		obj.data[i].name=food_name;
		obj.data[i].first_money=food_money;
		obj.data[i].allmoney=food_money;
		obj.data[i].num=1;
		obj.data[i].index=i;
		obj.all_num=1;
		obj.cost_money=food_money;
		
		var car_html="<div class='car_food clear'><span class='float_l'>"+obj.data[i].name+"</span><div class='all_money_box'>￥<span class='chose_all_money'>"+obj.data[i].allmoney+"</span></div><div class='add_cut'><i class='cut'>-</i><input type='number' name='food_num_input' class='input_food_num' value='"+obj.data[i].num+"'><i class='add'>+</i></div></div>";
		
			$('.car_bottom').before(car_html);
			$('.add').eq(i).attr('num',i);
			$('.cut').eq(i).attr('num',i);

	if(i>0){
			obj.cost_money=0;
			obj.all_num=0;
		$.each(obj.data,function(index, el) {
			obj.cost_money+=obj.data[index].allmoney;
			obj.all_num+=obj.data[index].num;
			$('.add').eq(index).attr('num',index);
			$('.cut').eq(index).attr('num',index);
		});
		all_food_money.text(obj.cost_money);
		food_num.text(obj.all_num);
	}
	else{
		all_food_money.text(obj.cost_money);
		food_num.text(obj.all_num);
	}
		$(this).attr('ban', true);//判断按钮是否已购买
		i++;
});//赋予按钮点击事件结束
	}); //按钮的each遍历结束
//减按钮事件
	$('.buy_car').on('click','.cut',function(event) {
				event.stopPropagation();
				obj.all_num=0;
				obj.cost_money=0;
		var cut_num=obj.data[$(this).attr('num')].num=obj.data[$(this).attr('num')].num-1;//减改变对象数量属性值
		var cut_money=obj.data[$(this).attr('num')].allmoney = obj.data[$(this).attr('num')].first_money*cut_num;//减改变对象金钱属性
		var cut_food_money=$(this).parents('.add_cut').siblings('.all_money_box').find('.chose_all_money');//放总价的标签盒子

		        if(cut_num<0){

		            $("[index='"+$(this).attr('num')+"']").attr('ban', false);//判断是否点击同一个菜
					$("[index='"+$(this).attr('num')+"']").text('加入购物车');
					$("[index='"+$(this).attr('num')+"']").css('background','#0089dc');
					
					$(this).parents('.car_food').remove();
					obj.data[$(this).attr('num')].num=0;//··把货物数量清零
					
					obj.cost_money=0;
					obj.all_num=0;

					obj.data[$(this).attr('num')].num=0;//把数量为零的商品从对象列表中清除
					obj.data[$(this).attr('num')].allmoney=0;
					
					$.each(obj.data,function(index, el) {
						obj.cost_money+=obj.data[index].allmoney;
						obj.all_num+=obj.data[index].num;
					});
					all_food_money.text(obj.cost_money);
					food_num.text(obj.all_num);
					i--;	
		        } 
		        else{
		        		cut_food_money.text(cut_money); //单个菜的总价
						$(this).siblings('.input_food_num').val(cut_num); //单个菜的数量

				$.each(obj.data,function(index, el) {
						obj.cost_money+=obj.data[index].allmoney;//遍历一遍json对象里一共有商品价钱总价
						obj.all_num+=obj.data[index].num;//遍历一遍json对象里一共有多少商品数量			
					});
					all_food_money.text(obj.cost_money);
					food_num.text(obj.all_num);
		        }
			});
//············绑定加事件
	$('.buy_car').on('click','.add',function(event) {
			event.stopPropagation();
				obj.all_num=0;//每次加减都重置商品总数
				obj.cost_money=0;	//每次加减都重置商品总价钱
				
		var add_num=obj.data[$(this).attr('num')].num=obj.data[$(this).attr('num')].num+1;//增改变json属性值
				food_num.text(add_num);
		var add_money=obj.data[$(this).attr('num')].allmoney = obj.data[$(this).attr('num')].first_money*add_num;//增改变对象金钱属性
		var add_food_money=$(this).parents('.add_cut').siblings('.all_money_box').find('.chose_all_money');	

				add_food_money.text(add_money);//单个货物总价
					$(this).siblings('.input_food_num').val(add_num);//单个菜的数量

					$.each(obj.data,function(index, el) {
						obj.cost_money+=obj.data[index].allmoney;
						obj.all_num+=obj.data[index].num;
					});
					all_food_money.text(obj.cost_money);
					food_num.text(obj.all_num);
		});
//清空购物车按钮
	$('.clear_all').on('click',function(event) {
		event.preventDefault();
		i=0;
		var long=obj.data.length;
		obj.data.splice(0,long);
		obj.cost_money=0;
		obj.all_num=0;
		$('.car_food').remove();
		buy_but.text('加入购物车');
		buy_but.css('background','#0089dc');
		buy_but.attr('ban', false);
		all_food_money.text(obj.cost_money);
		food_num.text(0)
	});
//结算按钮
	$('.play_button').on('click', function(event) {
		
			var order={};
			var o=0;
			order.data=[];
			order.cost_money=obj.cost_money;
			order.all_num=obj.all_num;
		$.each(obj.data,function(index, el) {
			if(obj.data[index].num!=0){
				order.data[o]=obj.data[index];
				o++;
			}
		});
			console.log('最后输出的订单对象');
			console.log(order);

	if(obj.data.length==0){

			event.preventDefault();
			alert('请至少选取一样食物');

		}
		else{
			var order_string=JSON.stringify(order);

			 if(typeof(Storage) !== "undefined") {
			 	sessionStorage.ord=order_string;
			 	console.log(order_string);
			 }
			 else {
			 	alert("该浏览器不支持H5存储");
			 }
			
		}
	});
})
