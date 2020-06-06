const data = {
    notes: { note: null },
    //notes: { note: {mode: '+', description: '', income: 0, expenses: 0, percentage: 0, totalBalance: 0} },
    noteDate: null,
    header: {
        navigation: 'Панель инструментов',  //Toolbar
        logo: 'logo',
        backdrop: '...',
    },
    list: false,
    orders: [],
    ordersError: null,
    error: false,
    formIsValid: false,
    auth: {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Почтовый Адрес'   //Mail Address
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Пароль' //Password
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    },
    isSignUp: false,
    loading: true,
    token: null,
    userId: null,
    authError: null,
    footerSection: {
        copyright: "Copyright ",
        idea: "Идея приложения Йонас Шмедтманн",
        develop: "Разработка Константин Дергачёв",
        social: {
            "#github": "https://github.com/konstantindergachev",
            "#facebook": "https://www.facebook.com/profile.php?id=100003527152401"
        }
    },
}

export default data;
