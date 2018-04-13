(function(the,lab)
{
    var dvc = global('AN_DEVICE') || '',
        app = local('an_app')     || '',
        evt = local('an_event')   || '',
        loc = local('an_locat')   || '',
        sta = local('an_state')   || '',
        log = [],
        lgf = (global('AN_LOG_PATH') || 'Tasker/log/' + lab.date('yyyyMM') + '.log');

    // wifi
    if(0);
    else if(sta == 'wifi.near')
    {
        // %WIFI=on/off
        log.push({state:sta,globals:lab.globals('WIFI','WIFII')});
    }
    else if(sta == 'wifi.connected')
    {
        log.push({state:sta,globals:lab.globals('WIFI','WIFII')});
    }

    // sms
    if(0);
    else if(evt == 'sms.received')
    {
        // %SMSRF / %SMSRN / %SMSRB / %MMSRS / %SMSRD / %SMSRT
        log.push({state:sta,locals:lab.locals('evtprm'),globals:lab.globals('SMSRF','SMSRN','SMSRB','MMSRS','SMSRD','SMSRT')});
    }
    else if(evt == 'sms.received.data')
    {
        // %evtprm3
        log.push({state:sta,locals:lab.locals('evtprm'),globals:lab.globals('SMSRF','SMSRN','SMSRB','MMSRS','SMSRD','SMSRT')});
    }

    // notification
    if(0);
    else if(evt == 'notification.received')
    {
        //
        log.push({state:sta,locals:lab.locals('evtprm'),globals:lab.globals('NTITLE')});
    }

    for(l in log)
    {
        writeFile(lgf,lab.date('yyyy-MM-dd hh:mm:ss') + JSON.stringify(l) + '\n',true);
    }

})
(typeof window !== "undefined" ? window : this,
{
    globals : function()
    {
        var arr = typeof arguments[0] == 'object' ? arguments[0] : arguments,
            map = [];
        for(k in (arr || []))
        {
            map[k] = global(k);
        }
        return map;
    },
    locals : function()
    {
        var arr = typeof arguments[0] == 'object' ? arguments[0] : arguments,
            map = [];
        for(k in (arr || []))
        {
            map[k] = local(k);
        }
        return map;
    },
    date : function(f,time)
    {
        var t = time instanceof Date ? time : new Date,
            o = {
              "M+" : this.getMonth() + 1,                   //month
              "d+" : this.getDate(),                        //day
              "h+" : this.getHours(),                       //hour
              "m+" : this.getMinutes(),                     //minute
              "s+" : this.getSeconds(),                     //second
              "q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
              "S"  : this.getMilliseconds()                 //millisecond
            };
        var week = {"0":"\u65e5","1":"\u4e00","2":"\u4e8c","3":"\u4e09","4":"\u56db","5":"\u4e94","6":"\u516d"};
        if(/(y+)/.test(f)) f = f.replace(RegExp.$1,(this.getFullYear() + '').substr(4 - RegExp.$1.length));
        if(/(W+)/.test(f)) f = f.replace(RegExp.$1,((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : '') + week[  this.getDay() + '']);
        for(var k in o) if(new RegExp('(' + k + ')').test(f)) f = f.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :('00' + o[k]).substr(('' + o[k]).length));
        return f;
    },
    _ : null
});