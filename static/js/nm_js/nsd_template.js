function nsd_template_list(url){
  axios.get(url+'ObjectManagement/GenericTemplate/').then((response) => {
    var response = response.data;
    for (var i =0; i< response.length; i++) {
      if (response[i].templateType == "NSD" && response[i].operationStatus == "UPLOAD") {
        nsd_id = response[i].templateId;
        document.getElementById("nsd_table").innerHTML += '\
          <tr>\
            <td>'+nsd_id+'</td>\
            <td>'+response[i].name+'</td>\
            <td>'+response[i].description+'</td>\
            <td>'+response[i].templateType+'</td>\
            <td>'+response[i].nfvoType+'</td>\
            <td>'+response[i].operationStatus+'</td>\
            <td align="center"><a href="#" class="btn btn-info btn-circle" data-toggle="modal" data-target="#vnf_list_Modal'+nsd_id+'"><i class="fas fa-file-alt text-white"></i></a></td>\
            <td align="center"><a href="#" onclick="show_update_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nsd_id+'\',\''+response[i].nfvoType+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_template_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
            <td align="center"><a href="'+response[i].templateFile+'" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nsd_id+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
        document.getElementById("vnf_list_Modal").innerHTML += '\
        <div class="modal fade" id="vnf_list_Modal'+nsd_id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
          <div class="modal-dialog" role="document">\
            <div class="modal-content">\
              <div class="modal-header">\
                <h5 class="modal-title" id="exampleModalLabel">VNF List</h5>\
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
                  <span aria-hidden="true">??</span>\
                </button>\
              </div>\
              <div class="modal-body">\
                <label for="update_template_id">NSD Template ID :</label><input type="text" class="form-control bg-light border-0 small" name="update_template_id" id="update_template_id" required readonly value="'+nsd_id+'">\
                <label>VNF ID List :\
                  <table id="vnf_id_list_'+nsd_id+'">\
                    <tr></tr>\
                  </table>\
                </label>\
              </div>\
              <div class="modal-footer">\
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>\
              </div>\
            </div>\
          </div>\
        </div>';
        for (var j=0; j<response[i].content.length; j++){
          strdata = response[i].content[j].topology_template;
          strdata_handle = strdata.replace(/'/g, '"');
          result = JSON.parse(strdata_handle);
          if (!('NS1' in result.node_templates)) {
            tacker_json = result.node_templates;
            tacker_array = Object.values(tacker_json)
            for (var k=0; k<tacker_array.length; k++){
              tacker_array_type = tacker_array[k].type;
              tacker_split_result = tacker_array_type.split(".");
              vnfd = tacker_split_result[3];
              document.getElementById("vnf_id_list_"+nsd_id).innerHTML += '<td>'+vnfd+'</td>';
            }
          }else{
            vnfd = result.node_templates.NS1.properties.constituent_vnfd;
            for (var k=0; k<vnfd.length; k++){
              document.getElementById("vnf_id_list_"+nsd_id).innerHTML += '<td>'+vnfd[k].vnfd_id+'</td>';
            }
          }
        }
      }
      else if (response[i].templateType == "NSD"){
        nsd_id = response[i].templateId;
        document.getElementById("nsd_table").innerHTML += '\
          <tr>\
            <td>'+nsd_id+'</td>\
            <td>'+response[i].name+'</td>\
            <td>'+response[i].description+'</td>\
            <td>'+response[i].templateType+'</td>\
            <td>'+response[i].nfvoType+'</td>\
            <td>'+response[i].operationStatus+'</td>\
            <td align="center"><a href="#" class="btn btn-info btn-circle" data-toggle="modal" data-target="#vnf_list_Modal'+nsd_id+'"><i class="fas fa-file-alt text-white"></i></a></td>\
            <td align="center"><a href="#" onclick="show_update_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nsd_id+'\',\''+response[i].nfvoType+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_template_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
            <td align="center"><a href="#" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nsd_id+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
        document.getElementById("vnf_list_Modal").innerHTML += '\
        <div class="modal fade" id="vnf_list_Modal'+nsd_id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
          <div class="modal-dialog" role="document">\
            <div class="modal-content">\
              <div class="modal-header">\
                <h5 class="modal-title" id="exampleModalLabel">VNF List</h5>\
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
                  <span aria-hidden="true">??</span>\
                </button>\
              </div>\
              <div class="modal-body">\
                <label for="update_template_id">NSD Template ID :</label><input type="text" class="form-control bg-light border-0 small" name="update_template_id" id="update_template_id" required readonly value="'+nsd_id+'">\
                <label for="templateFile">VNF ID List :\
                  <table id="vnf_id_list_'+nsd_id+'">\
                    <tr>\
                      <td>No Upload Network Service Description Template!!</td>\
                    </tr>\
                  </table>\
                </label>\
              </div>\
              <div class="modal-footer">\
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>\
              </div>\
            </div>\
          </div>\
        </div>';
      }
    }
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  });
}


function delete_template(url, name) {
  var yes = confirm("Sure to delete NSD Template ?");
  if (yes) {
    axios.delete(url+name+'/').then((response) => {
      alert("NSD Template Delete Success");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("ERROR!!");
    });
  }
}


var file;
function upload(e) {
    file = e.files[0];
    if (!file) {
        return;
    }
}


function create_template(url) {
  var name = document.getElementById("template_name").value;
  var description = document.getElementById("nsd_description").value;
  var nfvoType = document.getElementById("nfvoType").value;
  var form = new FormData();
  form.append("nfvoType", nfvoType);
  form.append("templateType", "NSD");
  form.append("name", name);
  form.append("description", description);
 if (nfvoType && name) {
    axios.post(url+'ObjectManagement/GenericTemplate/', form)
    .then((response) => {
      alert("NSD Template Create Success !!");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("ERROR!!");
    });
  }
  else{
    alert("Please select a NFVO or enter template name!");
  }
}


function show_update_template(url, name, nfvoType) {
  document.getElementById("update_template_Modal").innerHTML = '\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title" id="exampleModalLabel">Update NSD Template</h5>\
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">??</span>\
        </button>\
      </div>\
      <div class="modal-body">\
        <label for="update_template_id">NSD Template ID :</label><input type="text" class="form-control bg-light border-0 small" name="update_template_id" id="update_template_id" required readonly value="'+name+'"><br>\
        <label for="templateFile">NSD Template File :</label><br><input class="btn btn-secondary btn-icon-split" name="templateFile" id="templateFile" type="file" accept=".zip" onchange="upload(this)" required></div>\
      <div class="modal-footer">\
        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>\
        <a class="btn btn-primary" href="#" onclick="update_template(\''+url+'\',\''+nfvoType+'\')">Update</a>\
      </div>\
    </div>\
  </div>';
}


function update_template(url, nfvoType) {
  var name = document.getElementById("update_template_id").value;
  if (file && name) {
    var form = new FormData();
    form.append("nfvoType", nfvoType);
    form.append("templateType", "NSD");
    form.append("templateFile", file);
    axios.put(url+name+'/', form)
    .then((response) => {
      alert("Template update success???");
      location.reload();
    })
    .catch((error) => {
      alert("NSD Template model has some error.");
    });
  }else{
    alert("Please enter Template ID and Template File");
  }
}


function get_plugin_list(url) {
  axios.get(url+'plugin/management/').then((response) => {
    var response = response.data;
    if (response.length == 0){
      document.getElementById("nfvoType").innerHTML = '<option value="">Create NFVO first</option>';
    }
    else{
      document.getElementById("nfvoType").innerHTML = '<option value="">Select a NFVO</option>';
      for (var i = 0; i < response.length; i++) {
        document.getElementById("nfvoType").innerHTML += '\
        <option value="'+response[i].name+'">'+response[i].name+'</option>';
      }
    }
  });
}