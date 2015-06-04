{# Created by michaelsilvestre on 29/04/15. #}
{% extends '../layouts/default.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/application.css">
{% endblock %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  {% if (applications.length) %}
    <ul class="content-application-container">
    {% for application in applications %}
      <li class="content-application-list">
        {% include 'application.swig' %}
      </li>
    {% endfor %}
    </ul>
  {% else %}
    <h4 class="muted">
      No applications.&nbsp;
      <a href="/applications/new">create one</a>
    </h4>
  {% endif %}
{% endblock %}