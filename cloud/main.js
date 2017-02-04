Parse.Cloud.define('hello', function (req, res) {
    res.success('Hi');
});

Parse.Cloud.define('isAdmin', function (req, response) {
    //Parse.Cloud.useMasterKey();
    if (!req.params.username) {
        response.error(false);
    }
    var queryRole = new Parse.Query(Parse.Role);
    queryRole.equalTo('name', 'Administrator');

    queryRole.first({useMasterKey: true}).then(function (r) {
        var role = r;
        var relation = new Parse.Relation(role, 'users');
        //var relation = role.getUsers();
        var admins = relation.query();

        admins.equalTo('username', req.params.username);
        return admins.first({useMasterKey: true});
    }).then(function (u) {
            var user = u;
            console.log("Searching for: " + req.params.username + ", Found: " + user.getUsername());
            //response.success(user);
            if (user) {
                response.success(true);
            } else {
                response.success(false);
            }
            return;
        },
        function (err) {
            response.error(false);
        }
    );
});

Parse.Cloud.define('isRole', function (req, response) {

});

