YL.onLoad(function () {
  // 读取url中load参数，如localhost/ylui/index.html?load=basic
  var load = Yuri2.parseURL().params.load;
  var file;
  // 当load === 'ylui-storage'时，尝试加载浏览器缓存
  if (load === YL.static.localStorageName && localStorage.getItem(YL.static.localStorageName)) {
    YL.init();
    return;
  } else if (load === YL.static.localStorageName) {
    file = 'basic';
  }
  // 从json文件读取
  file = file || load || 'basic';
  var save = /^\w+$/.test(file) ? './saves/' + file + '.json' : file;
  Yuri2.loadContentFromUrl(save, 'GET', function (err, text) {
    if (!err) {
      var data = JSON.parse(text);
      YL.init(data);
    } else {
      alert('YLUI读取配置错误，初始化失败');
    }
  });
});