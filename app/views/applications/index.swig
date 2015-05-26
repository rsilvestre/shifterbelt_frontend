{# Created by michaelsilvestre on 29/04/15. #}
{% extends '../layouts/default.swig' %}

{% block main %}
  <h1>{{ name }}</h1>
{% endblock %}

{% block content %}
  {% if (applications.length) %}
    {% for application in applications %}
      {% include 'application.swig' %}
    {% endfor %}
  {% else %}
    <h4 class="muted">
      No applications.&nbsp;
      <a href="/applications/new">create one</a>
    </h4>
  {% endif %}
{% endblock %}