var fbtu = fbtu || {};

fbtu.init = function(application_id, access_token) {
  fbtu.ui.init();
  fbtu.facebook.init(application_id, access_token);
};

fbtu.ui = {
  init: function() {
    $('#btnCreate').click(function() {
      $('#modalCreateUser').modal();
    });

    $('#btnCreateSave').click(function() {

      fbtu.ui.lock_all_modals();

      fbtu.facebook.create_test_users($('#modalCreateUser_name').val(), function() {
        $('#modalCreateUser_name').val('');
        fbtu.ui.reset_all_modals();
      });      
    });

    $('#btnDelete').click(function() { 

      fbtu.ui.lock_all_modals();
      var row = $(this).data('row');
      $(this).data('row', null);    

      fbtu.facebook.delete_test_user(row.attr('user_id'), function() {
        row.remove();
        fbtu.ui.reset_all_modals();
      }); 
    });

    $('#tblUsers').on('click', 'a.delete_test_users', function() {
      var user_row = $(this).closest('tr');
      var user_id = user_row.attr('user_id');

      $('#modalDeleteUser_name').html(fbtu.facebook.data.test_users[user_id].name);
      $('#btnDelete').data('row', null);
      $('#btnDelete').data('row', user_row);
      $('#modalDeleteUser').modal();
    });
  },  
  clear_test_user_table: function() {
    $('#tblUsers tr').remove();
  },
  lock_all_modals: function() {
    $('.loader').show();
    $('#btnDelete').attr('disabled', 'disabled');
    $('#btnCreateSave').attr('disabled', 'disabled');
  },
  reset_all_modals: function() {
    $('.loader').hide();
    $('#btnDelete').removeAttr('disabled');
    $('#btnCreateSave').removeAttr('disabled');
    $('#modalCreateUser').modal('hide');
    $('#modalDeleteUser').modal('hide');
  },
  user_table_add_test_user: function(user) {
    $('#tblUsers').append('<tr user_id="'+user.id+'"><td>'+user.id+'</td><td>'+user.name+'</td><td><a href="'+user.login_url+'" target="_blank">login</a></td><td><a href="#" class="delete_test_users">delete</a></td></tr>');
  },    
  user_table_populate_test: function() {

    var data = fbtu.facebook.get_test_users();

    for(i in data) {
      fbtu.ui.user_table_add_test_user(data[i]);
    }
  },
  show_error_message_dialog: function(message) {    
    fbtu.ui.reset_all_modals();
    $('#modalErrorMessage_message').html(message);
    $('#modalErrorMessage').modal();
  }
};

fbtu.facebook = {
  data: {
    access_token: null,
    application_id: null,
    test_users: new Array()
  },
  init: function(application_id, access_token) {
    fbtu.facebook.data.access_token = access_token;
    fbtu.facebook.data.application_id = application_id;
  },
  create_test_users: function(user_name, cb) {
    
    user_name = encodeURIComponent(user_name);

    var create_test_users_url = function(name) {
      return 'https://graph.facebook.com/'+fbtu.facebook.data.application_id+'/accounts/test-users?'
        +'installed=true'
        +'&name='+name
        +'&locale=en_US'
        +'&permissions=read_stream'
        +'&method=post'
        +'&access_token='+fbtu.facebook.data.access_token;
    };      
    
    $.ajax({
      async: true,
      cache: false,
      dataType: 'json',
      error: function(error) { 
        fbtu.ui.show_error_message_dialog(error.responseText); 
      },
      success: function(result) {
        result = fbtu.facebook.get_test_user_details(result);
        fbtu.facebook.data.test_users[String(result.id)] = result;
        fbtu.ui.user_table_add_test_user(result);
        if (cb) { cb(); }
      },
      type: 'GET',
      url: create_test_users_url(user_name)
    });
  },
  delete_test_user: function(user_id, cb) {
    var user = fbtu.facebook.data.test_users[user_id];

    $.ajax({
      async: true,
      cache: false,
      dataType: 'json',
      error: function(error) { 
        fbtu.ui.show_error_message_dialog(error.responseText); 
      },
      success: function(result) {
        if (cb) { cb(); }
      },
      type: 'GET',
      url: 'https://graph.facebook.com/'+user.id+'?method=delete&access_token='+user.access_token
    });
  },
  get_test_user_details: function(user) {

    $.ajax({
      async: false,
      cache: false,
      dataType: 'json',
      error: function(error) { 
        fbtu.ui.show_error_message_dialog(error.responseText); 
      },
      success: function(result) {
        $.extend(user, result);
      },
      type: 'GET',
      url: 'https://graph.facebook.com/'+user.id
    });

    return user;
  },
  get_test_users: function() {

    if(typeof(fbtu.facebook.test_users) !== 'undefined') return fbtu.facebook.test_users;

    var data = null;

    var get_user_names = function(data) {      
      for(i in data) {
        data[i] = fbtu.facebook.get_test_user_details(data[i]);
        fbtu.facebook.data.test_users[String(data[i].id)] = data[i];
      }      
    }

    $.ajax({
      async: false,
      cache: false,
      dataType: 'json',
      error: function(error) { 
        fbtu.ui.show_error_message_dialog(error.responseText); 
      },
      success: function(result) {
        data = result.data;
        get_user_names(data);
        //fbtu.facebook.test_users = data;
      },
      type: 'GET',
      url: 'https://graph.facebook.com/'+fbtu.facebook.data.application_id+'/accounts/test-users?access_token='+fbtu.facebook.data.access_token
    });

    return data;
  }  
};
