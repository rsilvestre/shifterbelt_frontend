<script data-main="/javascripts/app" src="/javascripts/lib/require.js"></script>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{{ pkg.project.fb.appId }}',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>
<script>
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-{{ pkg.project.google.analytics }}']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

{% block foot %}{% endblock %}
