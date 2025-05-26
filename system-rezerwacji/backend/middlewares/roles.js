const roles = {
    admin: ['create_project', 'edit_project', 'delete_project', 'view_project'],
    operator: ['edit_project', 'view_project'],
    user: ['view_project'],
  };
  
  module.exports = roles;
  