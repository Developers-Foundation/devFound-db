Parse.Cloud.define('hello', function (req, res) {
    res.success('Hi');
});

Parse.Cloud.define('isAdmin', function (req, response) {
    if (!req.params.username) {
        response.error('Username has not been provided');
    }

    var queryRole = new Parse.Query(Parse.Role);
    queryRole.equalTo('name', 'Administrator');

    queryRole.first({
        success: function (r) {
            var role = r;
            var relation = new Parse.Relation(role, 'users');
            var admins = relation.query();

            admins.equalTo('username', req.params.username)
            admins.first({
                success: function (u) {
                    var user = u;

                    if (user) {
                        response.success('User is admin');
                    } else {
                        response.error('User is not admin');
                    }
                },
                error: function () {
                    response.error('Error on user lookup');
                }
            })
        },
        error: function () {
            response.error('User admin check failed');
        }
    });
});