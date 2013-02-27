<?php
  include 'config.php';

  function getAccessToken() {

    global $FACEBOOK_APP_ID, $FACEBOOK_APP_SECRET;

    $app_token_url = "https://graph.facebook.com/oauth/access_token?"
      . "client_id=" . $FACEBOOK_APP_ID
      . "&client_secret=" . $FACEBOOK_APP_SECRET 
      . "&grant_type=client_credentials";

    $response = file_get_contents($app_token_url);
    $params = null;

    parse_str($response, $params);

    return $params['access_token'];
  }

  function getApplicationId() {
    global $FACEBOOK_APP_ID;
    return $FACEBOOK_APP_ID;
  }

  function getActiveTestUsers() {

    global $FACEBOOK_APP_ID;

    $test_user_url = "https://graph.facebook.com/"
      . $FACEBOOK_APP_ID
      . "/accounts/test-users?access_token="
      . getAccessToken();

    return file_get_contents($test_user_url);
  }

?>