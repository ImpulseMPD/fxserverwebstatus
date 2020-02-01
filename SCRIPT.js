$( document ).ready(function() {
function ping(ip, callback) {
/** DO NOT CHANGE ANYTHING HERE **/
    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('Server Is Online');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('Online', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('Offline');
            }
        }, 1500);
    }
}
var PingModel = function (servers) {
    var self = this;
    var myServers = [];
    ko.utils.arrayForEach(servers, function (location) {
        myServers.push({
            name: location,
            status: ko.observable('unchecked')
        });
    });
    self.servers = ko.observableArray(myServers);
    ko.utils.arrayForEach(self.servers(), function (s) {
        s.status('checking');
        new ping(s.name, function (status, e) {
            s.status(status);
        });
    });
};
/** Update the below line to your desired server location // if you have setup DNS for your server you can have example.com:portnumber  NOTE: PORT NUMBER FOR WEB ADMIN**/
var komodel = new PingModel(['000.0.000.000:30120'
  
    ]);
ko.applyBindings(komodel);


        console.log( "Server Ping Completed." );
    });
 
    $( window ).on( "load", function() {
        console.log( "Server Ping Completed // Window Loaded 100%" );
    });

