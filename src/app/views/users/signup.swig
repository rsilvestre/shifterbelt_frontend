{# Created by michaelsilvestre on 30/05/15. #}
{% extends '../layouts/default.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/user.css">
{% endblock %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  <div id="login_form">
    <div class="login_form_title">Create an account</div>
    <div class="login_form_third">
      {% include "small_login_third.swig" %}
    </div>
    <div class="login_or">
      OR
    </div>
    <form action="/users" method="post" role="form" class="form-horizontal">
      <input type="hidden" name="_csrf" value="{{ csrf_token }}">
      <input id="name" class="form-control" type="text" name="name" placeholder="Full name" value="{{ user.name }}">
      <input type="text" name="email" placeholder="Email" value="{{ user.email }}" id="email" class="form-control">
      <input id="username" class="form-control" type="text" name="username" placeholder="Username" value="{{ user.username }}">
      <input id="password" class="form-control" type="password" name="password" placeholder="Password">
      <button class="btn btn-primary btn-large" type="submit">Sign up</button>
      <a class="login_form_login show-login" href="/login">Log in</a>
    </form>
  </div>
{% endblock %}
