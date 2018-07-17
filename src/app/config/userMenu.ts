
const menu = [
    {
        rol: "Admin",
        model: [


            { label: 'Administrador', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Usuarios', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Crear', icon: 'fa fa-fw fa-bars', routerLink: ['/registro'] }

                ]
            },

            {
                label: 'Espacios Físicos', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Horarios', icon: 'fa fa-fw fa-bars', routerLink: ['/horario'] },
                    { label: 'Franjas Horarias', icon: 'fa fa-fw fa-bars', routerLink: ['/franja'] },
                    { label: 'Ubicaciones', icon: 'fa fa-fw fa-bars', routerLink: ['/ubicacion'] }



                ]
            },
            {
                label: 'Facturación', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Facturas', icon: 'fa fa-fw fa-bars', routerLink: ['/factura'] },
                    { label: 'Cliente', icon: 'fa fa-fw fa-bars', routerLink: ['/cliente'] }
                ]
            },

            {
                label: 'Syllabus', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Syllabus', icon: 'fa fa-fw fa-bars', routerLink: ['/silabus'] },
                    { label: 'Temas', icon: 'fa fa-fw fa-bars', routerLink: ['/temas'] }

                ]
            },
            {
                label: 'Evaluacion Docente', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Cuestionario', icon: 'fa fa-fw fa-bars', routerLink: ['/cuestionario'] },
                    { label: 'CRUD', icon: 'fa fa-fw fa-bars', routerLink: ['/temas'] }

                ]
            },
           

        ]
    },
    {
        rol: "DOC",
        model: [{ label: 'Docente', icon: 'fa fa-fw fa-home', routerLink: ['/'] }]
    },
    {
        rol: "EST",
        model: [
            { label: 'Estudiante', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Matriculas', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Clases', icon: 'fa fa-fw fa-bars', routerLink: ['/clases'] },
                    { label: 'Matricularse', icon: 'fa fa-fw fa-bars', routerLink: ['/cliente'] }
                ]
            },

            {
                label: 'Notificaciones', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Plantillas', icon: 'fa fa-fw fa-bars',  routerLink: ['/plantillas'] },
                    { label: 'Notificaciones',  icon: 'fa fa-fw fa-bars',  routerLink: ['/notificaciones'] }
                    
                ]
            },
            {
                label: 'Aula Virtual', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Foros', icon: 'fa fa-fw fa-bars', routerLink: ['/virtual/foro'] },
                    { label: 'Wikis', icon: 'fa fa-fw fa-bars', routerLink: ['/virtual/wiki'] },
                    { label: 'Anuncios', icon: 'fa fa-fw fa-bars', routerLink: ['/virtual/anuncio'] },
                    { label: 'Tareas', icon: 'fa fa-fw fa-bars', routerLink: ['/virtual/tarea'] }

                ]
            }

        ]
    }
];
export var userMenu =
    menu


     /*this.model = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Menu Colors', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    { label: 'Light', icon: 'fa fa-fw fa-paint-brush', command: event => this.app.lightMenu = true },
                    { label: 'Dark', icon: 'fa fa-fw fa-paint-brush', command: event => this.app.lightMenu = false }
                ]
            },
            {
                label: 'Layouts', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Static', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'static' },
                    { label: 'Overlay', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'overlay' },
                    { label: 'Slim', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'slim' },
                    { label: 'Horizontal', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'horizontal' }
                ]
            },
            {
                label: 'Themes', icon: 'fa fa-fw fa-paint-brush', badge: 15,
                items: [
                    {
                        label: 'Pink', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('pink', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('pink', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Indigo', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('indigo', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('indigo', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Green', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('green', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('green', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Amber', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('amber', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('amber', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Deep Purple', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeppurple', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeppurple', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Blue', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('blue', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('blue', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Dark Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('darkblue', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('darkblue', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Cyan', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('cyan', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('cyan', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Purple', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('purple', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('purple', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Deep Orange', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeporange', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeporange', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Lime', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('lime', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('lime', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Yellow', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('yellow', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('yellow', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('bluegrey', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('bluegrey', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Mojito', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('mojito', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('mojito', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Grey', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('grey', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('grey', 'dark')
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Components', icon: 'fa fa-fw fa-bars',
                items: [
                    { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample'] },
                    { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms'] },
                    { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data'] },
                    { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels'] },
                    { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays'] },
                    { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus'] },
                    { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages'] },
                    { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts'] },
                    { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file'] },
                    { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc'] }
                ]
            },
            {
                label: 'Pages', icon: 'fa fa-fw fa-cube',
                items: [
                    { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty'] },
                    { label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank' },
                    { label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank' },
                    { label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank' },
                    {
                        label: 'Access Denied', icon: 'fa fa-fw fa-exclamation-triangle',
                        url: 'assets/pages/access.html', target: '_blank'
                    }
                ]
            },
            {
                label: 'Hierarchy', icon: 'fa fa-fw fa-sitemap',
                items: [
                    {
                        label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in' },
                                    { label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in' }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Documentation', icon: 'fa fa-fw fa-file-code-o', routerLink: ['/documentation']
            },
            {
                label: 'Buy Now', icon: 'fa fa-fw fa-credit-card-alt', url: ['https://www.primefaces.org/store']
            }
        ];*/