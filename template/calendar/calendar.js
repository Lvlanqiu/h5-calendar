/*
 * @Author: Lvlanqiu
 * @Date: 2019-2-28
 */
class Calendar{
	constructor(){
		/*农历部分*/
		this.cYear,this.cMonth,this.cDay,this.theDate;
		this.calendarData=new Array(130);
		this.madd=new Array(12);
		this.GRIDMONTH = 42;//按月展示共42格
		this.GRIDWEEK = 7;//按周展示共7格
		this.tgString="甲乙丙丁戊己庚辛壬癸";
		this.dzString="子丑寅卯辰巳午未申酉戌亥";
		this.numString="一二三四五六七八九十";
		this.monString="正二三四五六七八九十冬腊";
		this.sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
		//可以使用到2050年
		this.calendarData = new Array(
			0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,
			0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,
			0x61B4A,0xB55,0x56A,0x4155B,0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,
			0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,
			0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,
			0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,
			0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,
			0x497,0x64B,0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,
			0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,
			0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95,
			0x6aa0,0xad50,0x4da8,0x4b60,0x9570,0xa4e0,0xd260,0xe930,0xd530,0x5aa0,
			0x6b50,0x96d0,0x4ae8,0x4ad0,0xa4d0,0xd258,0xd250,0xd520,0xdaa0,0xb5a0,
			0x56d0,0x4ad8,0x49b0,0xa4b8,0xa4b0,0xaa50,0xb528,0x6d20,0xada0,0x55b0);
		this.madd[0]=0;
		this.madd[1]=31;
		this.madd[2]=59;
		this.madd[3]=90;
		this.madd[4]=120;
		this.madd[5]=151;
		this.madd[6]=181;
		this.madd[7]=212;
		this.madd[8]=243;
		this.madd[9]=273;
		this.madd[10]=304;
		this.madd[11]=334;
		
		this.head = {
			y: null,
			m: null,
		};
		this.foot = {
			y: null,
			m: null,
		}
		
		this.holidays={
			'1-1': '元旦',
			'5-1': '劳动节',
			'3-8': '妇女节',
			'5-4': '青年节',
			'5-30': '世界无烟日',
			'6-1': '儿童节',
			'7-1': '建党节',
			'8-1': '建军节',
			'9-10': '教师节',
			'10-1': '国庆节'
		};
	}
	/*
	 * 计算天数
	 */
	getBit(m,n){
		return (m>>n)&1;
	}
	/*
	 * 计算农历日期
	 */
	e2c(){
		this.theDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
		var total,m,n,k;
		var isEnd=false;
		var tmp=this.theDate.getYear();
		if(tmp<1900){
		  tmp+=1900;
		}
		total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+this.madd[this.theDate.getMonth()]+this.theDate.getDate()-38;
		if(this.theDate.getYear()%4==0&&this.theDate.getMonth()>1) {
		  total++;
		}
		for(m=0;;m++){
		  k=(this.calendarData[m]<0xfff)?11:12;
		  for(n=k;n>=0;n--){
		  if(total<=29+this.getBit(this.calendarData[m],n)){
		   isEnd=true; break;
		  }
		  total=total-29-this.getBit(this.calendarData[m],n);
		  }
		  if(isEnd) break;
		}
		this.cYear=1921 + m;
		this.cMonth=k-n+1;
		this.cDay=total;
		if(k==12){
		  if(this.cMonth==Math.floor(this.calendarData[m]/0x10000)+1){
		  this.cMonth=1-this.cMonth;
		  }
		  if(this.cMonth>Math.floor(this.calendarData[m]/0x10000)+1){
		  this.cMonth--;
		  }
		}
	}
	/*
	 * 格式化农历结果
	 */
	getcDateString(){
		var tmp="";
		tmp+=this.tgString.charAt((this.cYear-4)%10);
		tmp+=this.dzString.charAt((this.cYear-4)%12);
		tmp+="(";
		tmp+=this.sx.charAt((this.cYear-4)%12);
		tmp+=")年 ";
		if(this.cMonth<1){
		  tmp+="(闰)";
		  tmp+=this.monString.charAt(-this.cMonth-1);
		}else{
		  tmp+=this.monString.charAt(this.cMonth-1);
		}
		tmp+="月 ";
		tmp+=(this.cDay<11)?"初":((this.cDay<20)?"十":((this.cDay<30)?"廿":"三十"));
		if (this.cDay%10!=0||this.cDay==10){
		  tmp+=this.numString.charAt((this.cDay-1)%10);
		}
		return tmp;
	}
	/*
	 * 农历日期入口
	 * @return: 辛丑(牛)年 (闰)月 廿三
	 */
	getLunarDay(solarYear,solarMonth,solarDay){
		if(solarYear<1921 || solarYear>2050){
			return "";
		}else{
		  solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;
		  this.e2c(solarYear,solarMonth,solarDay);
		  var arr = this.getcDateString().split(' ');
		  return (arr[2]==="初一")?arr[1]:arr[2];
		}
	}
	/*
	 * 闰年
	 */
	isLeapYear(y){
		if(y%400 === 0 || ( y%4 === 0 && y%100 != 0)){
			return true;
		}
		return false;
	}
	/*
	 * 判断某年某月某日是星期几
	 * 基姆拉尔森计算公式
	 */
	caculateWeekDay(y, m, d){
		var alldays = 0;
		for (var i = 1; i < y; i++) {
			if (this.isLeapYear(i)) {
				alldays += 366;
			} else {
				alldays += 365;
			}
		}
		var days = (this.isLeapYear(y)) ? 29 : 28;
		switch (m - 1) {
			case 11: alldays += 30;
			case 10: alldays += 31;
			case 9: alldays += 30;
			case 8: alldays += 31;
			case 7: alldays += 31;
			case 6: alldays += 30;
			case 5: alldays += 31;
			case 4: alldays += 30;
			case 3: alldays += 31;
			case 2: alldays += days;
			case 1: alldays += 31;
		}
		alldays += d;
		return (alldays % 7);
	}
	/*
	 * 获得某年某月有多少天
	 */
	caculateMonthDays(y, m){
		var result;
		switch (m){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				result = 31;
				break;
			case 2:
				result = this.isLeapYear(y)?29:28;
				break;
			default:
				result = 30;
				break;
		}
		return result;
	}
	/*
	 * 获得公历日期入口
	 */
	getMonthDays(y,m){
		var days = this.caculateMonthDays(y,m);
		var firstDay = this.caculateWeekDay(y,m,1);
		
		var prvList = this.getPrvMonthDays(y,m,firstDay);
		var nextList = this.getNextMonthDays(y,m,firstDay+days);
		var result = [];
		while(days>0){
			var lunar = this.getLunarDay(y,m,days);
			var week = this.caculateWeekDay(y,m,days);
			var rest = (week===0||week===6)?true:false;
			var holiday = this.holidays[m+'-'+days]||'';
			result.unshift({
				year: y,
				month: m,
				day: days,
				week: week,//星期
				lunar: lunar,
				active: true,
				rest: rest,
				isSelect: false,
				content: null,
				holiday: holiday,
				count:null
			});
			days--;
		}
		result = prvList.concat(result).concat(nextList);
		return result;
	}
	/*
	 * 初始化日历
	 */
	init(){
		var d = new Date();
		var y = d.getFullYear(),
		m = d.getMonth()+1;
		var list = this.getMonthDays(y,m);
		this.head = this.prev(y,m);
		this.foot = this.next(y,m);
		var p_list = this.getMonthDays(this.head.y,this.head.m);
		var n_list = this.getMonthDays(this.foot.y,this.foot.m);
		var result = [];
		result.push(p_list);
		result.push(list);
		result.push(n_list);
		return result;
	}
	
	domInit(){
		var d = new Date();
		var y = d.getFullYear(),
		m = d.getMonth()+1;
		var dom = this.getDom(this.getMonthDays(y,m),y,m);
		this.head = this.prev(y,m);
		this.foot = this.next(y,m);
		var p_dom = this.getDom(this.getMonthDays(this.head.y,this.head.m),this.head.y,this.head.m);
		var n_dom = this.getDom(this.getMonthDays(this.foot.y,this.foot.m),this.foot.y,this.foot.m);
		var result = p_dom+dom+n_dom;
		document.querySelector('#g-calendar-dom').innerHTML=result;
	}
	
	prev(y,m){
		if(m===1){
			m = 12;
			y --;
		}else{
			m --;
		}
		return {"y":y,"m":m};
	}
	next(y,m){
		if(m===12){
			m = 1;
			y ++;
		}else{
			m ++;
		}
		return {"y":y,"m":m};
	}
	/*
	 * slide 的 dom 结构
	 */
	getDom(result,y,m){
		var dom = `<div data-year="`+y+`" data-month="`+m+`" class="swiper-slide">`;
		result.forEach(function(item,index){
			dom += `<div class="`;
			if(item.active){
				dom += `g-calendar-item `;
			}
			if(item.holiday){
				dom+=`g-days color-def g-holiday" data-holiday="`+item.holiday+`">`;
			}else{
				dom+=`g-days color-def">`;
			}
			dom += `<div class="g-item">`;
			if(!item.active){
				dom += (`<span class="color-promt">`+item.day+`</span><span class="font22 color-promt">`+item.lunar+`</span>`);
				
			}else{
				if(item.rest){
					dom += (`<span class="color-red">`+item.day+`</span>`);
				}else{
					dom += (`<span>`+item.day+`</span>`);
				}
				dom+= `<span class="font22 color-grey">`+item.lunar+`</span>`;
			}
			dom += `</div></div>`;
		})
		dom += `</div>`;
		return dom;
	}
	/*
	 * 更新头结点 并返回新头结点数据
	 */
	updateHead(){
		this.head = this.prev(this.head.y,this.head.m);
		return this.getMonthDays(this.head.y,this.head.m);
	}
	/*
	 * 更新尾结点
	 */
	updateFoot(){
		this.foot = this.next(this.foot.y,this.foot.m);
		return this.getMonthDays(this.foot.y,this.foot.m);
	}
	/*
	 * 获得上一个月的补充数据
	 */
	getPrvMonthDays(y,m,num){
		if(num===0){
			return [];
		}
		var prev = this.prev(y,m);
		y=prev.y;
		m=prev.m;
		var days = this.caculateMonthDays(y,m);
		var result = [];
		while(num>0){
			var lunar = this.getLunarDay(y,m,days-num+1);
			var week = this.caculateWeekDay(y,m,days-num+1);
			result.push({
				year: y,
				month: m,
				day: days-num+1,
				week: week,//星期
				lunar: lunar,
				active: false,
			});
			num--;
		}
		return result;
	}
	/*
	 * 获得下一个月的补充数据
	 */
	getNextMonthDays(y,m,num){
		num = this.GRIDMONTH - num;
		if(num===0){
			return [];
		}
		var next = this.next(y,m);
		y=next.y;
		m=next.m;
		var result = [];
		while(num>0){
			var lunar = this.getLunarDay(y,m,num);
			var week = this.caculateWeekDay(y,m,num);
			result.unshift({
				year: y,
				month: m,
				day: num,
				week: num,//星期
				lunar: lunar,
				active: false,
			});
			num--;
		}
		return result;
	}
	/*
	 * 更新头部年月数据
	 */
	updateTitle(){
		var activeDom = document.querySelector('.swiper-slide.swiper-slide-active');
		vm.year = activeDom.dataset.year;
		vm.month = activeDom.dataset.month;
	}
}