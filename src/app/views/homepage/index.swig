{# Created by michaelsilvestre on 30/05/15. #}
{% extends '../layouts/simple.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/homepage.css">
{% endblock %}

{% block content %}
  <div id="welcome-message">
    <div class="welcome-message-title">
      {{ pkg.name }}
    </div>
    <div class="welcome-message-baseline">
      A simple real time bidirectional messaging service
    </div>
    <div class="welcome-message-create-account">
      <a href="/signup" class="btn btn-primary btn-block btn-lg">
        Create an account
      </a>
    </div>
  </div>
{% endblock %}
