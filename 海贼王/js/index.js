// top 栏里的开关灯
var light = document.getElementById('light');
// var bg = document.querySelector('.top');
var flag = 0;
light.onclick = function () {
    if (flag == 0) {
        document.body.style.backgroundColor = 'black';
        flag = 1;
    } else {
        document.body.style.backgroundColor = '';
        flag = 0;
    }
}


// nav 栏里的热搜行
var trs = document.querySelector('.font').querySelectorAll('p');
// 利用循环绑定注册事件
for (var i = 0; i < trs.length; i++) {
    //鼠标经过事件 onmouseover 
    trs[i].onmouseover = function () {
        this.style.backgroundColor = '#E8EFF5';
    }
    // 4.鼠标离开事件 onmouseout
    trs[i].onmouseout = function () {
        this.style.backgroundColor = '';
    }
}
// nav 栏里的搜索框
var input = document.querySelector('.up').querySelector('input');

input.onfocus = function () {
    if (input.value === '请输入搜索内容') {
        input.value = '';
    }
    // 获得焦点将文本颜色变黑
    input.style.color = '#333';
}

input.onblur = function () {
    if (input.value === '') {
        input.value = '请输入搜索内容';
    }
    // 失去焦点颜色变浅
    input.style.color = '#999';
}

//banner栏 轮播图
window.addEventListener('load', function () {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标经过时 停止定时器
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    // 鼠标离开 开启定时器
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li 
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // num = circle = index;

            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    //6.克隆第一张图 (li) 放到 ul 中最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮 图片实现滚动
    var num = 0;
    // circle 控制小圆圈的播放 flag为节流阀
    var circle = 0;
    var flag = true;

    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            // 如果走到最后一张图 ul要快速复原恢复到第一张图
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            // 8.点击右侧按钮 小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4说明走到最后我们克隆的这张图片了
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });

    // 9.左侧按钮做法
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到最后一张图 ul要快速复原恢复到第一张图
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle--;
            // 如果circle < 0 说明第一张图的小圆圈要变到最后一张小圆圈
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈current类名
        ol.children[circle].className = 'current';
    }
    // // 10.自动播放轮播图
    timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})




// table栏 切换
var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var items = document.querySelectorAll('.item');

for (var i = 0; i < lis.length; i++) {
    // 开始给5个小 li 设置索引 方便后续点击事件对应内容
    lis[i].setAttribute('index', i);
    lis[i].onclick = function () {
        // 1.上面的模块卡     排他思想
        for (var i = 0; i < lis.length; i++) {
            // 将所有li的 类名 current清空
            lis[i].className = '';
        }
        // 将点击到的 li 赋予 类名current
        this.className = 'current';
        // 2.下面的显示内容模块
        // 拿到序号
        var index = this.getAttribute('index');
        // 将此item显示
        // items[index].style.display = 'block';

        for (var i = 0; i < items.length; i++) {
            // 隐藏所有 item 的style标签 none
            items[i].style.display = 'none';
        }
        // 将自身对应的 item 显示block出来
        items[index].style.display = 'block';
    }
}

// 点击图片放大
var lis2 = document.querySelectorAll('.li');
var box = document.getElementById('box');
//遍历所有的li,单击的是哪个li里的图片src 。
//	创建div  className='mark' 追加到box
//	创建img  src          className  追加到box
//	创建span  innerHTML=X  追加到box
for (var i = 0; i < lis.length; i++) {

    lis2[i].onclick = function () {
        //console.log(this)
        var newDiv = document.createElement('div');
        newDiv.className = 'mark';
        box.appendChild(newDiv);
        var newImg = document.createElement('img');
        newImg.className = 'pic';
        newImg.src = this.getElementsByTagName('img')[0].src;
        // newImg.src=this.childNodes[0].src;
        box.appendChild(newImg);
        var newSection = document.createElement("section");
        newSection.innerHTML = 'X';
        box.appendChild(newSection);

        newSection.onclick = function () {
            box.removeChild(newDiv);
            box.removeChild(newSection);
            box.removeChild(newImg);
        }
    }
}
