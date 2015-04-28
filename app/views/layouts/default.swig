  {% include '../includes/head.swig' %}

  <body>
    {% include '../includes/header.swig' %}
    <div class="container">
      <div class="page-header">
        {% block main %}{% endblock %}
      </div>
      <div class="messages">
        {% include '../includes/messages.swig' %}
      </div>
      <div class="content">
        {% block content %}{% endblock %}
      </div>
    </div>
    {% include '../includes/footer.swig' %}
    {% include '../includes/foot.swig' %}
  </body>
</html>
