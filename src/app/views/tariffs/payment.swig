{# Created by michaelsilvestre on 2/06/15. #}
{% extends '../layouts/default.swig' %}

{% block gohead %}
  <link rel="stylesheet" href="/stylesheets/tariff.css">
{% endblock %}

{% block main %}
  <h1>{{ title }}</h1>
{% endblock %}

{% block content %}
  <div class="payment-container clearfix">
    <div class="row">
      <div class="col-md-12">
        <form method="post" action="{{ action }}" enctype="multipart/form-data" role="form" class="form-horizontal">
          <input type="hidden" name="_csrf" value="{{ csrf_token }}">

          <div class="col-sm-12 payment-recap">
            <div class="row">
              <div class="col-sm-offset-2 col-sm-10">
                name :
                &nbsp;
                {{ tariff.name }}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-offset-2 col-sm-10">
                price :
                &nbsp;
                € {{ tariff.price|lastPrice }}/month
              </div>
            </div>
          </div>

          <div class="form-horizontal user-info">
            <div class="form-group">
              <label for="firstname" class="col-sm-2 control-label">Firstname</label>

              <div class="col-sm-6">
                <input type="text" name="firstname" placeholder="Enter your firstname"
                       class="form-control" id="firstname" value="{{ tariffError.firstname }}"/>
              </div>
            </div>

            <div class="form-group">
              <label for="lastname" class="col-sm-2 control-label">Lastname</label>

              <div class="col-sm-6">
                <input type="text" name="lastname" placeholder="Enter your lastname"
                       class="form-control" id="lastname" value="{{ tariffError.lastname }}"/>
              </div>
            </div>

          </div>

          <div class="row address-row">
            <div class="col-sm-4 col-sm-offset-1">
              Billing address
            </div>
          </div>
          <div class="col-sm-12 payment-address-block">
            <div class="row address-row">
              <div class="col-sm-6">
                <label for="address1" class="col-sm-6">Address1</label>
                <input type="text" name="address1" class="col-sm-6 form-control" placeholder="Address 1" id="address1"
                       value="{{ tariffError.address1 }}"/>
              </div>
              <div class="col-sm-6">
                <label for="address2" class="col-sm-6">Address2</label>
                <input type="text" name="address2" class="col-sm-6 form-control" placeholder="Address 2" id="address2"
                       value="{{ tariffError.address2 }}"/>
              </div>
            </div>
            <div class="row address-row">
              <div class="col-sm-6">
                <label for="country" class="col-sm-6">Country</label>
                <select name="country" class="col-sm-6 form-control" id="country">
                  {% for country in countries %}
                    <option value="{{ country.code }}"
                            {% if country.code === tariffError.country %}selected{% endif %}>{{ country.name }}</option>
                  {% endfor %}
                </select>
              </div>
              <div class="col-sm-6">
                <label for="zipcode" class="col-sm-6">Zip Code</label>
                <input type="text" name="zipcode" class="col-sm-6 form-control" placeholder="Zip code" id="zipcode"
                       value="{{ tariffError.zipcode }}"/>
              </div>
            </div>
            <div class="row address-row">
              <div class="col-sm-6">
                <label for="city" class="col-sm-6">City</label>
                <input type="text" name="city" class="col-sm-6 form-control" placeholder="City" id="city"
                       value="{{ tariffError.city }}"/>
              </div>
              <div class="col-sm-6">
                <label for="phonenumber" class="col-sm-6">Phone number</label>
                <input type="text" name="phonenumber" class="col-sm-6 form-control" placeholder="Phone number"
                       id="phonenumber" value="{{ tariffError.phonenumber }}"/>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-primary" type="submit">Save</button>
              &nbsp;
              <a href="/articles" class="btn btn-link">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
{% endblock %}
