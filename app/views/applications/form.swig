{# Created by michaelsilvestre on 29/04/15. #}
{% extends '../layouts/default.swig' %}

{% block main %}
  <h1>{{ name }}</h1>
  <hr>
{% endblock %}

{% block content %}
  {% if application.isNew %}
    {% set action = '/applications' %}
  {% else %}
    {% set action = '/applications/' + application.businessId %}
  {% endif %}
  <div class="row">
    <div class="col-md-8">
      <form method="post" action="{{ action }}" enctype="multipart/form-data" role="form" class="form-horizontal">

        <input type="hidden" name="_csrf" value="{{ csrf_token }}">

        {% if not application.new %}
          <input type="hidden" name="_method" value="PUT">
        {% endif %}

        <div class="form-group">
          <label for="name" class="col-sm-2 control-label">Name</label>

          <div class="col-sm-10">
            <input type="text" name="name" value="{{ application.name }}" placeholder="Enter the name"
                   class="form-control" id="name">
          </div>
        </div>

        <div class="form-group">
          <label for="strategy" class="col-sm-2 control-label">Strategy</label>

          <div class="col-sm-10">
            <select name="strategy" class="form-control" id="strategy">
              <option></option>
              <option value="direct" {% if application.strategy === "direct" %}selected{% endif %}>Direct</option>
              <option value="work" {% if application.strategy === "work" %}selected{% endif %}>Work</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button class="btn btn-primary" type="submit">Save</button>
            &nbsp;
            <a href="/applications" class="btn btn-link">Cancel</a>
          </div>
        </div>
      </form>
    </div>
  </div>
{% endblock %}