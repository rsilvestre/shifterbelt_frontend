{# Created by michaelsilvestre on 29/04/15. #}

{% set master = '
var ShifterbeltClient = require("shifterbelt-talker");end
end
var shifterbeltClient = new ShifterbeltClient({end
tabulation:applicationId: ' + application.businessId + ',end
tabulation:key: "' + application.keys[0]['key'] + '",end
tabulation:password: "' + application.keys[0]['passwd'] + '"end
});end
end
shifterbeltClient.on("connect", function(socket) {end
tabulation:console.log("connected on port 3000");end
tabulation:shifterbeltClient.emit("test", "first device message");end
end
tabulation:socket.on("event", function(message) {end
tabulation:tabulation:console.log("message: " + message);end
tabulation:});end
end
tabulation:socket.on("test", function(message) {end
tabulation:tabulation:console.log("message: " + message);end
tabulation:});end
end
tabulation:socket.on("disconnect", function() {end
tabulation:tabulation:console.log("has been disconnected");end
tabulation:});end
});end
end
shifterbeltClient.on("error", function(message) {end
tabulation:console.log(`There is an error: ${message}`);end
});' %}
{% set slave = '
var ShifterbeltClient = require("shifterbelt-talker");end
end
var shifterbeltClient = new ShifterbeltClient({end
tabulation:applicationId: ' + application.businessId + ',end
tabulation:key: "' + application.keys[1]['key'] + '",end
tabulation:password: "' + application.keys[1]['passwd'] + '"end
});end
end
shifterbeltClient.on("connect", function(socket) {end
tabulation:console.log("connected on port 3000");end
tabulation:shifterbeltClient.emit("test", "first device message");end
end
tabulation:socket.on("event", function(message) {end
tabulation:tabulation:console.log("message: " + message);end
tabulation:});end
end
tabulation:socket.on("test", function(message) {end
tabulation:tabulation:console.log("message: " + message);end
tabulation:});end
end
tabulation:socket.on("disconnect", function() {end
tabulation:tabulation:console.log("has been disconnected");end
tabulation:});end
});end
end
shifterbeltClient.on("error", function(message) {end
tabulation:console.log(`There is an error: ${message}`);end
});' %}

{% extends '../layouts/default.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/application.css">
  <link rel="stylesheet" href="/stylesheets/jquery.snippet.min.css">
{% endblock %}

{% block gofoot %}
  <script>
    require(['app/snippet-color-js']);
  </script>
{% endblock %}

{% block main %}
  <span class="main-application-name">
    {{ application.name|e }}
  </span>
  <span class="main-application-id">
    <span class="main-application-id-key">Application Id:</span> <span
      class="main-application-id-value">{{ application.businessId }}</span>
  </span>
{% endblock %}

{% block content %}
<div class="row">
  <div class="col-sm-1">
    <div class="application-docu">
      menu
    </div>
  </div>
  <div class="col-sm-8">
    <div class="application-docu">
      <div class="application-main-title">
        Code integration
      </div>
      <div class="application-main-subtitle">
        Master
      </div>
      <p class="application-main-text">
        Here is the explanation about how to integrate the library in the talkers
      </p>
      <pre class="code-js js">
        {{ master|sample }}
      </pre>
      <div class="application-main-subtitle">
        Slave
      </div>
      <p class="application-main-text">
        Here is the explanation about how to integrate the library in the talkers
      </p>
      <pre class="code-js js">
        {{ slave|sample }}
      </pre>
    </div>
    <div class="application-install">
      <div class="row">
        <div class="col-sm-12">
          <h3>
            install shifterbelt-talker
          </h3>

          <p>
            You need to install Shifterbelt-talker from npm.
          </p>
          <pre class="text-left">
            npm install --save shifterbelt-talker
          </pre>

          <p>
            Create a small project in node js
          </p>
          <pre class="text-left">
            mkdir master
            cd master
            npm init
            npm install --save shifterbelt-talker
            vi app.js
          </pre>

          <p class="text-primary">
            Copy/past the code for your master in the app.js and do the same for a slave
          </p>

          <p>
            Pay attention than :<br/>
            <ul>
              <li class="bg-warning">
                You should execute the code on 2 different machines. One for the master and one for the slave.
              </li>
              <li class="bg-warning">
                The code for the manager is still not implemented.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <ul class="content-application-container">
      {% for key in application.keys %}
        <li class="content-application-container-element">
          <div class="content-application-container-block clearfix">
            <span class="content-application-role">
              <span class="content-application-role-key">
                Role:
              </span>
              <span class="content-application-role-value">
                {{ key.role }}
              </span>
            </span>
            <span class="content-application-key">Key:</span>
            <pre class="content-application-key">{{ key.key }}</pre>
            <span class="content-application-passwd">Secret:</span>
            <pre class="content-application-passwd">{{ key.passwd }}</pre>
          </div>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>