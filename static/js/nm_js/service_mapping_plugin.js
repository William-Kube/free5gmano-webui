
function service_mapping_plugin_list(url){
  axios.get(url+'plugin/management/').then((response) => {
    // console.log(response.data);
    var response = response.data;
    for (var i = 0; i < response.length; i++) {
      document.getElementById("plugintable").innerHTML += '\
        <tr>\
          <td>'+response[i].name+'</td>\
          <td>'+response[i].allocate_nssi+'</td>\
          <td>'+response[i].deallocate_nssi+'</td>\
          <td align="center"><a href="#" onclick="show_update_plugin(\''+url+'plugin/management/\',\''+response[i].name+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_plugin_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
          <td align="center"><a href="'+response[i].pluginFile+'" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
          <td align="center"><a href="#" onclick="delete_plugin(\''+url+'plugin/management/\',\''+response[i].name+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
        </tr>';
    }
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  });
}

function delete_plugin(url, name) {
  axios.delete(url+name+'/').then((response) => {
    alert(response.data.status);
    location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

var file;
function upload(e) {
    file = e.files[0];
    if (!file) {
        return;
    }
    console.log(file);
}

function create_plugin(url) {
  var name = document.getElementById("create_pluginName").value;
  if (file && name) {
    var form = new FormData();
    form.append("name", name);
    form.append("pluginFile", file);
    axios.post(url+'plugin/management/', form)
    .then((response) => {
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("Service Mapping Plugin model with this name already exists.");
    });
  }else{
    alert("Please enter Plugin Name and Plugin File");
  }
}

function show_update_plugin(url, name) {
  document.getElementById("update_plugin_Modal").innerHTML = '\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title" id="exampleModalLabel">Update Service Mapping Plugin</h5>\
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">??</span>\
        </button>\
      </div>\
      <div class="modal-body">\
        <label for="update_pluginName">Plugin Name :</label><input type="text" class="form-control bg-light border-0 small" name="update_pluginName" id="update_pluginName" required readonly value="'+name+'">\
        <label for="pluginFile">Plugin File :</label><br><input class="btn btn-secondary btn-icon-split" name="pluginFile" id="pluginFile" type="file" accept=".zip" onchange="upload(this)" required></div>\
      <div class="modal-footer">\
        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>\
        <a class="btn btn-primary" href="#" onclick="update_plugin(\''+url+'\')">Create</a>\
      </div>\
    </div>\
  </div>';
}

function update_plugin(url) {
  var name = document.getElementById("update_pluginName").value;
  if (file && name) {
    var form = new FormData();
    form.append("name", name);
    form.append("pluginFile", file);
    axios.patch(url+name+'/', form)
    .then((response) => {
      alert("Plugin update success???");
      location.reload();
    })
    .catch((error) => {
      alert("Service Mapping Plugin model has some error.");
    });
  }else{
    alert("Please enter Plugin Name and Plugin File");
  }
}