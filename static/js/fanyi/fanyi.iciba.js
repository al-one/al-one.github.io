(function(doc)
{
  var url = '//open.iciba.com/huaci/',
      box = doc.getElementsByTagName('body')[0] || doc.createElement('div'),
      div = doc.createElement('div'),
      htm = '';

  htm = '<link rel="stylesheet" href="' + url + 'mini.css">\n'
      + '<div id="Jihuajiyi" style="display:none;"></div>\n'
      + '<div id="icIBahyI-yi" style="display:none;"></div>\n'
      + '<div id="icIBahyI-main_box" style="display:none;">\n'
      + '  <div class="icIBahyI-main_title" id="icIBahyI-main_title">\n'
      + '    <a href="javascript:;" id="icIBahyI-gb" class="icIBahyI-gb" title="关闭"></a>\n'
      + '    <a href="javascript:;" id="icIBahyI-dq" class="icIBahyI-dq2" title="点击固定结果"></a>\n'
      //+ '    <a href="javascript:;" id="icIBahyI-sz" class="icIBahyI-sz" title="设置"></a>\n'
      + '    即划即译\n'
      + '    <div class="icIBahyI-sz_list" id="icIBahyI-sz_list">\n'
      + '      <a href="javascript:;">关闭即划即译</a>\n'
      + '      <a href="#" target="_blank">反馈</a>\n'
      + '      <a href="#" style="border:none;" target="_blank">帮助</a>\n'
      + '      <span class="icIBahyI-j icIBahyI-tl"></span>\n'
      + '      <span class="icIBahyI-j icIBahyI-tr"></span>\n'
      + '      <span class="icIBahyI-j icIBahyI-bl"></span>\n'
      + '      <span class="icIBahyI-j icIBahyI-br"></span>\n'
      + '    </div>\n'
      + '  </div>\n'
      + '  <div class="icIBahyI-search">\n'
      //+ '    <a href="#" class="prev"></a>\n'
      //+ '    <a href="#" class="next"></a>\n'
      + '    <input id="ICIBA_HUAYI_input" name="" type="text" onkeydown="ICIBA_HUAYI_KEYDOWN(event);">\n'
      + '    <a href="javascript:;" class="icIBahyI-sear" onclick="ICIBA_HUAYI_searchword()">查 词</a>\n'
      + '  </div>\n'
      + '  <span class="icIBahyI-contTop"></span>\n'
      + '  <div class="icIBahyI-loading" id="loading"></div>\n'
      + '  <div class="icIBahyI-main_cont" id="icIBahyI-main_cont"></div>\n'
      + '  <div class="icIBahyI-CB" id="icIBahyI-scbiframe" style="display:none;"></div>\n'
      + '  <div id="ICIBA_TOO_LONG" style="height:150px" class="icIBahyI-footer">您划取的内容太长，建议您去爱词霸<a href="http://fy.iciba.com">翻译</a>页面。</div>\n'
      //+ '  <div class="icIBahyI-down"><a href="http://ciba.iciba.com/" onclick="clickCountIndex(26)"  target="_blank">搞定邮箱/文档/pdf取词？下载词霸PC版</a></div>\n'
      + '  <span class="icIBahyI-contB"></span>\n'
      + '</div>\n'
      //+ '<script src="' + url + 'dict.php" charset="utf-8"></script>\n'
      + '<object style="height:0px;width:0px;overflow:hidden;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="0" height="0" id="asound_hanci" align="absmiddle">\n'
      + '  <param name="allowScriptAccess" value="always">\n'
      + '  <param name="movie" value="http://www.iciba.com/top/asound.swf">\n'
      + '  <param name="quality" value="high">\n'
      + '  <embed src="//www.iciba.com/top/asound.swf" quality="high" width="0" height="0" name="asound_hanci" align="absmiddle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">\n'
      + '</object>\n'
      + '<div class="icIBahyI-USER_LOGIN" id="icIBahyI-USER_LOGIN" style="display:none;"></div>\n'
      //+ '<script src="' + url + 'ICIBA_HUACI_COM.js" charset="utf-8"></script>';

  function getScript(src,cbk)
  {
    var doc = document,
        box = doc.body || doc.getElementsByTagName('head')[0] || doc.documentElement,
        obj = doc.createElement('script');
    obj.async = true;
    obj.src   = src;
    if(typeof cbk === 'function') obj.onload = obj.onreadystatechange = function(_,isAbort)
    {
      if(isAbort || !obj.readyState || /loaded|complete/.test(obj.readyState))
      {
        obj.onload = obj.onreadystatechange = null;
        if(!isAbort) cbk(obj);
      }
    }
    box.appendChild(obj);
    return obj;
  }

  window.iciba_huaci_url = url;
  window.ICIBA_HUAYI_ALLOW = 1;

  div.innerHTML = htm;
  box.appendChild(div);
  getScript(url + 'dict.php',function()
  {
    getScript(url + 'ICIBA_HUACI_COM.js');
  });
})(document);