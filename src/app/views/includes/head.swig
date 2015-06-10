<!doctype html>
<html lang="en">
  <head prefix="og: http://ogp.me/ns# shifterbelt: http://ogp.me/ns/apps/shifterbelt#">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <title>{{ title }} | {{ pkg.name }}</title>
    <meta name="keywords" content="{{ pkg.keywords.join(',') }}">
    <meta name="description" content="{{ pkg.description }}">

    {# Opengraph tags #}
    <meta property="fb:app_id" content="{{ pkg.project.fb.appId }}">
    <meta property="og:title" content="{{ pkg.name }} - {{ title }}">
    <meta property="og:description" content="{{ pkg.description }}">
    <meta property="og:url" content="{{ pkg.project.url }}">
    <meta property="og:site_name" content="{{ pkg.project.content }}">
    <meta property="fb:admins" content="{{ pkg.project.fb.admin }}">

    {% block head %}
      {# Styles #}
      <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
      <link href="/stylesheets/jquery.tagsinput.css" rel="stylesheet">
      <link href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
      <link rel="stylesheet" href="/stylesheets/app.css">
      <link rel="stylesheet" href="/stylesheets/style.css">
    {% endblock %}
  </head>

  {# HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries #}
  <!--[if lt IE 9]>
    <script src='https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js'></script>
    <script src='https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js'></script>
  <![endif]-->
