{% extends '../layouts/default.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/user.css">
{% endblock %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  <div id="login_form">
    <div class="login_form_title">Login to your account</div>
    <div class="login_form_third">
      {% include "small_login_third.swig" %}
    </div>
    <div class="login_or">
      OR
    </div>
    <form action="/users/session" method="post" role="form" class="form-horizontal">
      <input type="hidden" name="_csrf" value="{{ csrf_token }}">
      <input id="email" class="form-control" type="email" placeholder="Email" name="email">
      <input id="password" class="form-control" type="password" placeholder="Password" name="password">
      <button class="btn btn-primary" type="submit">Log in</button>
      <a class="login_form_login show-login" href="/signup">Sign up</a>
    </form>
  </div>
{% endblock %}
