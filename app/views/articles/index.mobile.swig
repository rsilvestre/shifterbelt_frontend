{% extends '../layouts/mobile.swig' %}
{# More mobile customizations if needed #}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  {% if (articles.length) %}
    {% for article in articles %}
      {% include 'article.swig' %}
    {% endfor %}

    {% if (pages > 1) %}
      <ul class="pagination">
        {% autoescape false %}
          {{ createPagination(pages, page + 1) }}
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
