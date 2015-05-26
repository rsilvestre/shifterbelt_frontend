{# Created by michaelsilvestre on 29/04/15. #}

{% extends '../layouts/default.swig' %}

{% block main %}
  <h1>{{ application.name }}</h1>
  <p>application id: {{ application.businessId }}</p>
{% endblock %}

{% block content %}
<div class="row">
  <div class="col-md-8">
    {% for key in application.keys %}
      <ul>
        <li>role: {{ key.role }}</li>
        <li>key: {{ key.key }}</li>
        <li>secret: {{ key.passwd }}</li>
      </ul>
    {% endfor %}
  </div>
</div>