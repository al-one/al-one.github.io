(function(global,factory,ready)
{
  factory(global,ready);
})

(typeof window !== 'undefined' ? window : this,

function(window,ready)
{
  var app =
  {
    cdn : '//cdn.bootcss.com/',
    ready : ready,
    getScript : function(src,cbk)
    {
      var doc = window.document,
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
    },
    null : null
  };

  window.JSON || app.getScript(app.cdn + 'json2/20150503/json2.min.js');
  window.jQuery ? jQuery(app.ready) : app.getScript(app.cdn + 'jquery/1.11.1/jquery.min.js',function()
  {
    window.jQuery && jQuery(app.ready);
  });
},

function($)
{

  var box = $('.anfy-box'),
      getapi = function(url,cfg)
  {
    if(typeof url === 'object')
    {
      cfg = url;
      url = cfg.url || '';
    }
    cfg || (cfg = {});
    cfg.dataType || (cfg.dataType = 'jsonp');
    var typ = cfg.retType || 'json';
    cfg.url = 'http://getapi.sinaapp.com/http/?callback=?&type=' + typ + '&url=' + encodeURIComponent(url);
    if(cfg.data)
    {
      cfg.url += '&data=' + encodeURIComponent(typeof cfg.data === 'object' ? $.param(cfg.data) : cfg.data);
      delete cfg.data;
    }
    return $.ajax(cfg);
  };

  $('body')
  .on('mouseup',function(evt)
  {
    var the = $(this),
        sel = window.getSelection(),
        txt = $.trim(sel.toString()),
        ost = the.offset(),
        lft = evt.pageX - ost.left,
        top = evt.pageY - ost.top;
    if(txt.length > 1)
    {
      getapi(
      {
        url:'http://fanyi.baidu.com/transapi?' + $.param({from:'auto',to:'auto',source:'txt',query:txt}),
        retType:'json2jsonp',
        dataType:'json'
      })
      .done(function(data,textStatus,jqXHR)
      {
        var dat = data || {},
            dls = dat.data || [],
            res = typeof dat.result === 'object' ? dat.result : $.parseJSON(dat.result || '{}');
        console.log(res,dls);
        box.find('.anfy-hd').text(res.src || (dls[0] || {}).src || '');
        box.find('.anfy-bd').html('<ul></ul>');
        if(dls[0])
        {
          $('<li>' + dls[0].dst + '</li>').appendTo(box.find('.anfy-bd ul'));
        }
        if(res.content) $.each(res.content || [],function(i,v)
        {
          $.each(v.mean || [],function(mi,mv)
          {
            var rls = ['<li>'];
            rls.push(mv.pre || '');
            rls.push(' ');
            rls.push(Object.keys(mv.cont || {}).join('; '));
            rls.push('</li>');
            $(rls.join('')).appendTo(box.find('.anfy-bd ul'));
          });
        });
        box.stop().css({top:top + 14,left:lft}).show();
      })
      .fail(function(jqXHR,textStatus,errorThrown)
      {
        console.log('error',argument);
      });
    }
  })
  .on('click',function(evt)
  {
    if(!$(evt.target).closest('.anfy-box').length) box.hide(100);
  });

  if(!box.length)
  {
    box = $('<div class="anfy-box"><div class="anfy-hd"></div><div class="anfy-bd"></div></div>').appendTo('body');
    $('head').append('<style>.anfy-box { position:absolute; top:0; left:0; display:none; max-width:480px; padding:5px; border:1px solid #dcdcdc; border:1px solid rgba(0,0,0,.2); background:#fff; transition:opacity .218s; box-shadow:0 2px 4px rgba(0,0,0,.2); font-size:12px; line-height:20px; z-index:1; } .anfy-box ul { margin:0; padding-left:20px; }</style>');
  }
});