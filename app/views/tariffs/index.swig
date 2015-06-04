{% extends '../layouts/default.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/tariff.css">
{% endblock %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  <div class="plan-container clearfix">
    <div class="plan-container-nofree clearfix">
    {% for tariff in tariffsNotFree %}
      <div class="plan">
        <div class="plan-title">{{ tariff.name }}</div>
        <p class="plan-description">{{ tariff.description }}</p>
        <div class="plan-price">€ {{ tariff.price|lastPrice }}/month</div>
        <div class="feature-group">
          <p>Connection: {{ tariff.connection|numberize }}</p>
          <p>Message: {{ tariff.message|numberize }}</p>
        </div>
        <div class="feature-group">
          <p>SSL Supported</p>
          <p>Overage supported</p>
          <p>24h Support</p>
        </div>
        <div class="horizontal-notfree">
          <a href="/tariffs/{{ tariff.name }}/payment" class="btn btn-primary">Tariff Change</a>
        </div>
      </div>
    {% endfor %}
    </div>
    <div class="plan-container-free clearfix">
    {% for tariff in tariffsFree %}
      <div class="plan-free clearfix">
        <div class="plan-free-description clearfix">
          <div class="plan-free-row clearfix">
            <div class="plan-title-free">{{ tariff.name }}</div>
            <p class="plan-description-free">{{ tariff.description }}</p>
          </div>
          <div class="plan-free-row clearfix">
            <div class="feature-group-free">
              <span class="plan-free-connection">Connections: {{ tariff.connection|numberize }}</span>
              <span class="plan-free-message">Messages: {{ tariff.message|numberize }}</span>
            </div>
            <div class="feature-group-free">
              <span class="plan-free-ssl">SSL Supported</span>
            </div>
          </div>
        </div>
        <div class="plan-price-free">€ {{ tariff.price|lastPrice }}/month</div>
        <div class="horizontal-free">
          <a href="/tariffs/{{ tariff.name }}/payment" class="btn btn-primary">Tariff Change</a>
        </div>
      </div>
    {% endfor %}
    </div>
  </div>
{% endblock %}