# Required Files for this script to run. Add them using the <script> tags on your website.
```html
<script type='text/javascript' src="https://knockoutjs.com/downloads/knockout-2.2.1.js"></script>
<script type='text/javascript' src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script>
```

# Required to be added to the page you're running the script on. 
```html
<style>
.Online {
    color:green;
}
.checking,.unchecked {
    color:#FF8C00;
}
.Offline {
    color:red;
}

</style>

<div data-bind="foreach:servers">
   <span data-bind="text:status,css:status"></span>
  
</div>
```

# The Above section will give back the results [Offline : Checking : Online] 
This is based off what your server ip comes back with defined in the script.js file.
