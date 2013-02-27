<?php 
  /*error_reporting(E_ALL);
  ini_set('display_errors', '1');*/
  include 'source/fbtu.php';
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Facebook Test User Tool</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/fbtu.css" rel="stylesheet" media="screen">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
  </head>
  <body>
    <h1>Facebook. Test User Tool</h1>

    <table id="tblUsers" class="table table-bordered table-striped"></table>

    <button id="btnCreate" class="btn">Create User</button>

    <div id="modalErrorMessage" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">      
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
        <h3 id="myModalLabel">Error</h3>
      </div>
      <div class="modal-body">
        <span id="modalErrorMessage_message"></span>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
      </div>
    </div>

    <div id="modalCreateUser" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="loader loader_create"></div>
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
        <h3 id="myModalLabel">Create Test User</h3>
      </div>
      <div class="modal-body">
        <label for="name">Name</label>
        <input type="text" name="name" id="modalCreateUser_name" class="text ui-widget-content ui-corner-all" />
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button id="btnCreateSave" class="btn btn-primary">Save changes</button>
      </div>
    </div>

    <div id="modalDeleteUser" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="loader loader_delete"></div>
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
        <h3 id="myModalLabel">Delete Test User</h3>
      </div>
      <div class="modal-body">        
        <label id="modalDeleteUser_name"></label>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button id="btnDelete" class="btn btn-danger">Delete</button>
      </div>
    </div>

    <script src="js/jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/fbtu.js"></script>

    <script>
      var appId = '<?php echo getApplicationId(); ?>';
      var access_token = '<?php echo getAccessToken(); ?>';

      fbtu.init(appId ,access_token);      
      fbtu.ui.user_table_populate_test();
    </script>
  </body>
</html>
