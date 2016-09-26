Parse.Cloud.define('hello', function (req, res) {
    res.success('Hi');
});

Parse.Cloud.define('isAdmin', function (req, response) {
    Parse.Cloud.useMasterKey();
    if (!req.params.username) {
        response.error(false);
    }

    var queryRole = new Parse.Query(Parse.Role);
    queryRole.equalTo('name', 'Administrator');

    queryRole.first({
        success: function (r) {
            var role = r;
            //var relation = new Parse.Relation(role, 'users');
            var relation = role.getUsers();
            var admins = relation.query();

            admins.equalTo('username', req.params.username);
            admins.first({
                success: function (u) {
                    var user = u;
                    //response.success(user);
                    if (user) {
                        response.success(true);
                    } else {
                        response.success(false);
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