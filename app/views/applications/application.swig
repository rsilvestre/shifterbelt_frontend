{# Created by michaelsilvestre on 29/04/15. #}
<div class="application">
  <div class="application-info">
    <span class="application-info-title clearfix">
      <span class="application-info-title-name">
        <a href="{{ '/applications/' + application.businessId + '/show'}}" title="{{ application.name }}">
          {{ application.name|e }}
        </a>
      </span>
      <span class="application-info-title-stats">
        <a href="{{ '/applications/' + application.businessId + '/stats' }}"
           title="Stats for application: {{ application.name }}">
          (stats)
        </a>
      </span>
    </span>
    <span class="application-info-id">
      Application Id: {{ application.businessId }}
    </span>
    <span class="application-info-keys">
      Number keys: {{ application.keys|length }}
    </span>
  </div>
</div>