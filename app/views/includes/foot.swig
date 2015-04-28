<script src='http://code.jquery.com/jquery-1.10.2.min.js'></script>
<script src='//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js'></script>
<script src='/js/jquery.tagsinput.min.js'></script>
<script src='/js/app.js'></script>
<script type="text/javascript" src="/javascripts/lib/require.js" data-main="/javascripts/app"></script>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1622734144627490',
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
  _gaq.push(['_setAccount', 'UA-']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

{% block foot %}{% endblock %}
