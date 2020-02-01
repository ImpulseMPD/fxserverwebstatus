# FXServer Check Status
A Small Script I made that will check the status of your FiveM Server once the page has loaded.

Make sure to add the following scripts to your website header, to ensure that the function is called.

Check required files for the scripts (Recommend running these in your header tag) and Styling
Check script.js for the code to enclose in script tags.


# HOW TO INSTALL


1) Begin by adding the following scripts to your website's header file.

<script type='text/javascript' src="https://knockoutjs.com/downloads/knockout-2.2.1.js"></script>
<script type='text/javascript' src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type='text/javascript' onload="ping()"></script>  

1a) the last script in the above list is to call the function. It will not work until all below steps have been completed.


2) Add the following script to your web page. Either inside your HTML file or if using WordPress it works in a text element. 

<script>
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
            this.img.src = "https://" + ip;
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
    var komodel = new PingModel(['103.1.186.114:30120'
      
        ]);
    ko.applyBindings(komodel);
    
    
            console.log( "Server Ping Completed." );
        });
     
        $( window ).on( "load", function() {
            console.log( "Server Ping Completed // Window Loaded 100%" );
        });
    
    </script>
    
 3) Add the following code inside the area of your website you would like the result of [Offline : Checking: Online ] to display.
 
 <div data-bind="foreach:servers">
   <span data-bind="text:status,css:status"></span>
  
</div>

 NOTE: Suggest having the script (step 2) & code (step 3) inside the same primary div tag.
 
 4) Completed. You should now have the status of your server loading in your desired location.

