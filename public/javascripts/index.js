(function(win, doc, $) {
    $.ajaxSetup({
        contentType: 'application/json',
        beforeSend: function(xhr) {
            let token = Cookies.get('Bearer');
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
    });

    $(doc).ajaxError((event, request, settings) => {
        if (request.status === 401) {
            win.location.href = '/auth/login/';
        }
    });

    let user = {
        username:"lovebiena",
        mobile: "18610212391",
        email: "lovebiena@sina.com",
        address: "北京市昌平区",
        age: 34,
        sex: 1,
        avatar: "/images/avatar/default.jpg",
        login_id: "099C18124ED811E9B4337E1A06CF0192"
    }

    function addUser(user) {
        let arr = `
            ${user.username}:"${user.username}",
            ${user.mobile}:"${user.mobile}",
            ${user.email}:"${user.email}",
            ${user.address}:"${user.address}",
            ${user.age}:${user.age},
            ${user.sex}:${user.sex},
            ${user.avatar}:"${user.avatar}",
            ${user.login_id}:"${user.login_id}"
        `
        let query = `mutation {
            addUser(${arr}){
                username
                mobile
                email
                address
                age
                sex
                avatar
                login_id
            }
        }`;

        return { query };
    }

    function selectALl() {
        let query = `{
            users {
                id
                username
                mobile
                email
                address
                age
                sex
                avatar
                login_id
            }
        }`;

        return { query };
    }

    function selectById(user_id) {
        let query = `{
            user(id:"${user_id}") {
                username
                mobile
                email
                address
                age
                sex
                avatar
                login_id
            }
        }`;

        return { query };
    }

    function deleteUser(user_id) {
        let query = `mutation {
            delete(id: "${user_id}") {
                username
            }
        }`;

        return { query };
    }

    $('[data-toggle="offcanvas"]').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    });

    let token = Cookies.get('Bearer');

    $.ajax({
        url: '/api/article/',
        type: 'GET'
    }).then(response => {
        let arr = [];

        _.forEach(response.data, item => {
            arr.push(`
                <div class="media text-muted pt-3">
                    <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                    </svg>
                    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong class="d-block text-gray-dark">${item.title} ${moment(item.create_time, 'YYYY-MM-DD hh:mm:ss').fromNow()}</strong>
                        ${item.content}
                    </p>
                </div>`);
        });

        $('#article_list').find('h6').after(arr.join(''));
    });

    $('#user_button').on('click', event => {
        let query = selectById($('#user_id').val());

        $.ajax({
            url: '/api/graphql/',
            type: 'POST',
            data: JSON.stringify(query)
        }).then(response => {
            let arr = [];

            _.forEach(response.data, item => {
                arr.push(
                    `<div class="media text-muted pt-3">
                        <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>
                        <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <div class="d-flex justify-content-between align-items-center w-100">
                                <strong class="text-gray-dark">${item.username}</strong>
                                <a href="#">Follow</a>
                            </div>
                            <span class="d-block">@username</span>
                        </div>
                    </div>`
                );
            });

            $('#user_list').find('h6').after(arr.join(''));
        });

        return false;
    });

    $('#users_button').on('click', event => {
        event.preventDefault();

        let query = selectALl();

        $.ajax({
            url: '/api/graphql/',
            type: 'POST',
            data: JSON.stringify(query)
        }).then(response => {
            let arr = [];

            _.forEach(response.data.users, (item, index) => {
                arr.push(`<div class="media text-muted pt-3">
                            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                            </svg>
                            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                <div class="d-flex justify-content-between align-items-center w-100">
                                    <strong class="text-gray-dark">${item.username}-${index + 1}</strong>
                                    <a href="#" class="js-del-user" data-user-id=${item.id}>DELETE</a>
                                </div>
                                <span class="d-block">@${item.id}</span>
                            </div>
                        </div>`);
            });

            $('#user_list').find('h6').after(arr.join(''));
        });

        return false;
    });

    $('#user_list').on('click', '.js-del-user', event => {
        event.preventDefault();

        let user_id = $(event.target).data('userId');
        let query = deleteUser(user_id);

        $.ajax({
            url: '/api/graphql/',
            type: 'POST',
            data: JSON.stringify(query)
        }).then(response => {
            $(event.target).parent().parent().parent().remove();
        });

        return false;
    });

})(window, document, jQuery);
