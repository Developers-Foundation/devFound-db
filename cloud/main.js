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

    queryRole.first({
        useMasterKey: true,
        success: function (r) {
            var role = r;
            //var relation = new Parse.Relation(role, 'users');
            var relation = role.getUsers();
            var admins = relation.query();

            admins.equalTo('username', req.params.username);
            admins.first({
                success: function (u) {
                    var user = u;
                    //console.log(user);
                    //response.success(user);
                    if (typeof user === "undefined") {
                        response.success(false);
                    } else {
                        response.success(true);
                    }
                },
                error: function () {
                    response.error(false);
                }
            });
        },
        error: function () {
            response.error(false);
        }
    });
});

Parse.Cloud.define('isRole', function (req, response) {

});

