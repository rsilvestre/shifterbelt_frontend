  {% include '../includes/head.swig' %}

  {% block head %}{% block gohead %}{% endblock %}{% endblock %}
  <body>
    {% include '../includes/header.swig' %}
    <div class="container simple-container">
      <div class="messages">
        {% include '../includes/messages.swig' %}
      </div>
      <div class="content">
        {% block content %}{% endblock %}
      </div>
    </div>
    {% include '../includes/footer.swig' %}
    {% include '../includes/foot.swig' %}
    {% block foot %}{% block gofoot %}{% endblock %}{% endblock %}
  </body>
</html>
