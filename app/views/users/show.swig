{% extends '../layouts/default.swig' %}

{% block main %}
  <h1>{{ user.name || user.username }}</h1>
{% endblock %}
