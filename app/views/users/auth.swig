{% extends '../layouts/default.swig' %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}

  <a href="/auth/facebook">
    <img src="/images/facebook.png" alt="facebook auth">
  </a>
  <a href="/auth/github">
    <img src="/images/github.png" alt="github auth">
  </a>
  <a href="/auth/twitter">
    <img src="/images/twitter.png" alt="twitter auth">
  </a>
  <a href="/auth/google">
    <img src="/images/google.png" alt="google auth">
  </a>
  <a href="/auth/linkedin">
    <img src="/images/linkedin.png" alt="linkedin auth">
  </a>

  <br>
  <h2>OR</h2>
  <br>

  <div class="login">
    {% block auth %}{% endblock %}
  </div>
{% endblock %}
