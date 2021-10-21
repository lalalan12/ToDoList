$(function () {
    load();
    //表单回车存储数据
    $('nav input').on('keyup', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val().trim() != '') {
                var datas = getData();
                datas.push({ title: $(this).val(), done: false });
                saveData(datas);
                load();
            }else {
                alert('请输入你需要做的事情！')
            }
            $(this).val('');
        }
    });
    //删除数据
    $('ul,ol').on('click','a', function () {
        var datas = getData();
        var index = $(this).attr('index');
        datas.splice(index,1);
        saveData(datas);
        load();
    })
    //是否完成
    $('ul,ol').on('click', 'input', function () {
        var datas = getData();
        var index = $(this).siblings('a').attr('index');
        datas[index].done = $(this).prop('checked');
        saveData(datas);
        load();
    })
    //取数据
    function getData() {
        var datas = localStorage.getItem('todolist');
        if (datas !== null) {
            return JSON.parse(datas);//JSON.parse() 将字符串转换为对象数组
        } else {
            return [];
        }
    };
    // 存数据
    function saveData(datas) {
        localStorage.setItem('todolist',JSON.stringify(datas));//JSON.stringify() 将对象数组转换为字符串存储，本地存储只能存储字符串
    };
    //添加li
    function load() {
        var datas = getData();
        $('ul,ol').empty();
        var doing = 0;//正在进行个数
        var d = 0;//已完成个数
        $.each(datas, function (i, n) {
            if (n.done) {
                 $('ol').prepend('<li><input type="checkbox" checked="checked">' + n.title + '<a href="javascript:;" index=' + i + '></a></li>');
                d++;
            } else {
                $('ul').prepend('<li><input type="checkbox">' + n.title + '<a href="javascript:;" index=' + i + '></a></li>');
                doing++;
            }
        });
        $('.doing-span').text(doing);
        $('.d-span').text(d);
    };
})