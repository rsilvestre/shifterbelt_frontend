{% extends '../layouts/default.swig' %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  <div
          class="fb-like"
          data-share="true"
          data-width="450"
          data-show-faces="true">
  </div>
  {% if (articles.length) %}
    {% for article in articles %}
      {% include 'article.swig' %}
    {% endfor %}
    {% if (pages > 1) %}
      <ul class="pagination">
        {% autoescape false %}
          {{ createPagination(pages, page) }}
        {% endautoescape %}
      </ul>
    {% endif %}
  {% else %}
    <h4 class="muted">
      No articles.&nbsp;
      <a href="/articles/new">create one</a>
    </h4>
  {% endif %}
{% endblock %}
