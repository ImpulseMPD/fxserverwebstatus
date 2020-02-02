/** On page load, allow the script to run. */
$( document ).ready(function() { 
/** Function Name | this is what is called from your headers code once the page has loaded the status section. */
    function ping(ip, callback) {
/** DO NOT CHANGE ANYTHING HERE **/

/** Check If Server is Online */
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
/** Check If Server is Offline */
            };
            this.start = new Date().getTime();
            this.img.src = "https://" + ip;
            this.timer = setTimeout(function () {
                if (_that.inUse) {
                    _that.inUse = false;
                    _that.callback('Offline');
                }
/** Timer for how long the script should keep checking before it marks the server Offline | If your server is slow. Increase the pingback time |  1000ms = 1 Second */
            }, 1500);
        }
    }

/** Initiate Check for Current Server Status || Checking */
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
    var komodel = new PingModel(['103.1.186.114:30120'
      
        ]);

/** Added this here so you can confirm in the developer console of your browser, if the script is being executed correctly.  */
    ko.applyBindings(komodel);
    
    
            console.log( "Server Ping Completed." );
        });
     
        $( window ).on( "load", function() {
            console.log( "Server Ping Completed // Window Loaded 100%" );
        });
    

